import { Task, TaskStatus } from '../types';
import { formatDate, formatPriority, getPriorityColor, getStatusColor, formatTaskStatus } from '../utils/formatting';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const TaskCard = ({
  task,
  onClick,
  onStatusChange,
}: {
  task: Task;
  onClick?: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}) => {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChangingStatus(!isChangingStatus);
  };

  const handleSelectStatus = (e: React.MouseEvent, status: TaskStatus) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(task.id, status);
    }
    setIsChangingStatus(false);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg cursor-pointer transition-all relative group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-gray-900 flex-1 line-clamp-2 group-hover:text-blue-600 transition-colors">{task.title}</h3>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ml-2 ${getPriorityColor(task.priority)}`}>
          {formatPriority(task.priority)}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between relative">
        <div className="relative">
          <button
            onClick={handleStatusClick}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors ${getStatusColor(task.status)} hover:ring-2 hover:ring-offset-1 hover:ring-gray-200`}
          >
            {formatTaskStatus(task.status)}
            <ChevronDown className="w-3 h-3" />
          </button>

          {isChangingStatus && (
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in slide-in-from-bottom-2">
              {Object.values(TaskStatus).map((status) => (
                <button
                  key={status}
                  onClick={(e) => handleSelectStatus(e, status)}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
                    task.status === status ? 'font-bold text-blue-600 bg-blue-50' : 'text-gray-600'
                  }`}
                >
                  {formatTaskStatus(status)}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {task.dueDate && (
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

      {task.assignee && (
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-[10px] text-white font-bold">{task.assignee.name[0]}</span>
          </div>
          <span className="text-xs font-medium text-gray-600 truncate">{task.assignee.name}</span>
        </div>
      )}
    </div>
  );
};
