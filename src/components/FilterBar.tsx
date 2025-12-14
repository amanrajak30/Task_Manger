import React from 'react';
import { FilterOptions, Priority, Status } from '../types/Task';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const handlePriorityChange = (priority: Priority | 'All') => {
    onFiltersChange({ ...filters, priority });
  };

  const handleStatusChange = (status: Status | 'All') => {
    onFiltersChange({ ...filters, status });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Priority:</label>
          <select
            value={filters.priority || 'All'}
            onChange={(e) => handlePriorityChange(e.target.value as Priority | 'All')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Status:</label>
          <select
            value={filters.status || 'All'}
            onChange={(e) => handleStatusChange(e.target.value as Status | 'All')}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="dueDate">Closest due date</option>
          </select>
        </div>

        <button
          onClick={() => onFiltersChange({ priority: 'All', status: 'All', sortBy: 'newest' })}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;