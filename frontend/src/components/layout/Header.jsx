import React from 'react';
import { Search, CheckSquare } from 'lucide-react';

const Header = ({ searchValue, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-0 sm:h-16 gap-3 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center justify-between sm:justify-start">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TaskMaster</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Organize your work</p>
              </div>
            </div>

            {/* Welcome text - mobile only */}
            <div className="sm:hidden text-right">
              <p className="text-sm font-medium text-gray-900">Welcome</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 sm:max-w-md sm:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  placeholder:text-gray-400
                "
              />
            </div>
          </div>

          {/* Right side - desktop only */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome</p>
              <p className="text-xs text-gray-500">Manage your tasks</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;