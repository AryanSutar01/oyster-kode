import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/Layout'
import MemberModal from '@/components/admin/MemberModal'
import { Member as MemberType, MemberFormData } from '@/types/member'
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiUser,
  FiAward,
  FiUsers,
  FiX
} from 'react-icons/fi'
import { useRouter } from 'next/router'

interface Member {
  _id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  skills: string[];
  image: string;
  github?: string;
  linkedin?: string;
  featured: boolean;
}

const categories = [
  { id: 'all', name: 'All Members', icon: FiUsers },
  { id: 'featured', name: 'Featured Members', icon: FiAward },
  { id: 'regular', name: 'Regular Members', icon: FiUser }
]

const departments = [
  'All Departments',
  'Computer Science',
  'Information Technology',
  'Artifical Intelligence',
  'Electronics and Communication'
]
const years = ['All Years', '2024', '2023', '2022', '2021', '2020']

const Members: NextPage = () => {
  const router = useRouter()
  const [members, setMembers] = useState<MemberType[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedYear, setSelectedYear] = useState('All Years')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<MemberType | undefined>(undefined)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch members from API
  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/members', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch members')
      }

      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [router])

  const filteredMembers = members.filter(member => {
    const matchesCategory = activeCategory === 'all' || 
                          (activeCategory === 'featured' && member.featured) ||
                          (activeCategory === 'regular' && !member.featured)
    const matchesDepartment = selectedDepartment === 'All Departments' || member.department === selectedDepartment
    const matchesYear = selectedYear === 'All Years' || member.year === selectedYear
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDepartment && matchesYear && matchesSearch
  })

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/members?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete member')
      }

      setMembers(members.filter(member => member._id !== id))
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Failed to delete member')
    }
  }

  const handleEdit = (member: MemberType) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleAdd = async (memberData: MemberFormData) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setMembers([...members, data])
        setIsModalOpen(false)
      } else {
        console.error('Failed to add member:', data.message)
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const handleUpdate = async (memberData: MemberFormData) => {
    if (!selectedMember) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/members?id=${selectedMember._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      })

      const data = await response.json()
      
      if (response.ok) {
        setMembers(members.map(member =>
          member._id === selectedMember._id ? { ...data, _id: member._id } : member
        ))
        setIsModalOpen(false)
        setSelectedMember(undefined)
      } else {
        console.error('Failed to update member:', data.message)
      }
    } catch (error) {
      console.error('Error updating member:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Members Management - Admin Panel</title>
        <meta name="description" content="Manage Oyster Kode Club members" />
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Members Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and organize club members
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedMember(undefined)
                setIsModalOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-ok-orange text-white rounded-xl 
                       hover:bg-ok-orange/90 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Add Member
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
                  placeholder="Search members..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-[#333333]">
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
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333] 
                           bg-white dark:bg-[#252525] text-gray-900 dark:text-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Loading members...</p>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No members found</p>
              </div>
            ) : (
              filteredMembers.map((member) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-[#333333] overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {member.featured && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-ok-orange text-white text-sm rounded-lg">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {member.role}
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <p>{member.department} • {member.year}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex gap-2">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            <FiUser className="w-5 h-5" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          >
                            <FiUsers className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
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

        {/* Member Modal */}
        {isModalOpen && (
          <MemberModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMember(undefined);
            }}
            onSubmit={selectedMember ? handleUpdate : handleAdd}
            member={selectedMember}
            onSuccess={fetchMembers}
          />
        )}
      </AdminLayout>
    </>
  )
}

export default Members 