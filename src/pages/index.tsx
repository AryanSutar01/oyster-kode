import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useCallback, useState } from 'react'
import FeaturedEvents from '@/components/home/FeaturedEvents'
import Testimonials from '@/components/home/Testimonials'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Stats from '@/components/home/Stats'
import { FiChevronDown, FiArrowRight } from 'react-icons/fi'

const Home: NextPage = () => {
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const scrollToContent = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head>
        <title>Oyster Kode Club</title>
        <meta name="description" content="Welcome to Oyster Kode Club - Empowering future developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        {/* Hero Section - Full Viewport */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-ok-blue dark:from-dark dark:via-dark dark:to-ok-blue" />
            
            {/* Animated Gradient Overlay */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl"
            >
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent-orange-light via-accent-orange to-accent-pink opacity-30 dark:opacity-30" />
            </motion.div>

            {/* Floating Particles */}
            {isClient && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-accent-orange-light to-accent-pink-light dark:from-accent-orange-light dark:to-accent-pink-light"
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight,
                      scale: Math.random() * 0.5 + 0.5,
                      opacity: 0.3,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.random() * 100 - 50, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            className="container mx-auto px-4 text-center"
            style={{ opacity, scale }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="block bg-gradient-to-r from-accent-orange via-accent-orange-light to-accent-pink bg-clip-text text-transparent animate-gradient dark:from-accent-orange dark:via-accent-orange-light dark:to-accent-pink">
                  Welcome to Oyster Kode Club
                </span>
              </motion.h1>
              
              <motion.p 
                className="mx-auto max-w-2xl text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Empowering the next generation of developers through code.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Link href="/about">
                  <motion.div
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-accent-orange to-accent-pink hover:from-accent-pink hover:to-accent-orange transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Learn More</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-accent-orange rounded-full overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 dark:bg-white/10 dark:hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Join Us
                      <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-accent-orange/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-accent-orange transition-colors cursor-pointer dark:text-gray-400 dark:hover:text-accent-orange"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 1.2,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <FiChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.button>
        </section>

        {/* Content Sections */}
        <div className="bg-white dark:bg-dark">
          {/* Featured Events Section */}
          <FeaturedEvents />

          {/* Featured Projects Section */}
          <FeaturedProjects />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Stats Section with Globe */}
          <Stats />
        </div>
      </main>
    </>
  )
}

export default Home 