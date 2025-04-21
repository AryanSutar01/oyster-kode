import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiAward, FiUser, FiFilter } from 'react-icons/fi'
import { CldImage } from 'next-cloudinary'

interface Member {
  _id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  skills: string[];
  image: string;
  github?: string;
  linkedin?: string;
  featured: boolean;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members');
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Get unique departments and years
  const departments = ['all', ...Array.from(new Set(members.map(member => member.department)))];
  const years = ['all', ...Array.from(new Set(members.map(member => member.year)))];
  const allSkills = Array.from(new Set(members.flatMap(member => member.skills)));

  // Filter members based on selected criteria
  const filteredMembers = members.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesYear = selectedYear === 'all' || member.year === selectedYear;
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => member.skills.includes(skill));
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDepartment && matchesYear && matchesSkills && matchesSearch;
  });

  // Sort members by role priority and alphabetically
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    // Define role priorities
    const rolePriority = {
      'President': 1,
      'Vice President': 2,
      'Secretary': 3
    };

    // Get priority for each member's role
    const priorityA = rolePriority[a.role] || (a.featured ? 4 : 5);
    const priorityB = rolePriority[b.role] || (b.featured ? 4 : 5);

    // If priorities are different, sort by priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If priorities are the same (both featured or both regular), sort alphabetically
    return a.name.localeCompare(b.name);
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Members - Oyster Kode Club</title>
        <meta name="description" content="Meet the members of Oyster Kode Club" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-r from-ok-orange to-ok-blue overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Small floating particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white/30"
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
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
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
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Members
              </h1>
              <p className="text-xl text-white/90">
                Meet the talented individuals who make Oyster Kode Club what it is
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Button */}
        <div className="relative z-20 flex justify-center -mt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl
                     text-gray-800 dark:text-white hover:bg-white/20 transition-all duration-300
                     flex items-center gap-2 shadow-lg"
          >
            <FiFilter className="w-5 h-5" />
            <span>Filter Members</span>
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
              className="py-8 bg-gray-50 dark:bg-[#1A1A1A]"
            >
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col gap-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search members by name, role, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-6 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                                 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white 
                                 placeholder-gray-400 dark:placeholder-gray-500
                                 focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {/* Department Filter */}
                      <div className="flex-1 min-w-[200px]">
                        <select
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-[#333333] 
                                   bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                   focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                        >
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept === 'all' ? 'All Departments' : dept}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Year Filter */}
                      <div className="flex-1 min-w-[200px]">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-[#333333] 
                                   bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                   focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year === 'all' ? 'All Years' : year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Skills Filter */}
                    <div className="flex flex-wrap gap-2">
                      {allSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            selectedSkills.includes(skill)
                              ? 'bg-ok-orange text-white'
                              : 'bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333333]'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Members Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedMembers.map((member) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white dark:bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-200 dark:border-[#333333] 
                             hover:border-ok-orange/50 transition-all duration-300 shadow-lg dark:shadow-none
                             hover:shadow-xl hover:shadow-ok-orange/10 dark:hover:shadow-ok-orange/5"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <CldImage
                        width="500"
                        height="500"
                        src={member.image}
                        alt={member.name}
                        className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                      />
                      {member.featured && (
                        <div className="absolute top-4 right-4 bg-ok-orange/80 backdrop-blur-sm text-white px-4 py-1 rounded-xl text-sm
                                      transform transition-transform duration-300 hover:scale-105">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-gray-100 dark:bg-[#252525] text-ok-orange
                                      transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                          <FiUser className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white
                                     transition-colors duration-300 hover:text-ok-orange dark:hover:text-ok-orange">
                          {member.name}
                        </h3>
                      </div>
                      <p className="text-ok-orange font-semibold mb-2">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {member.department} • {member.year}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {member.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                          >
                            <FiGithub className="w-5 h-5" />
                            <span>GitHub</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ok-orange text-white hover:bg-ok-orange/90 transition-colors"
                          >
                            <FiLinkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 