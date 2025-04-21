import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiGithub, FiExternalLink, FiCalendar, FiUsers } from 'react-icons/fi';
import Layout from '@/components/admin/Layout';
import ProjectModal from '@/components/admin/ProjectModal';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  github: string;
  demo?: string;
  featured: boolean;
}

const categories = [
  'All Projects',
  'Web Development',
  'Mobile Apps',
  'AI/ML',
  'Backend'
];

const statuses = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' }
];

const Projects: NextPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      } else {
        console.error('Failed to fetch projects:', data.message);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Projects' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.featured === (selectedStatus === 'active');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/admin/projects?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setProjects(projects.filter(project => project._id !== id));
        } else {
          console.error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = async (projectData: Omit<Project, '_id'>) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setProjects([...projects, data]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add project:', data.message);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleUpdate = async (updatedProjectData: Omit<Project, '_id'>) => {
    if (!selectedProject) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/projects?id=${selectedProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProjectData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setProjects(projects.map(project =>
          project._id === selectedProject._id ? { ...data, _id: project._id } : project
        ));
        setIsModalOpen(false);
        setSelectedProject(null);
      } else {
        console.error('Failed to update project:', data.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>Projects Management - Admin Panel</title>
        <meta name="description" content="Manage Oyster Kode Club projects" />
      </Head>

      <Layout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Projects Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and showcase club projects
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-ok-orange text-white rounded-xl 
                       hover:bg-ok-orange/90 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Project</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 border border-gray-200 dark:border-[#333333] shadow-lg dark:shadow-none">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333]
                             bg-gray-50 dark:bg-[#252525] text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333]
                           bg-gray-50 dark:bg-[#252525] text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333333]
                           bg-gray-50 dark:bg-[#252525] text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-ok-orange focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-32 bg-gray-100 dark:bg-[#252525] rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No projects found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-[#333333]
                             shadow-lg dark:shadow-none hover:border-ok-orange/50 transition-all duration-300
                             overflow-hidden"
                  >
                    <div className="flex">
                      {/* Project Image */}
                      <div className="w-48 h-48 relative flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {project.featured && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-ok-orange text-white text-sm rounded-lg">
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-ok-orange
                                       transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#252525]"
                            >
                              <FiEdit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500
                                       transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#252525]"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Project Meta */}
                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-[#252525]">
                              {project.category}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-sm rounded-lg bg-ok-orange/10 text-ok-orange"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-4 mt-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                                     hover:text-ok-orange transition-colors"
                          >
                            <FiGithub className="w-4 h-4" />
                            <span>View Code</span>
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400
                                       hover:text-ok-orange transition-colors"
                            >
                              <FiExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Project Modal */}
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProject(null);
            }}
            onSubmit={selectedProject ? handleUpdate : handleAdd}
            project={selectedProject}
            onSuccess={fetchProjects}
          />
        </div>
      </Layout>
    </>
  );
};

export default Projects;