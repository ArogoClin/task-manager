import React from 'react';
import { 
  Calendar, 
  Edit, 
  Trash2, 
  CheckCircle2,
  Circle,
  Tag,
  AlertCircle 
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { 
  STATUS_CONFIG, 
  PRIORITY_CONFIG 
} from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/dateHelpers';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusConfig = STATUS_CONFIG[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate, task.status);
  const isCompleted = task.status === 'completed';

  const handleQuickComplete = () => {
    const newStatus = isCompleted ? 'pending' : 'completed';
    onStatusChange(task.id, newStatus);
  };

  return (
    <Card 
      hover 
      className={`
        p-4 sm:p-6 
        ${overdue ? 'border-red-300 bg-red-50' : ''}
        ${isCompleted ? 'opacity-70' : ''}
      `}
    >
      {/* Priority badge and overdue indicator */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <Badge 
          variant={
            task.priority === 'urgent' ? 'danger' : 
            task.priority === 'high' ? 'warning' : 
            'default'
          }
          size="sm"
        >
          <span className={`w-2 h-2 rounded-full ${priorityConfig.bgColor} mr-1.5`}></span>
          <span className="hidden xs:inline">{priorityConfig.label}</span>
          <span className="xs:hidden">{priorityConfig.label.charAt(0)}</span>
        </Badge>

        {overdue && (
          <div className="flex items-center space-x-1 text-red-600">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium hidden sm:inline">Overdue</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className={`
        text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words
        ${isCompleted ? 'line-through text-gray-500' : ''}
      `}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 break-words">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700"
            >
              <Tag className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate max-w-[100px]">{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200">
        {/* Due date and status */}
        <div className="flex flex-col space-y-2">
          {task.dueDate && (
            <div className={`
              flex items-center space-x-2 text-xs sm:text-sm
              ${overdue ? 'text-red-600 font-medium' : 'text-gray-600'}
            `}>
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusConfig.dotColor}`}></span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuickComplete}
            className="p-1.5 sm:p-2"
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            ) : (
              <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="p-1.5 sm:p-2"
            title="Edit task"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="p-1.5 sm:p-2"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;