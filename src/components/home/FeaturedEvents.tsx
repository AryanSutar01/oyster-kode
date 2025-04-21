import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCalendar, FiClock, FiMapPin, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'
import Image from 'next/image'

const featuredEvent = {
  id: 1,
  title: 'Code 404 - Competitive Coding Challenge',
  description: 'Join us for an exciting competitive coding challenge where participants solve real-world programming problems. Show off your coding skills and compete with fellow developers!',
  date: 'Completed',
  time: '7 Hours Duration',
  location: 'RIT Video Conference Hall',
  type: 'Competition',
  registrationLink: 'https://vaishnavigaikwad25.github.io/Code404/',
  thumbnail: '/images/events/code404.png'
}

export default function FeaturedEvents() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-lighter dark:to-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-ok-orange/5 to-ok-pink/5 animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-ok-pink/5 to-ok-orange/5 animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Event
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join our exciting events and enhance your coding skills while connecting with fellow developers.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            className={`bg-white dark:bg-dark rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
              isHovered ? 'transform scale-[1.02] shadow-xl' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2">
                <div className="relative aspect-[4/3] lg:aspect-square w-full h-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <Image
                    src={featuredEvent.thumbnail}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <motion.span 
                      className="px-4 py-2 bg-ok-orange/90 text-white rounded-full text-sm font-medium inline-flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <FiCalendar className="w-4 h-4 mr-2" />
                      {featuredEvent.type}
                    </motion.span>
                  </motion.div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {featuredEvent.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-6 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {featuredEvent.description}
                </motion.p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div 
                    className="flex items-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <FiCalendar className="w-5 h-5 mr-3 text-ok-orange" />
                    <div>
                      <div className="text-sm font-medium">Date</div>
                      <div>{featuredEvent.date}</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <FiClock className="w-5 h-5 mr-3 text-ok-orange" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div>{featuredEvent.time}</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <FiMapPin className="w-5 h-5 mr-3 text-ok-orange" />
                    <div>
                      <div className="text-sm font-medium">Venue</div>
                      <div>{featuredEvent.location}</div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex justify-start"
                >
                  <Link
                    href={featuredEvent.registrationLink}
                    className="inline-flex items-center px-6 py-3 bg-ok-orange text-white rounded-full hover:bg-ok-pink transition-colors group"
                  >
                    <span className="mr-2">Learn more</span>
                    <motion.span
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 