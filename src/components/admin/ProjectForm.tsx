'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import ImageUpload from './ImageUpload'

interface ProjectFormProps {
  project?: {
    _id: string
    title: string
    description: string
    image: string
    technologies: string[]
    github: string
    liveUrl: string
    featured: boolean
  }
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    technologies: project?.technologies || [],
    github: project?.github || '',
    liveUrl: project?.liveUrl || '',
    featured: project?.featured || false
  })
  const [newTech, setNewTech] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/projects${project ? `/${project._id}` : ''}`, {
        method: project ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save project')
      }

      toast.success(project ? 'Project updated successfully' : 'Project created successfully')
      router.push('/admin/projects')
      router.refresh()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Failed to save project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
    setIsImageUploaded(true)
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }))
      setNewTech('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Image
        </label>
        <ImageUpload
          value={formData.image}
          onChange={handleImageUpload}
          folder="projects"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Technologies
        </label>
        <div className="mt-1 flex space-x-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            placeholder="Add technology"
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                       focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-ok-orange text-white rounded-md hover:bg-ok-orange/90"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                         bg-ok-orange/10 text-ok-orange"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="ml-2 text-ok-orange hover:text-ok-orange/80"
              >
                <FiX className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          GitHub Repository
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiGithub className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="github"
            value={formData.github}
            onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
            className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                       focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Live URL
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiExternalLink className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="liveUrl"
            value={formData.liveUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
            className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                       focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
          className="h-4 w-4 text-ok-orange focus:ring-ok-orange border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Featured Project
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 
                     dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isImageUploaded}
          className="px-4 py-2 bg-ok-orange text-white rounded-md hover:bg-ok-orange/90 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm 