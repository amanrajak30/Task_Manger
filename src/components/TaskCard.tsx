import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/Task';
import { formatDate, checkDuplicateTitle } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  index: number;
  allTasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, allTasks, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isDuplicate = checkDuplicateTitle(allTasks, task.title, task.status, task.id);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow ${
            snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
          }`}
          onClick={() => onEdit(task)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 flex-1 pr-2">{task.title}</h3>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              title="Delete"
            >
              ×
            </button>
          </div>
          
          {isDuplicate && (
            <div className="mb-2">
              <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded border border-orange-200">
                Duplicate
              </span>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex justify-between items-center text-xs">
            <span className={`px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-gray-500">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;