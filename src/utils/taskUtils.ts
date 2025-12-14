import { Task, FilterOptions } from '../types/Task';
import { format, parseISO, compareAsc, compareDesc } from 'date-fns';

export const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
  } catch {
    return 'Invalid date';
  }
};

export const sortTasks = (tasks: Task[], sortBy: FilterOptions['sortBy']): Task[] => {
  const tasksCopy = [...tasks];
  
  switch (sortBy) {
    case 'oldest':
      return tasksCopy.sort((a, b) => compareAsc(parseISO(a.createdAt), parseISO(b.createdAt)));
    case 'newest':
      return tasksCopy.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));
    case 'dueDate':
      return tasksCopy.sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)));
    default:
      return tasksCopy;
  }
};

export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  let filtered = [...tasks];

  if (filters.priority && filters.priority !== 'All') {
    filtered = filtered.filter(task => task.priority === filters.priority);
  }

  if (filters.status && filters.status !== 'All') {
    filtered = filtered.filter(task => task.status === filters.status);
  }

  return sortTasks(filtered, filters.sortBy);
};

export const checkDuplicateTitle = (tasks: Task[], title: string, status: string, excludeId?: number): boolean => {
  return tasks.some(task => 
    task.title.toLowerCase() === title.toLowerCase() && 
    task.status === status && 
    task.id !== excludeId
  );
};

export const getDuplicateNumber = (tasks: Task[], title: string, status: string): number => {
  const duplicates = tasks.filter(task => 
    task.title.toLowerCase().startsWith(title.toLowerCase()) && 
    task.status === status
  );
  return duplicates.length;
};