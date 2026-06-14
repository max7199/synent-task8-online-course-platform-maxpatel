import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, ShieldAlert, LogOut, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, type = 'student' }) => {
  const { logout, user } = useAuth();

  const studentLinks = [
    { name: 'Dashboard Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Enrolled Courses', path: '/courses', icon: BookOpen }, // Links to course page for browsing or filtering
  ];

  const adminLinks = [
    { name: 'Admin Hub', path: '/admin', icon: ShieldAlert },
    { name: 'Browse Courses', path: '/courses', icon: BookOpen }
  ];

  const links = type === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className="glass-panel"
        style={{
          position: 'fixed',
          top: '80px',
          bottom: 0,
          left: 0,
          width: '260px',
          zIndex: 999,
          borderRadius: '0',
          borderRight: '1px solid var(--border-color)',
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: 'none',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          // Responsive support for screen sizes
          '@media (min-width: 992px)': {
            transform: 'translateX(0) !important',
            position: 'sticky',
            height: 'calc(100vh - 80px)'
          }
        }}
        id="dashboard-sidebar"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* User profile card in sidebar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            paddingBottom: '1.5rem', 
            borderBottom: '1px solid var(--border-color)' 
          }}>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.1rem',
              boxShadow: '0 0 10px rgba(124, 58, 237, 0.3)'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', wordBreak: 'break-all' }}>{user?.name}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                {user?.role} Account
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={idx}
                  to={link.path}
                  end
                  onClick={toggleSidebar}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    textDecoration: 'none',
                    background: isActive ? 'var(--gradient-primary)' : 'transparent',
                    border: isActive ? 'none' : '1px solid transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'var(--transition)'
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.style.background.includes('gradient')) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.style.background.includes('gradient')) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={14} style={{ opacity: 0.5 }} />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions inside sidebar */}
        <div>
          <button
            onClick={() => {
              logout();
              toggleSidebar();
            }}
            className="btn-secondary"
            style={{
              width: '100%',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Embedded Mobile CSS Hack for Sidebar responsiveness */}
      <style>{`
        @media (max-width: 991px) {
          #dashboard-sidebar {
            /* Handled by transform toggle on mobile width */
          }
        }
        @media (min-width: 992px) {
          #dashboard-sidebar {
            transform: translateX(0) !important;
            position: sticky !important;
            height: calc(100vh - 80px) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
