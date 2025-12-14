# Environment Variables Documentation

## Overview

This Task Manager application uses environment variables for configuration. All variables must start with `REACT_APP_` to be accessible in the React application.

## Files Structure

- `.env` - Local development environment variables
- `.env.example` - Template file showing all available variables
- `.env.production` - Production environment variables
- `src/config/env.ts` - Configuration utility that reads environment variables

## Available Environment Variables

### App Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_NAME` | "Task Manager" | Application name displayed in header |
| `REACT_APP_VERSION` | "1.0.0" | Application version |
| `REACT_APP_ENVIRONMENT` | "development" | Current environment |
| `REACT_APP_DESCRIPTION` | "A modern task management application" | App description |

### API Configuration (Future Use)
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | "http://localhost:3001/api" | Backend API URL |
| `REACT_APP_API_TIMEOUT` | "10000" | API request timeout in milliseconds |

### Feature Flags
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_ENABLE_DEBUG` | "true" (dev), "false" (prod) | Enable debug logging |
| `REACT_APP_ENABLE_ANALYTICS` | "false" (dev), "true" (prod) | Enable analytics tracking |
| `REACT_APP_ENABLE_DRAG_DROP` | "true" | Enable drag and drop functionality |
| `REACT_APP_ENABLE_FILTERS` | "true" | Enable task filtering |

### Storage Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_STORAGE_KEY` | "task-manager-tasks" | localStorage key for tasks |
| `REACT_APP_MAX_TASKS` | "1000" | Maximum number of tasks allowed |
| `REACT_APP_AUTO_SAVE` | "true" | Enable automatic saving |

### UI Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_THEME` | "light" | UI theme (light/dark) |
| `REACT_APP_DEFAULT_PRIORITY` | "Medium" | Default priority for new tasks |
| `REACT_APP_ITEMS_PER_PAGE` | "50" | Items per page for pagination |

### External Services
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_GOOGLE_ANALYTICS_ID` | "" | Google Analytics tracking ID |
| `REACT_APP_SENTRY_DSN` | "" | Sentry error tracking DSN |
| `REACT_APP_FIREBASE_API_KEY` | "" | Firebase API key |

### Development Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_MOCK_DATA` | "true" (dev), "false" (prod) | Use mock data |
| `REACT_APP_LOG_LEVEL` | "debug" (dev), "error" (prod) | Logging level |

## Usage in Code

### Import Configuration
```typescript
import config from './config/env';

// Use configuration
const appName = config.app.name;
const isDebugEnabled = config.features.debug;
```

### Examples
```typescript
// App information
console.log(`Running ${config.app.name} v${config.app.version}`);

// Feature flags
if (config.features.debug) {
  console.log('Debug mode enabled');
}

// Storage configuration
localStorage.setItem(config.storage.key, JSON.stringify(tasks));

// Environment checks
if (config.isDevelopment()) {
  // Development-only code
}
```

## Setting Up Environment Variables

### Local Development
1. Copy `.env.example` to `.env`
2. Update values as needed
3. Restart development server

### Render Deployment
1. Go to Render dashboard
2. Navigate to your project
3. Click "Environment" tab
4. Add environment variables:
   - Key: `REACT_APP_NAME`
   - Value: `Task Manager`
   - (repeat for other variables)

### Other Platforms
- **Vercel**: Add in project settings → Environment Variables
- **Netlify**: Add in site settings → Environment variables
- **GitHub Pages**: Not supported (static hosting only)

## Security Notes

⚠️ **Important Security Information**:

1. **All `REACT_APP_` variables are PUBLIC** - they're embedded in the built JavaScript
2. **Never store secrets** like API keys, passwords, or tokens in `REACT_APP_` variables
3. **Use backend proxy** for sensitive API calls
4. **Environment variables are build-time** - changes require rebuild

## Best Practices

### ✅ Good Practices
- Use descriptive variable names
- Provide sensible defaults
- Document all variables
- Use feature flags for optional functionality
- Keep sensitive data on backend

### ❌ Avoid
- Storing secrets in `REACT_APP_` variables
- Hardcoding values that might change
- Using environment variables for runtime configuration
- Exposing internal system information

## Troubleshooting

### Variables Not Working?
1. **Check prefix**: Must start with `REACT_APP_`
2. **Restart server**: Changes require restart in development
3. **Rebuild**: Production deployments need rebuild
4. **Check spelling**: Variable names are case-sensitive

### Common Issues
- **Undefined variables**: Check spelling and prefix
- **Old values**: Clear browser cache and rebuild
- **Build failures**: Check for syntax errors in .env files
- **Missing in production**: Ensure variables are set in deployment platform

## Environment File Priority

React loads environment files in this order (higher priority overrides lower):
1. `.env.development.local`, `.env.local`, `.env.development`, `.env`
2. In production: `.env.production.local`, `.env.local`, `.env.production`, `.env`

## Example Deployment Configuration

### Render Environment Variables
```
REACT_APP_NAME=Task Manager Pro
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_DEBUG=false
REACT_APP_ENABLE_ANALYTICS=true
```

This configuration system makes the app flexible and easy to configure for different environments while maintaining security best practices.