'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiGithub, FiLinkedin, FiX } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import ImageUpload from './ImageUpload'

interface MemberFormProps {
  member?: {
    _id: string
    name: string
    role: string
    department: string
    year: string
    skills: string[]
    image: string
    github: string
    linkedin: string
    featured: boolean
  }
}

const MemberForm: React.FC<MemberFormProps> = ({ member }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImageUploaded, setIsImageUploaded] = useState(false)
  const [formData, setFormData] = useState({
    name: member?.name || '',
    role: member?.role || '',
    department: member?.department || '',
    year: member?.year || '',
    skills: member?.skills || [],
    image: member?.image || '',
    github: member?.github || '',
    linkedin: member?.linkedin || '',
    featured: member?.featured || false
  })
  const [newSkill, setNewSkill] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/members${member ? `/${member._id}` : ''}`, {
        method: member ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save member')
      }

      toast.success(member ? 'Member updated successfully' : 'Member created successfully')
      router.push('/admin/members')
      router.refresh()
    } catch (error) {
      console.error('Error saving member:', error)
      toast.error('Failed to save member')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }))
    setIsImageUploaded(true)
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <input
          type="text"
          id="role"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Department
        </label>
        <input
          type="text"
          id="department"
          value={formData.department}
          onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Year
        </label>
        <input
          type="text"
          id="year"
          value={formData.year}
          onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                     focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Member Image
        </label>
        <ImageUpload
          value={formData.image}
          onChange={handleImageUpload}
          folder="members"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Skills
        </label>
        <div className="mt-1 flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="Add skill"
            className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                       focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-ok-orange text-white rounded-md hover:bg-ok-orange/90"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                         bg-ok-orange/10 text-ok-orange"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
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
          GitHub Profile
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
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          LinkedIn Profile
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLinkedin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
            className="block w-full pl-10 rounded-md border-gray-300 dark:border-gray-700 shadow-sm 
                       focus:border-ok-orange focus:ring-ok-orange dark:bg-gray-800 dark:text-white"
            placeholder="https://linkedin.com/in/username"
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
          Featured Member
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
          {isSubmitting ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  )
}

export default MemberForm 