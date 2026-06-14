import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.subscribeEmail.value;
    if (email) {
      toast.success('Thank you for subscribing!', { className: 'custom-toast' });
      e.target.reset();
    }
  };

  return (
    <footer style={{
      background: 'rgba(6, 7, 19, 0.95)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        {/* Main Footer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <BookOpen size={16} />
              </div>
              <span className="gradient-text glow-text" style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                AstraLearn
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Empowering learners worldwide through interactive lessons, industrial mentorships, and state-of-the-art developer curriculums.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'var(--transition)', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'var(--transition)', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'var(--transition)', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>All Courses</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Student Portal</Link>
              <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Create Account</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Curriculums</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Web Development</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Artificial Intelligence</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cyber Security</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cloud Computing</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weekly Newsletter</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.4' }}>
              Get tips on design patterns, backend optimizations, and course discounts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                name="subscribeEmail"
                placeholder="Enter email"
                required
                className="form-control"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              />
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '0.5rem', borderRadius: '8px' }}
              >
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Area */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          mdDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-dark)'
        }} className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AstraLearn. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Built for developers with <Heart size={12} fill="var(--danger)" color="var(--danger)" /> as an internship project
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .footer-bottom {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
