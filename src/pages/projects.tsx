import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiCode, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { CldImage } from 'next-cloudinary'

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique technologies
  const allTechnologies = Array.from(new Set(projects.flatMap(project => project.technologies)));

  const featuredProjects = projects.filter(project => project.featured);
  const nonFeaturedProjects = projects.filter(project => !project.featured);

  // Filter non-featured projects based on selected criteria
  const filteredProjects = projects.filter(project => {
    const matchesTechnologies = selectedTechnologies.length === 0 || 
                              selectedTechnologies.every(tech => project.technologies.includes(tech));
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTechnologies && matchesSearch;
  });

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const nextFeaturedProject = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevFeaturedProject = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
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
          Loading projects...
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
        <title>Our Projects - Oyster Kode Club</title>
        <meta name="description" content="Explore the projects created by Oyster Kode Club members" />
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
                  Projects
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
                Discover innovative projects developed by our talented members
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
            <span>Filter Projects</span>
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
                <div className="max-w-6xl mx-auto space-y-6">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects by title, description, or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                               focus:ring-2 focus:ring-[#FF9A9E] focus:border-transparent transition-all"
                  />
                </div>

                {/* Technologies Filter */}
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleTechnology(tech)}
                        className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedTechnologies.includes(tech)
                            ? 'bg-gradient-to-r from-[#FF9A9E] to-[#FAD0C4] text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
              >
                Featured Projects
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
                      src={featuredProjects[currentFeaturedIndex].image}
                      alt={featuredProjects[currentFeaturedIndex].title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {featuredProjects[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-gray-200 mb-4">
                        {featuredProjects[currentFeaturedIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredProjects[currentFeaturedIndex].technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-sm bg-white/10 backdrop-blur-sm text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {featuredProjects[currentFeaturedIndex].github && (
                          <a
                            href={featuredProjects[currentFeaturedIndex].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white hover:text-[#FF9A9E] transition-colors"
                          >
                            <FiGithub className="w-5 h-5" />
                            <span>View Code</span>
                          </a>
                        )}
                        {featuredProjects[currentFeaturedIndex].liveUrl && (
                          <a
                            href={featuredProjects[currentFeaturedIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white hover:text-[#FF9A9E] transition-colors"
                          >
                            <FiExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button
                    onClick={prevFeaturedProject}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button
                    onClick={nextFeaturedProject}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {featuredProjects.map((_, index) => (
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

        {/* All Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center"
            >
              All Projects
            </motion.h2>

            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-lg 
                             border border-gray-200 dark:border-gray-700
                             rounded-2xl overflow-hidden transition-all duration-300
                             hover:border-[#FF9A9E] dark:hover:border-[#FF9A9E]"
                  >
                    <div className="relative h-48">
                      <CldImage
                        width="600"
                        height="400"
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#FF9A9E] transition-colors mb-2">
                          {project.title}
                        </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#FF9A9E] transition-colors"
                          >
                            <FiGithub className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#FF9A9E] transition-colors"
                          >
                            <FiExternalLink className="w-4 h-4" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-2xl text-gray-500 dark:text-gray-400">
                    No projects found matching your criteria
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