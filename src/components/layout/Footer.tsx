'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-dark via-dark to-ok-blue overflow-hidden">
      {/* Background Gradient Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 -bottom-40 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-orange-light via-accent-orange to-accent-pink opacity-20" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-accent-orange via-accent-orange-light to-accent-pink bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Oyster Kode
              </motion.h2>
            </Link>
            <p className="text-gray-300">
              Code | Create | Connect
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/oyster-kode-club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/oyster-kode-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/OysterKode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com/oyster_kode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiInstagram className="w-6 h-6" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-gray-300 hover:text-accent-orange transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-gray-300 hover:text-accent-orange transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-accent-orange transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Location</h4>
                <p className="text-gray-300">
                  Rajarambapu Institute of Technology,<br />
                  Islampur, Sangli, Maharashtra - 415 414
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Email</h4>
                <motion.a
                  href="mailto:oysterkodeclub@gmail.com"
                  className="text-gray-300 hover:text-accent-orange transition-colors inline-flex items-center gap-2"
                  whileHover={{ x: 2 }}
                >
                  <FiMail className="w-4 h-4" />
                  oysterkodeclub@gmail.com
                </motion.a>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Join Discord</h4>
                <motion.a
                  href="https://discord.gg/oysterkode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Community
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Oyster Kode Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 