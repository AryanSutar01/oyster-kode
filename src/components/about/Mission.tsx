import { motion } from 'framer-motion'
import { FiCode, FiUsers, FiTarget, FiAward } from 'react-icons/fi'

const values = [
  {
    icon: FiCode,
    title: 'Coding Excellence',
    description: 'Developing strong programming skills and technical expertise'
  },
  {
    icon: FiUsers,
    title: 'Community Building',
    description: 'Creating a supportive environment for learning and growth'
  },
  {
    icon: FiTarget,
    title: 'Placement Preparation',
    description: 'Helping students prepare for technical interviews and placements'
  },
  {
    icon: FiAward,
    title: 'Skill Development',
    description: 'Enhancing both technical and non-technical abilities'
  }
]

export default function Mission() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-lighter">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            To develop students' interest in coding, enhance their technical and non-technical skills, and prepare them for successful careers in technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-ok-orange/10 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-ok-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 