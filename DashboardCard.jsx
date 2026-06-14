import React from 'react';
import * as Icons from 'lucide-react';

const DashboardCard = ({ title, value, iconName, trend, glowColor = 'rgba(124, 58, 237, 0.15)' }) => {
  const Icon = Icons[iconName] || Icons.HelpCircle;

  return (
    <div 
      className="glass-panel glass-panel-hover" 
      style={{
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 1
      }}
    >
      {/* Background glow node */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-20%',
        width: '120px',
        height: '120px',
        background: `radial-gradient(circle, ${glowColor} 0%, rgba(0, 0, 0, 0) 70%)`,
        pointerEvents: 'none',
        zIndex: -1
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>{title}</span>
        <div style={{
          padding: '0.5rem',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon size={20} />
        </div>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>{value}</h3>
      </div>

      {trend && (
        <div style={{ 
          fontSize: '0.8rem', 
          color: trend.startsWith('+') ? 'var(--accent)' : 'var(--text-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.25rem'
        }}>
          <span>{trend}</span>
          <span style={{ color: 'var(--text-dark)' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
