import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, BookOpen, User } from 'lucide-react';

const CourseCard = ({ course, isEnrolled = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="glass-panel glass-panel-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
        <img
          src={course?.thumbnail || 'https://images.unsplash.com/photo-1542744094-3a31f272c49a?q=80&w=2069&auto=format&fit=crop'}
          alt={course?.title ?? 'Course'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542744094-3a31f272c49a?q=80&w=2069&auto=format&fit=crop';
          }}
        />
        
        {/* Floating Category Tag */}
        <span 
          className="badge badge-primary" 
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 2,
            backdropFilter: 'blur(8px)',
            background: 'rgba(13, 15, 34, 0.75)'
          }}
        >
          {course?.category ?? 'General'}
        </span>
        
        {isEnrolled && (
          <span 
            className="badge badge-accent" 
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 2,
              backdropFilter: 'blur(8px)',
              background: 'rgba(16, 185, 129, 0.75)'
            }}
          >
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <Star size={14} fill="var(--warning)" />
          <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{course?.rating?.toFixed(1) ?? "0.0"}</span>
          <span style={{ color: 'var(--text-dark)' }}>({course?.reviewsCount ?? 0})</span>
        </div>

        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '700', 
          marginBottom: '0.75rem', 
          lineHeight: '1.4', 
          minHeight: '2.8rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course?.title ?? 'Untitled Course'}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <User size={14} />
          <span>{course?.instructor?.name ?? 'Unknown Instructor'}</span>
        </div>

        {/* Technical details grid */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '0.75rem', 
          marginBottom: '1.25rem', 
          fontSize: '0.8rem', 
          color: 'var(--text-muted)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} />
            <span>{course?.duration ?? 'TBA'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <BookOpen size={12} />
            <span>{course?.lessonsCount ?? 0} lessons</span>
          </div>
        </div>

        {/* Pricing and Action */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {course?.discountPrice ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)' }}>₹{course?.discountPrice?.toFixed(2) ?? "0.00"}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', textDecoration: 'line-through' }}>₹{course?.price?.toFixed(2) ?? "0.00"}</span>
              </div>
            ) : (
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-main)' }}>₹{course?.price?.toFixed(2) ?? "0.00"}</span>
            )}
          </div>

          <Link 
            to={`/courses/${course?._id}`} 
            className="btn-primary" 
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.85rem',
              borderRadius: '8px'
            }}
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
