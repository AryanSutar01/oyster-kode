import { motion } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageCircle } from 'react-icons/fi'
import Image from 'next/image'
import { useState } from 'react'

const demoTestimonials = [
  {
    id: 1,
    name: 'Saish Patil',
    role: 'Computer Science, TY TKIET',
    image: '/images/testimonials/Placeholder_2.jpg',
    quote: 'Being part of Oyster Kode Club has been transformative. The Code 404 competition helped me improve my problem-solving skills significantly.',
    rating: 5,
    gradient: 'from-[#A6C1EE] to-[#FBC2EB]' // Cool  blue to pink
  },
  {
    id: 2,
    name: 'Suryakant Koli',
    role: 'Computer Science, SY RIT',
    image: '/images/testimonials/Placeholder_3.jpg',
    quote: 'The community and the coding culture has made me build consistency and discipline towards coding',
    rating: 5,
    gradient: 'from-[#84FAB0] to-[#8FD3F4]' // Soft green to blue
  },
  {
    id: 3,
    name: 'Harshal Kumbhar',
    role: 'SDE Intern, RSquareSoft',
    image: '/images/testimonials/Placeholder_1.jpg',
    quote: 'The supportive community and mentorship opportunities at Oyster Kode Club have been invaluable for my growth as a developer.',
    rating: 5,
    gradient: 'from-[#E0C3FC] to-[#8EC5FC]' // Soft purple to blue
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % demoTestimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + demoTestimonials.length) % demoTestimonials.length)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/0 dark:from-white/0 dark:via-white/5 dark:to-white/0" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#A6C1EE]/20 to-[#FBC2EB]/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#84FAB0]/20 to-[#8EC5FC]/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#A6C1EE] to-[#FBC2EB] bg-clip-text text-transparent">
              What Our Members Say
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Hear from our members about their experiences and growth with Oyster Kode Club
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {demoTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 dark:bg-dark/50 rounded-2xl p-8"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  '--tw-gradient-from': '#A6C1EE',
                  '--tw-gradient-to': '#FBC2EB',
                }}
              />
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.5 }}
                        whileHover={{ scale: 1.2 }}
                        className="text-yellow-400"
                      >
                        <FiStar className="w-5 h-5 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <FiMessageCircle className="absolute -left-2 -top-2 w-8 h-8 text-white/10" />
                  <blockquote className="text-gray-300 italic relative pl-4">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {demoTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 dark:bg-dark/50 rounded-2xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-white/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4 space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 text-sm italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <div className="flex space-x-2">
              {demoTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-white'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
} 