import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi'

const AdminLogin: NextPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Clear any existing token on login page load
    localStorage.removeItem('adminToken')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store the JWT token
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.message || 'Invalid credentials')
        
        // If first login attempt fails, try to create admin user
        if (formData.username === 'admin' && formData.password === 'admin123') {
          try {
            const setupResponse = await fetch('/api/auth/setup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            
            if (setupResponse.ok) {
              // Retry login after setup
              const loginRetry = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              })
              
              const loginData = await loginRetry.json()
              
              if (loginRetry.ok) {
                localStorage.setItem('adminToken', loginData.token)
                router.push('/admin/dashboard')
                return
              }
            }
          } catch (setupError) {
            console.error('Setup error:', setupError)
          }
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Oyster Kode Club</title>
        <meta name="description" content="Admin panel login for Oyster Kode Club" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to manage Oyster Kode Club content
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-8 border border-gray-200 dark:border-[#333333] shadow-lg dark:shadow-none">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                  <FiAlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                             bg-white dark:bg-[#252525] text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                             bg-white dark:bg-[#252525] text-gray-900 dark:text-white 
                             placeholder-gray-400 dark:placeholder-gray-500
                             focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all
                          ${isLoading 
                            ? 'bg-ok-orange/70 cursor-not-allowed' 
                            : 'bg-ok-orange hover:bg-ok-orange/90'}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default AdminLogin 