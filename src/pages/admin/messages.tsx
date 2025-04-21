import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiMail, FiClock, FiCheck, FiX } from 'react-icons/fi';
import AdminLayout from '@/components/admin/Layout';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export default function Messages() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/admin/contact-submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'read':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'replied':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Messages - Admin Panel</title>
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Contact Messages
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {submissions.length} messages
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-[#333333]">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    All Messages
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-[#333333]">
                  {submissions.map((submission) => (
                    <motion.div
                      key={submission._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors ${
                        selectedSubmission?._id === submission._id
                          ? 'bg-gray-50 dark:bg-[#252525]'
                          : ''
                      }`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {submission.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {submission.subject}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            submission.status
                          )}`}
                        >
                          {submission.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="w-4 h-4" />
                        <span>{formatDate(submission.createdAt)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              {selectedSubmission ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedSubmission.subject}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                          From: {selectedSubmission.name} ({selectedSubmission.email})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/20 
                                   text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 
                                   transition-all duration-200 hover:scale-105"
                          onClick={() => {
                            const subject = `Re: ${selectedSubmission.subject}`;
                            const body = `\n\n\n--- Original Message ---\nFrom: ${selectedSubmission.name} (${selectedSubmission.email})\nSubject: ${selectedSubmission.subject}\n\n${selectedSubmission.message}`;
                            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedSubmission.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                          }}
                        >
                          <FiMail className="w-5 h-5" />
                          <span>Reply via Email</span>
                        </button>
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-[#333333]">
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/20 
                                   text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 
                                   transition-all duration-200 hover:scale-105"
                          onClick={() => {
                            const subject = `Re: ${selectedSubmission.subject}`;
                            const body = `\n\n\n--- Original Message ---\nFrom: ${selectedSubmission.name} (${selectedSubmission.email})\nSubject: ${selectedSubmission.subject}\n\n${selectedSubmission.message}`;
                            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedSubmission.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                          }}
                        >
                          <FiMail className="w-5 h-5" />
                          <span>Reply via Email</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none">
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
} 