import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function Story() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white dark:bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[400px] rounded-2xl overflow-hidden group"
          >
            <Image
              src="/images/about/Story.jpg"
              alt="Oyster Kode Club Story"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <p className="text-sm">Click to learn more about our journey</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The Oyster Kode Club at RIT is dedicated to fostering a culture of coding excellence and technical innovation. Our club provides a platform for students to enhance their programming skills, participate in coding competitions, and develop real-world projects.
            </motion.p>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Under the guidance of our faculty coordinator, Prof. Moshin Mulla (Training and placement coordinator) RIT, we organize various activities including coding competitions, workshops, and technical sessions to help students build a strong foundation in programming.
            </motion.p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { value: '70+', label: 'Active Members' },
                { value: '10+', label: 'Events Conducted' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`bg-gray-50 dark:bg-dark-lighter p-4 rounded-xl transition-all duration-300 ${
                    hoveredStat === index ? 'transform scale-105 shadow-lg' : ''
                  }`}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-ok-orange mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 