import React from 'react';
import { Plus, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';

const TaskFilters = ({ filters, onFilterChange, onCreateClick }) => {
  const statusOptions = [
    { value: '', label: 'All Status' },
    ...STATUS_OPTIONS,
  ];

  const priorityOptions = [
    { value: '', label: 'All Priority' },
    ...PRIORITY_OPTIONS,
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full sm:w-40"
          />

          <Select
            options={priorityOptions}
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value })}
            className="w-full sm:w-40"
          />

          {/* Clear filters */}
          {(filters.status || filters.priority) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilterChange({ status: '', priority: '' })}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Create button */}
        <Button
          icon={Plus}
          onClick={onCreateClick}
          className="w-full md:w-auto"
        >
          New Task
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;