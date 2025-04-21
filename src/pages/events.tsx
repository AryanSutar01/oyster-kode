import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar, FiMapPin, FiClock, FiExternalLink, FiBook, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { CldImage } from 'next-cloudinary'

interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  registrationLink?: string;
  featured: boolean;
  category: string;
  maxParticipants: number;
  requirements?: string[];
  status: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const featuredEvents = events
    .filter(event => event.featured)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
    });
  const nonFeaturedEvents = events.filter(event => !event.featured);

  // Filter events based on criteria
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const matchesUpcoming = !showUpcomingOnly || eventDate >= today;

    return matchesUpcoming;
  }).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
  });

  const nextFeaturedEvent = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevFeaturedEvent = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl text-gray-600 dark:text-gray-400"
        >
          Loading events...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111]">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4] text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Events - Oyster Kode Club</title>
        <meta name="description" content="Explore upcoming and past events organized by Oyster Kode Club" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] opacity-95" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Small floating particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4]"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * 400,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: 0.3,
                }}
                animate={{
                  y: [Math.random() * 400, Math.random() * 400],
                  x: [
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                  ],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />
            ))}

            {/* Larger glowing orbs */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full blur-md"
                style={{
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 ? '#FF9A9E' : '#FAD0C4'
                  }40, transparent 70%)`,
                  width: `${Math.random() * 150 + 100}px`,
                  height: `${Math.random() * 150 + 100}px`,
                }}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * 400,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: [
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                  ],
                  y: [Math.random() * 400, Math.random() * 400],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />
            ))}

            {/* Code symbols effect */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`code-${i}`}
                className="absolute text-[#FF9A9E40] text-2xl font-mono"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: -20,
                  opacity: 0,
                }}
                animate={{
                  y: 420,
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              >
                {['{ }', '[ ]', '< >', '( )', '// ', '/* */'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white max-w-4xl mx-auto"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-3"
              >
                <motion.span
                  className="text-white relative"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  Our
                  <motion.div
                    className="absolute -inset-1 bg-white/10 rounded-lg blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FF9A9E] bg-clip-text text-transparent relative"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  Events
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#FF9A9E20] to-[#FAD0C420] rounded-lg blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 relative"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                Join us for exciting events, workshops, and competitions
                <motion.div
                  className="absolute -inset-2 bg-white/5 rounded-lg blur-sm"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filter Button - Positioned after hero */}
        <div className="relative z-20 flex justify-center -mt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-6 py-3 bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 rounded-xl
                     text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-300
                     flex items-center gap-2 shadow-lg"
          >
            <FiFilter className="w-5 h-5" />
            <span>Filter Events</span>
          </motion.button>
        </div>

        {/* Filters Section */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-y border-gray-200 dark:border-gray-800 relative z-10"
            >
              <div className="container mx-auto px-4 py-6">
            <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-center">
                    {/* Upcoming Filter */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                          type="checkbox"
                          checked={showUpcomingOnly}
                          onChange={(e) => setShowUpcomingOnly(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer
                                    peer-checked:bg-gradient-to-r peer-checked:from-[#FF9A9E] peer-checked:to-[#FAD0C4]
                                    after:content-[''] after:absolute after:top-0.5 after:left-0.5
                                    after:bg-white after:rounded-full after:h-5 after:w-5
                                    after:transition-all peer-checked:after:translate-x-4"
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-[#FF9A9E] transition-colors">
                        Show Upcoming Only
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Featured Events Carousel */}
        {featuredEvents.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
              >
                Recent Events
              </motion.h2>
              
              <div className="max-w-4xl mx-auto relative">
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    key={currentFeaturedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-[16/9]"
                  >
                    <CldImage
                      width="1200"
                      height="675"
                      src={featuredEvents[currentFeaturedIndex].image}
                      alt={featuredEvents[currentFeaturedIndex].title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {featuredEvents[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-gray-200 mb-4">
                        {featuredEvents[currentFeaturedIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-white/90 mb-6">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-5 h-5" />
                          <span>{new Date(featuredEvents[currentFeaturedIndex].date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-5 h-5" />
                          <span>{featuredEvents[currentFeaturedIndex].time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-5 h-5" />
                          <span>{featuredEvents[currentFeaturedIndex].location}</span>
                        </div>
                      </div>
                      {featuredEvents[currentFeaturedIndex].registrationLink && (
                        <a
                          href={featuredEvents[currentFeaturedIndex].registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                                   bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4] text-white
                                   hover:opacity-90 transition-opacity"
                        >
                          <FiExternalLink className="w-5 h-5" />
                          <span>Register Now</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button
                    onClick={prevFeaturedEvent}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button
                    onClick={nextFeaturedEvent}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {featuredEvents.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentFeaturedIndex
                          ? 'bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4]'
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
        )}

        {/* All Events Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
            >
              All Events
            </motion.h2>

            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-lg 
                             border border-gray-200 dark:border-gray-700
                             rounded-2xl overflow-hidden transition-all duration-300
                             hover:border-[#FF9A9E] dark:hover:border-[#FF9A9E]
                             flex flex-col"
                  >
                    <div className="relative h-56">
                      <CldImage
                        width="600"
                        height="400"
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                      {event.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4] text-white text-sm font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#FF9A9E] transition-colors mb-4">
                          {event.title}
                        </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {event.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <FiCalendar className="w-4 h-4 text-[#FF9A9E]" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4 text-[#FAD0C4]" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiMapPin className="w-4 h-4 text-[#FF9A9E]" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiBook className="w-4 h-4 text-[#FF9A9E]" />
                          <span>Category: {event.category}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 text-[#FAD0C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>Max Participants: {event.maxParticipants}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 text-[#FF9A9E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Status: {event.status}</span>
                        </div>

                        {event.requirements && event.requirements.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-gray-600 dark:text-gray-400 font-medium">Requirements:</div>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 pl-2 space-y-1">
                              {event.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                   bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4] text-white w-full
                                   hover:opacity-90 transition-opacity"
                        >
                          <FiExternalLink className="w-5 h-5" />
                          <span>Register Now</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-2xl text-gray-500 dark:text-gray-400">
                    No events found matching your criteria
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 