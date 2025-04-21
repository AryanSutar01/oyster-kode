import { motion } from 'framer-motion'
import { FiUsers, FiAward, FiCode, FiGlobe } from 'react-icons/fi'
import Logo3D from './Logo3D'

const stats = [
  {
    id: 1,
    label: 'Club Members',
    value: '70+',
    description: 'Active learners',
    icon: FiUsers,
    color: 'from-[#FF9A9E] to-[#FAD0C4]'
  },
  {
    id: 2,
    label: 'Alumni',
    value: '50+',
    description: 'Success stories',
    icon: FiAward,
    color: 'from-[#89F7FE] to-[#66A6FF]'
  },
  {
    id: 3,
    label: 'Projects',
    value: '15+',
    description: 'Completed projects',
    icon: FiCode,
    color: 'from-[#C2E9FB] to-[#A1C4FD]'
  },
  {
    id: 4,
    label: 'Global Reach',
    value: '5+',
    description: 'Countries represented',
    icon: FiGlobe,
    color: 'from-[#96FBC4] to-[#F9F586]'
  }
]

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 3D Logo Section */}
        <div className="max-w-2xl mx-auto h-[400px] mb-16">
          <Logo3D />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FF9A9E] to-[#66A6FF] bg-clip-text text-transparent">
              Our Growing Community
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Join our thriving community of developers and be part of something extraordinary
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 dark:bg-dark/50 rounded-2xl p-6 text-center"
            >
              <div className="relative">
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-90`}>
                    <stat.icon className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
                <div className="space-y-2">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`block text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </motion.span>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 