import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, TaskFormData, FilterOptions, Status } from './types/Task';
import { generateId, filterTasks, checkDuplicateTitle, getDuplicateNumber } from './utils/taskUtils';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/localStorage';
import TaskColumn from './components/TaskColumn';
import TaskModal from './components/TaskModal';
import FilterBar from './components/FilterBar';
import config from './config/env';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    priority: 'All',
    status: 'All',
    sortBy: 'newest'
  });

  // Load initial tasks
  useEffect(() => {
    const loadTasks = async () => {
      // First try to load from localStorage
      const storedTasks = loadTasksFromStorage();
      
      if (storedTasks && storedTasks.length > 0) {
        setTasks(storedTasks);
      } else {
        // Load from JSON file if no stored tasks
        try {
          const response = await fetch('/tasks.json');
          const initialTasks: Task[] = await response.json();
          setTasks(initialTasks);
          saveTasksToStorage(initialTasks);
        } catch (error) {
          console.error('Error loading initial tasks:', error);
        }
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  const handleCreateTask = (taskData: TaskFormData) => {
    let title = taskData.title;
    
    // Check for duplicates and handle them
    if (checkDuplicateTitle(tasks, title, 'To-Do')) {
      const duplicateCount = getDuplicateNumber(tasks, title, 'To-Do');
      title = `${title} (${duplicateCount})`;
    }

    const newTask: Task = {
      id: generateId(),
      title,
      description: taskData.description,
      priority: taskData.priority,
      status: 'To-Do',
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
  };

  const handleEditTask = (taskData: TaskFormData, taskId?: number) => {
    if (!taskId) return;

    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let title = taskData.title;
        
        // Check for duplicates when editing
        if (checkDuplicateTitle(tasks, title, task.status, taskId)) {
          const duplicateCount = getDuplicateNumber(tasks, title, task.status);
          title = `${title} (${duplicateCount})`;
        }

        return {
          ...task,
          title,
          description: taskData.description,
          priority: taskData.priority,
          dueDate: taskData.dueDate
        };
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const newStatus = destination.droppableId as Status;

    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let title = task.title;
        
        // Handle duplicates when moving to a new status
        if (task.status !== newStatus && checkDuplicateTitle(tasks, task.title, newStatus, taskId)) {
          const duplicateCount = getDuplicateNumber(tasks, task.title, newStatus);
          title = `${task.title} (${duplicateCount})`;
        }

        return { ...task, status: newStatus, title };
      }
      return task;
    }));
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData: TaskFormData, taskId?: number) => {
    if (taskId) {
      handleEditTask(taskData, taskId);
    } else {
      handleCreateTask(taskData);
    }
  };

  // Filter and organize tasks
  const filteredTasks = filterTasks(tasks, filters);
  const todoTasks = filteredTasks.filter(task => task.status === 'To-Do');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'In-Progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{config.app.name}</h1>
              <p className="text-sm text-gray-500">
                {tasks.length} tasks total • v{config.app.version}
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Welcome Message for New Users */}
      {tasks.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-50 border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No tasks yet</h2>
            <p className="text-gray-600 mb-4">
              Create your first task to get started. You can drag tasks between columns to change their status.
            </p>
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create First Task
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
            <TaskColumn
              title="To-Do"
              tasks={todoTasks}
              allTasks={tasks}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="In-Progress"
              tasks={inProgressTasks}
              allTasks={tasks}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
              allTasks={tasks}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </DragDropContext>

      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;
