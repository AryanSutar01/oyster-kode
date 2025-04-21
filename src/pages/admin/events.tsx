import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import AdminLayout from '@/components/admin/Layout'
import EventModal from '@/components/admin/EventModal'
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers
} from 'react-icons/fi'
import { toast } from 'react-hot-toast'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'other'
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  maxParticipants?: number
  registrationLink?: string
  requirements?: string[]
  image: string
  featured: boolean
}

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'workshop', name: 'Workshops' },
  { id: 'hackathon', name: 'Hackathons' },
  { id: 'seminar', name: 'Seminars' },
  { id: 'competition', name: 'Competitions' },
  { id: 'other', name: 'Other' }
]

const statuses = [
  { id: 'all', name: 'All Status' },
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'ongoing', name: 'Ongoing' },
  { id: 'completed', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' }
]

const Events: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeStatus, setActiveStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        console.error('Failed to fetch events:', data.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/events?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setEvents(events.filter(event => event._id !== id));
        } else {
          console.error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleAdd = async (eventData: Omit<Event, '_id'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const data = await response.json();
      setEvents([...events, data]);
      setIsModalOpen(false);
      toast.success('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  };

  const handleUpdate = async (eventData: Omit<Event, '_id'>) => {
    if (!selectedEvent) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/events?id=${selectedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const data = await response.json();
      setEvents(events.map(event =>
        event._id === selectedEvent._id ? { ...data, _id: event._id } : event
      ));
      setIsModalOpen(false);
      setSelectedEvent(null);
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory;
    const matchesStatus = activeStatus === 'all' || event.status === activeStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Events Management - Admin Panel</title>
        <meta name="description" content="Manage Oyster Kode Club events" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Events Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and organize club events
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedEvent(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-ok-orange text-white rounded-xl 
                       hover:bg-ok-orange/90 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Add Event
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white 
                           placeholder-gray-400 dark:placeholder-gray-500
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-[#333333] 
                       bg-white dark:bg-[#252525] text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors"
            >
              <FiFilter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {isFilterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-[#333333]">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No events found</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden shadow-lg dark:shadow-none border border-gray-200 dark:border-[#333333]"
                >
                  <div className="relative h-48">
                    <CldImage
                      width="500"
                      height="500"
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiUsers className="w-4 h-4 mr-2" />
                        {event.maxParticipants ? `${event.maxParticipants} participants max` : 'No limit'}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        event.status === 'upcoming' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Event Modal */}
        {isModalOpen && (
          <EventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEvent(null);
            }}
            onSubmit={selectedEvent ? handleUpdate : handleAdd}
            event={selectedEvent}
            onSuccess={fetchEvents}
          />
        )}
      </AdminLayout>
    </>
  )
}

export default Events 