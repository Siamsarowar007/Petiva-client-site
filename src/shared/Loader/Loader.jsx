import React from 'react';

const Loader = ({ size = 'lg', color = '#4CA3B8', className = '' }) => {
  let spinnerSizeClasses = '';
  let borderSize = 'border-4';

  switch (size) {
    case 'sm':
      spinnerSizeClasses = 'w-8 h-8';
      borderSize = 'border-3';
      break;
    case 'md':
      spinnerSizeClasses = 'w-12 h-12';
      borderSize = 'border-4';
      break;
    case 'lg':
      spinnerSizeClasses = 'w-16 h-16'; 
      borderSize = 'border-5';
      break;
    case 'xl':
      spinnerSizeClasses = 'w-20 h-20';
      borderSize = 'border-6';
      break;
    default:
      spinnerSizeClasses = 'w-16 h-16';
      borderSize = 'border-5';
  }

  return (
    <div className={`flex min-h-screen justify-center items-center ${className}`}>
      <div
        className={`inline-block animate-spin rounded-full ${spinnerSizeClasses} ${borderSize} border-solid`}
        style={{
          borderColor: color,
          borderRightColor: 'transparent',
          borderTopColor: 'transparent'
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;