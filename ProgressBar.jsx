import React from 'react';

const ProgressBar = ({ progress, showText = true, height = '8px' }) => {
  const boundedProgress = Math.min(Math.max(progress || 0, 0), 100);
  
  return (
    <div style={{ width: '100%' }}>
      {showText && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)',
          marginBottom: '0.25rem' 
        }}>
          <span>Course Completion</span>
          <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{boundedProgress}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: height,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{
          width: `${boundedProgress}%`,
          height: '100%',
          background: 'var(--gradient-primary)',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
