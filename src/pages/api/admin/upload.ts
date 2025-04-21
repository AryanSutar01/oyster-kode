import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../lib/authMiddleware';
import cloudinary from '../../../lib/cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.image as formidable.File | undefined;
    if (!file || !file.filepath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Read the file content
    const fileContent = await fs.promises.readFile(file.filepath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: `oyster-kode/${fields.folder || 'general'}`,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      transformation: [
        { width: 1000, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });

    // Clean up the temporary file
    await fs.promises.unlink(file.filepath);

    return res.status(200).json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ 
      message: 'Error uploading image', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    });
  }
}

export default authMiddleware(handler); 