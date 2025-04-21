import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiCode,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { name: 'Members', href: '/admin/members', icon: FiUsers },
  { name: 'Events', href: '/admin/events', icon: FiCalendar },
  { name: 'Projects', href: '/admin/projects', icon: FiCode },
  { name: 'Messages', href: '/admin/messages', icon: FiMail },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
]

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ok-orange"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#1A1A1A] 
                 border border-gray-200 dark:border-[#333333] shadow-lg dark:shadow-none"
      >
        {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className={`lg:static fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#1A1A1A] 
                    border-r border-gray-200 dark:border-[#333333] z-40
                    transform lg:transform-none ${isSidebarOpen ? '' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Admin Panel
                </h1>

                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = router.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                  ${isActive
                                    ? 'bg-ok-orange text-white'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#252525]'
                                  }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Logout Button - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-[#333333]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 
                         hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all w-full"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout 