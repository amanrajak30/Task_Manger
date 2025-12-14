// Environment configuration for Task Manager
// All environment variables must start with REACT_APP_ to be accessible

export const config = {
  // App Information
  app: {
    name: process.env.REACT_APP_NAME || 'Task Manager',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    description: process.env.REACT_APP_DESCRIPTION || 'A modern task management application',
  },

  // API Configuration
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  },

  // Feature Flags
  features: {
    debug: process.env.REACT_APP_ENABLE_DEBUG === 'true',
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    dragDrop: process.env.REACT_APP_ENABLE_DRAG_DROP !== 'false', // default true
    filters: process.env.REACT_APP_ENABLE_FILTERS !== 'false', // default true
  },

  // Storage Configuration
  storage: {
    key: process.env.REACT_APP_STORAGE_KEY || 'task-manager-tasks',
    maxTasks: parseInt(process.env.REACT_APP_MAX_TASKS || '1000'),
    autoSave: process.env.REACT_APP_AUTO_SAVE !== 'false', // default true
  },

  // UI Configuration
  ui: {
    theme: process.env.REACT_APP_THEME || 'light',
    defaultPriority: process.env.REACT_APP_DEFAULT_PRIORITY || 'Medium',
    itemsPerPage: parseInt(process.env.REACT_APP_ITEMS_PER_PAGE || '50'),
  },

  // External Services
  services: {
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    firebaseApiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  },

  // Development Settings
  dev: {
    mockData: process.env.REACT_APP_MOCK_DATA === 'true',
    logLevel: process.env.REACT_APP_LOG_LEVEL || 'info',
  },

  // Helper functions
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isTest: () => process.env.NODE_ENV === 'test',
};

// Debug logging in development
if (config.features.debug && config.isDevelopment()) {
  console.log('🔧 Task Manager Configuration:', config);
}

export default config;