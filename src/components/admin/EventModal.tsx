'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { FiX } from 'react-icons/fi'
import ImageUpload from './ImageUpload'
import { toast } from 'react-hot-toast'

// Import the Event type
import type { Event } from '@/pages/admin/events'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
  event?: Event | null
  onSuccess?: () => void
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  event,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Omit<Event, '_id'>>({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'workshop',
    status: 'upcoming',
    image: '',
    registrationLink: '',
    maxParticipants: undefined,
    requirements: [],
    featured: false
  })

  const [requirement, setRequirement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        category: event.category,
        status: event.status,
        image: event.image,
        registrationLink: event.registrationLink,
        maxParticipants: event.maxParticipants,
        requirements: event.requirements || [],
        featured: event.featured
      })
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.image) {
      toast.error('Please upload an image first')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form data after successful submission
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: 'workshop',
        status: 'upcoming',
        image: '',
        registrationLink: '',
        maxParticipants: undefined,
        requirements: [],
        featured: false
      })
      setRequirement('')
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (imageUrl: string) => {
    console.log('Image upload completed. URL:', imageUrl);
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  if (!mounted) {
    return null
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-[#1A1A1A] z-10 pb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
              {event ? 'Edit Event' : 'Add New Event'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Image
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={handleImageUpload}
                  folder="events"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Venue
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    category: e.target.value as 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'other' 
                  }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                >
                  <option value="workshop">Workshop</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="seminar">Seminar</option>
                  <option value="competition">Competition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    status: e.target.value as 'upcoming' | 'ongoing' | 'completed' | 'cancelled' 
                  }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Registration Link
                </label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationLink: e.target.value }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    maxParticipants: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Requirements
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-[#333333] 
                             bg-white dark:bg-[#252525] text-gray-900 dark:text-white px-4 py-2
                             focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                    placeholder="Add a requirement"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (requirement.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          requirements: [...(prev.requirements || []), requirement.trim()]
                        }))
                        setRequirement('')
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-ok-orange text-white font-medium
                             hover:bg-ok-orange/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.requirements && formData.requirements.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg 
                                 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {req}
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              requirements: prev.requirements?.filter((_, i) => i !== index) || []
                            }))
                          }}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-700 text-ok-orange 
                             focus:ring-ok-orange"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured Event
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-[#333333] 
                         bg-white dark:bg-[#252525] text-gray-700 dark:text-gray-300 font-medium
                         hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.image || isSubmitting}
                className="px-4 py-2 rounded-xl bg-ok-orange text-white font-medium
                         hover:bg-ok-orange/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : (event ? 'Update Event' : 'Add Event')}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EventModal 