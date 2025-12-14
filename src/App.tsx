import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Task, TaskFormData, FilterOptions, Status } from './types/Task';
import { generateId, filterTasks, checkDuplicateTitle, getDuplicateNumber } from './utils/taskUtils';
import { loadTasksFromStorage, saveTasksToStorage } from './utils/localStorage';
import TaskColumn from './components/TaskColumn';
import TaskModal from './components/TaskModal';
import FilterBar from './components/FilterBar';

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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <span className="ml-3 text-sm text-gray-500">
                {tasks.length} total tasks
              </span>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
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
