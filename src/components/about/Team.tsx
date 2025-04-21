import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'

const team = [
  {
    name: 'Harshal Vijaykumar Kumbhar',
    role: 'President',
    image: '/images/team/placeholder-1.png',
    bio: 'Leading the club towards technical excellence',
    social: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Tanaya Shivaji Shinde',
    role: 'Vice-president',
    image: '/images/team/placeholder-2.png',
    bio: 'Driving community engagement and growth',
    social: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Meet Bharat Bhandari',
    role: 'Secretary',
    image: '/images/team/placeholder-3.png',
    bio: 'Managing club operations and activities',
    social: {
      github: '#',
      linkedin: '#',
      twitter: '#'
    }
  }
]

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white dark:bg-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat" />
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
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Core Committee
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Meet the dedicated team leading Oyster Kode Club
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-gray-50 dark:bg-dark-lighter rounded-2xl overflow-hidden transition-all duration-300 ${
                hoveredMember === index ? 'transform scale-105 shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative h-64 group overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-sm">{member.bio}</p>
                </motion.div>
              </div>
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>
                <motion.p 
                  className="text-ok-orange mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  {member.role}
                </motion.p>
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href={member.social.github}
                    className="text-gray-600 dark:text-gray-400 hover:text-ok-orange transition-colors transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-gray-600 dark:text-gray-400 hover:text-ok-orange transition-colors transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-600 dark:text-gray-400 hover:text-ok-orange transition-colors transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Faculty Coordinator: <span className="font-semibold">Prof. Moshin Mulla</span>
          </motion.p>
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-500 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Training and Placement Coordinator, RIT
          </motion.p>
        </motion.div> */}
      </div>
    </section>
  )
} 