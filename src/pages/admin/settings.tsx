import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiSettings, FiSave, FiRefreshCw, FiAlertCircle, FiMail, FiLock, FiGlobe } from 'react-icons/fi';
import AdminLayout from '@/components/admin/Layout';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  googleAnalyticsId: string;
  recaptchaSiteKey: string;
  recaptchaSecretKey: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'OysterKode',
    siteDescription: 'Empowering Innovation Through Technology',
    contactEmail: 'contact@oysterkode.com',
    maintenanceMode: false,
    allowRegistrations: true,
    googleAnalyticsId: '',
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Settings - Admin Panel</title>
      </Head>

      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiSettings className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/20 
                       text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 
                       transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <FiRefreshCw className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

          {saveStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${
                saveStatus.type === 'success'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiAlertCircle className="w-5 h-5" />
                <span>{saveStatus.message}</span>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                General Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                             border border-gray-200 dark:border-[#333333] 
                             text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                             border border-gray-200 dark:border-[#333333] 
                             text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                               border border-gray-200 dark:border-[#333333] 
                               text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Security Settings
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Temporarily disable the website for maintenance
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                             ${settings.maintenanceMode ? 'bg-blue-500' : 'bg-gray-200 dark:bg-[#333333]'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                               ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Allow Registrations
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable new user registrations
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, allowRegistrations: !settings.allowRegistrations })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors 
                             ${settings.allowRegistrations ? 'bg-blue-500' : 'bg-gray-200 dark:bg-[#333333]'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform 
                               ${settings.allowRegistrations ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Integration Settings */}
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl shadow-lg dark:shadow-none p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Integration Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Google Analytics ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                      className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                               border border-gray-200 dark:border-[#333333] 
                               text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    reCAPTCHA Site Key
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={settings.recaptchaSiteKey}
                      onChange={(e) => setSettings({ ...settings, recaptchaSiteKey: e.target.value })}
                      className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                               border border-gray-200 dark:border-[#333333] 
                               text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    reCAPTCHA Secret Key
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={settings.recaptchaSecretKey}
                      onChange={(e) => setSettings({ ...settings, recaptchaSecretKey: e.target.value })}
                      className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 dark:bg-[#252525] 
                               border border-gray-200 dark:border-[#333333] 
                               text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
} 