'use client'

import { useState, useEffect } from 'react'
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { FiImage, FiX } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, folder }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl 
                     flex flex-col items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="oyster_kode"
          options={{
            folder,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
          }}
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            console.log('Upload success:', result);
            if (result?.info && typeof result.info !== 'string' && result.info.secure_url) {
              onChange(result.info.secure_url);
              toast.success('Image uploaded successfully');
            }
          }}
          onError={(error) => {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
          }}
        >
          {({ open }) => (
            <div
              onClick={() => open()}
              className="w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl 
                       flex flex-col items-center justify-center cursor-pointer hover:border-ok-orange 
                       transition-colors"
            >
              <FiImage className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to upload an image
              </p>
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  )
}

export default ImageUpload 