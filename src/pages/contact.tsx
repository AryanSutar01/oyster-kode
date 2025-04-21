import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Head>
        <title>Contact Us - Oyster Kode Club</title>
        <meta name="description" content="Get in touch with Oyster Kode Club" />
      </Head>

      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gradient-to-r from-ok-orange to-ok-blue">
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-white/90">
                Have questions or want to collaborate? We'd love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Get in Touch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      We're always excited to hear from students, faculty, and potential collaborators.
                      Feel free to reach out to us through any of the following channels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-ok-orange">
                        <FiMail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:oysterkodeclub@gmail.com"
                          className="text-gray-600 dark:text-gray-400 hover:text-ok-orange transition-colors"
                        >
                          oysterkodeclub@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-ok-orange">
                        <FiMapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Location
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Rajarambapu Institute of Technology,<br />
                          Islampur, Sangli, Maharashtra - 415 414
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-ok-orange">
                        <FiPhone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Phone
                        </h3>
                        <a
                          href="tel:+1234567890"
                          className="text-gray-600 dark:text-gray-400 hover:text-ok-orange transition-colors"
                        >
                          +91- 99754 51613
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Follow Us
                    </h3>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/oysterkode"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                      >
                        <FiGithub className="w-6 h-6" />
                      </a>
                      <a
                        href="https://linkedin.com/company/oysterkode"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                      >
                        <FiLinkedin className="w-6 h-6" />
                      </a>
                      <a
                        href="https://twitter.com/oysterkode"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-gray-100 dark:bg-[#252525] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors"
                      >
                        <FiTwitter className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                                 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                                 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                                 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#333333] 
                                 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-ok-orange focus:border-transparent transition-all"
                      />
                    </div>

                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-xl ${
                          submitStatus.type === 'success'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ok-orange text-white 
                               hover:bg-ok-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSend className="w-5 h-5" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 