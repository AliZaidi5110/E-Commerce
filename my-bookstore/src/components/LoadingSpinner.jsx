import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700">
          <div className="h-full w-full rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
        </div>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{text}</p>
      )}
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 animate-pulse">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 mb-4"></div>
    <div className="space-y-3">
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-3 w-1/2"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-1/3"></div>
      <div className="space-y-2 pt-2">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-12"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-12"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;