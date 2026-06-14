import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LayoutDashboard, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(6, 7, 19, 0.75)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      height: '80px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container flex-between" style={{ width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)'
          }}>
            <BookOpen size={20} />
          </div>
          <span 
            className="gradient-text glow-text" 
            style={{ 
              fontSize: '1.4rem', 
              fontWeight: '800', 
              letterSpacing: '-0.5px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            AstraLearn
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-menu">
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? 'white' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  padding: '0.25rem 0',
                  transition: 'var(--transition)'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px' }}
                >
                  {user.role === 'admin' ? (
                    <>
                      <Shield size={16} style={{ color: 'var(--primary)' }} />
                      <span>Admin Hub</span>
                    </>
                  ) : (
                    <>
                      <LayoutDashboard size={16} style={{ color: 'var(--primary)' }} />
                      <span>Dashboard</span>
                    </>
                  )}
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="btn-primary"
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    borderRadius: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    boxShadow: 'none',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#f87171'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  }}
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600' }}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.95rem', borderRadius: '10px' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="mobile-hamburger"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'rgba(6, 7, 19, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999
        }}>
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <User size={16} />
                <span>Logged in as <strong>{user.name}</strong></span>
              </div>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setIsOpen(false)}
                className="btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-danger"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{ justifyContent: 'center' }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Embedded CSS for layout transitions */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
