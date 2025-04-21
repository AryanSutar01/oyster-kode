import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const demoProjects = [
  {
    id: 1,
    title: 'Oyster Kode Website',
    description: 'A website for the Oyster Kode Club to showcase their projects, events, achievements, and more.',
    image: '/images/projects/placeholder-1.png',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB'],
    github: '#',
    liveDemo: '#',
    category: 'Web App'
  },
  {
    id: 2,
    title: 'Galactus Racing RIT Website',
    description: 'By- Harshal Kumbhar This website was developed for the automobile club at RIT, "Galactus Racing".',
    image: '/images/projects/placeholder-2.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'http://galactusracing.com/',
    liveDemo: 'http://galactusracing.com/',
    category: 'Web App'
  },
  {
    id: 3,
    title: 'Code404 Competition Mobile App',
    description: 'A app for the Code404 Competition, a coding competition held at RIT.',
    image: '/images/projects/placeholder-3.png',
    tags: ['Flutter', 'Java', 'Firebase'],
    github: '#',
    liveDemo: '#',
    category: 'Web App'
  }
]

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % demoProjects.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % demoProjects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + demoProjects.length) % demoProjects.length)
  }

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
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Discover innovative projects created by our talented club members.
          </motion.p>
        </motion.div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-dark/80 shadow-lg hover:bg-white dark:hover:bg-dark transition-colors"
            aria-label="Previous project"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-dark/80 shadow-lg hover:bg-white dark:hover:bg-dark transition-colors"
            aria-label="Next project"
          >
            <FiChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-dark rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={demoProjects[currentIndex].image}
                        alt={demoProjects[currentIndex].title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-2 bg-ok-orange/90 text-white rounded-full text-sm font-medium">
                          {demoProjects[currentIndex].category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {demoProjects[currentIndex].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                      {demoProjects[currentIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {demoProjects[currentIndex].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-dark-lighter text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={demoProjects[currentIndex].github}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-dark-lighter text-gray-800 dark:text-gray-200 rounded-full hover:bg-ok-orange hover:text-white transition-colors group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiGithub className="w-5 h-5 mr-2" />
                        <span>View Code</span>
                      </Link>
                      <Link
                        href={demoProjects[currentIndex].liveDemo}
                        className="inline-flex items-center px-6 py-3 bg-ok-orange text-white rounded-full hover:bg-ok-pink transition-colors group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink className="w-5 h-5 mr-2" />
                        <span>Live Demo</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {demoProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-ok-orange'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-dark-lighter text-gray-800 dark:text-gray-200 rounded-full hover:bg-ok-orange hover:text-white transition-colors group"
          >
            View All Projects
            <FiChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 