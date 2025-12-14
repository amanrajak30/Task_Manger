import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Task, Status } from '../types/Task';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: Status;
  tasks: Task[];
  allTasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  tasks, 
  allTasks, 
  onEditTask, 
  onDeleteTask 
}) => {
  const getColumnColor = (status: Status) => {
    switch (status) {
      case 'To-Do': return 'border-blue-200 bg-blue-50';
      case 'In-Progress': return 'border-yellow-200 bg-yellow-50';
      case 'Completed': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColor = (status: Status) => {
    switch (status) {
      case 'To-Do': return 'text-blue-700 bg-blue-100';
      case 'In-Progress': return 'text-yellow-700 bg-yellow-100';
      case 'Completed': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className={`flex-1 min-w-0 mx-2 rounded-lg border-2 ${getColumnColor(title)}`}>
      <div className={`p-4 rounded-t-lg ${getHeaderColor(title)}`}>
        <h2 className="font-semibold text-lg flex items-center justify-between">
          {title}
          <span className="bg-white bg-opacity-70 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>
      
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-white bg-opacity-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                allTasks={allTasks}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
            
            {tasks.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>No tasks yet</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;