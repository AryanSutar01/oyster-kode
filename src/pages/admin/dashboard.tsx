import type { NextPage } from 'next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/Layout'
import {
  FiUsers,
  FiCalendar,
  FiCode,
  FiSun,
  FiCoffee,
  FiBook,
  FiSettings
} from 'react-icons/fi'
import Link from 'next/link'

// Motivational quotes for developers
const quotes = [
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  },
  {
    text: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine"
  }
];

const quickLinks = [
  { name: 'Manage Members', href: '/admin/members', icon: FiUsers, description: 'Add, edit, or remove club members' },
  { name: 'Manage Events', href: '/admin/events', icon: FiCalendar, description: 'Create and organize club events' },
  { name: 'Manage Projects', href: '/admin/projects', icon: FiCode, description: 'Update project showcase' },
  { name: 'Club Resources', href: '/admin/resources', icon: FiBook, description: 'Access club documents and resources' },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings, description: 'Configure club preferences' }
];

const Dashboard: NextPage = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Change quote every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <>
      <Head>
        <title>Welcome - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for Oyster Kode Club" />
      </Head>

      <AdminLayout>
        <div className="min-h-screen pb-16">
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-ok-orange to-ok-blue rounded-2xl p-12 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <FiSun className="w-12 h-12" />
                  <h1 className="text-5xl font-bold">{greeting}, Admin!</h1>
                </div>
                <p className="text-2xl text-white/90 mb-12 max-w-2xl">
                  Welcome to the Oyster Kode Club admin panel. Here you can manage all aspects of the club and help create amazing experiences for our members.
                </p>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
                  <p className="text-xl italic mb-3">"{currentQuote.text}"</p>
                  <p className="text-sm text-white/80">- {currentQuote.author}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block p-6 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-[#333333]
                             shadow-lg dark:shadow-none hover:border-ok-orange/50 transition-all duration-300
                             group relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-ok-orange/10 text-ok-orange
                                    group-hover:scale-110 transition-transform duration-300">
                          <link.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-ok-orange transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Dashboard 