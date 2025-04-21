import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const galleryImages = [
  // {
  //   id: 1,
  //   year: '2020',
  //   image: '/images/gallery/team-2020.jpg',
  //   description: 'Oyster Kode Club Team 2020'
  // },
  // {
  //   id: 2,
  //   year: '2021',
  //   image: '/images/gallery/team-2021.jpg',
  //   description: 'Oyster Kode Club Team 2021'
  // },
  // {
  //   id: 3,
  //   year: '2022',
  //   image: '/images/gallery/team-2022.jpg',
  //   description: 'Oyster Kode Club Team 2022'
  // },
  {
    id: 1,
    year: '2023',
    image: '/images/gallery/team-2023.jpg',
    description: 'Oyster Kode Club Team 2023'
  },
  {
    id: 2,
    year: '2024',
    image: '/images/gallery/team-2024.jpg',
    description: 'Oyster Kode Club Team 2024'
  }
]

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Team Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Journey through the years with Oyster Kode Club
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[700px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[currentIndex].image}
                  alt={galleryImages[currentIndex].description}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {galleryImages[currentIndex].year}
                  </h3>
                  <p className="text-xl text-white/90">
                    {galleryImages[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-6 mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-24 h-24 rounded-lg overflow-hidden transition-all ${
                  currentIndex === index
                    ? 'ring-2 ring-ok-orange scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <Image
                  src={image.image}
                  alt={image.description}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Coordinator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Faculty Coordinator: <span className="font-semibold">Prof. Moshin Mulla</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Training and Placement Coordinator, RIT
          </p>
        </motion.div>
      </div>
    </section>
  )
} 