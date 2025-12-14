# Task Manager App (Trello-Style MVP)

A responsive task management web application built with React and TypeScript, featuring drag-and-drop functionality, task filtering, and local storage persistence.

## 🚀 Live Demo

- **GitHub Repository**: https://github.com/amanrajak30/Task_Manger
- **Live Demo**: https://amanrajak30.github.io/Task_Manger

## ✨ Features

### Core Functionality
- **3-Column Board Layout**: To-Do, In-Progress, Completed
- **Task Management**: Create, edit, delete tasks with confirmation
- **Drag & Drop**: Move tasks between columns seamlessly
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Local Storage**: Persistent data storage in browser

### Task Properties
- Title and description
- Priority levels (Low, Medium, High)
- Due dates with date picker
- Creation timestamps
- Status tracking

### Advanced Features
- **Filtering**: By priority, status, and due date
- **Sorting**: Newest first, oldest first, closest due date
- **Duplicate Detection**: Shows "Duplicate Task" badge for same titles in same column
- **Task Counters**: Display number of tasks in each column
- **Confirmation Dialogs**: Safe task deletion

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: react-beautiful-dnd
- **Date Handling**: date-fns
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage API
- **Build Tool**: Create React App

## 📁 Project Structure

```
task-manager/
├── public/
│   ├── tasks.json              # Initial task data
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskCard.tsx        # Individual task card component
│   │   ├── TaskColumn.tsx      # Column container for tasks
│   │   ├── TaskModal.tsx       # Create/edit task modal
│   │   └── FilterBar.tsx       # Filtering and sorting controls
│   ├── types/
│   │   └── Task.ts             # TypeScript interfaces
│   ├── utils/
│   │   ├── taskUtils.ts        # Task manipulation utilities
│   │   └── localStorage.ts     # Local storage operations
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Application entry point
│   └── index.css               # Global styles with Tailwind
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: Using `--legacy-peer-deps` due to react-beautiful-dnd compatibility with React 18*

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile** (320px - 768px): Single column layout with touch-friendly interactions
- **Tablet** (768px - 1024px): Optimized spacing and touch targets
- **Desktop** (1024px+): Full three-column layout with hover effects

## 🎯 Usage Guide

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Priority level
   - Due date (required)
3. Click "Create Task" to save

### Managing Tasks
- **Edit**: Click on any task card to open the edit modal
- **Delete**: Click the X button on a task card (requires confirmation)
- **Move**: Drag and drop tasks between columns
- **Status Change**: Edit a task and change its status

### Filtering and Sorting
- Use the filter bar to narrow down tasks by priority or status
- Sort tasks by creation date or due date
- Clear all filters with the "Clear filters" button

## 💾 Data Persistence

The application uses localStorage to persist data:

- **Initial Load**: Loads from `public/tasks.json` if no stored data exists
- **Auto-Save**: Automatically saves changes to localStorage
- **Data Format**: JSON array of task objects

### Sample Task Data Structure
```json
{
  "id": 101,
  "title": "Design Homepage UI",
  "description": "Create wireframes and layout structure",
  "priority": "High",
  "status": "To-Do",
  "dueDate": "2025-02-12T09:00:00Z",
  "createdAt": "2025-01-25T14:10:00Z"
}
```

## 🚀 Deployment

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/task-manager",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Production: `vercel --prod`

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add homepage to package.json
3. Deploy: `npm run deploy`

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### TypeScript
TypeScript configuration is in `tsconfig.json` with strict mode enabled for better type safety.

## 🐛 Known Issues

- react-beautiful-dnd shows deprecation warning (still functional)
- Some peer dependency warnings due to React 18 compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

[Your Name] - [Your Email]

---

**Built with ❤️ using React and TypeScript**