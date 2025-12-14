export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To-Do' | 'In-Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export interface FilterOptions {
  priority?: Priority | 'All';
  status?: Status | 'All';
  sortBy: 'oldest' | 'newest' | 'dueDate';
}