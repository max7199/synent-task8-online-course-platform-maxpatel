import React from 'react';
import { Search, AlertCircle, BookOpen, RefreshCw } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import { motion } from 'framer-motion';

/* ─── Loading Skeleton ─────────────────────────────────────── */
const SkeletonCard = () => (
  <div
    className="glass-panel"
    style={{
      borderRadius: '14px',
      overflow: 'hidden',
      height: '360px',
      animation: 'pulse 1.8s ease-in-out infinite'
    }}
  >
    <div style={{ width: '100%', paddingTop: '56.25%', background: 'rgba(255,255,255,0.05)' }} />
    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ height: '12px', width: '40%', borderRadius: '6px', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ height: '18px', width: '85%', borderRadius: '6px', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ height: '18px', width: '65%', borderRadius: '6px', background: 'rgba(255,255,255,0.04)' }} />
      <div style={{ height: '12px', width: '50%', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', marginTop: '0.5rem' }} />
    </div>
  </div>
);

/* ─── Main Page ─────────────────────────────────────────────── */
const CoursesPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredCourses,
    dynamicCategories,
    loading,
    error
  } = useCourses();

  /* ── Loading State ── */
  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '3rem 0' }}>
        <div className="radial-glow" style={{ top: '10%', right: '10%' }} />
        <div className="radial-glow" style={{ bottom: '20%', left: '5%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Browse Our <span className="gradient-text">Academic Programs</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
              Elevate your engineering skills with industry-curated curriculums and tools.
            </p>
          </div>

          {/* Skeleton grid */}
          <div className="grid-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  /* ── Error State ── */
  if (error) {
    return (
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '3rem 0' }}>
        <div className="radial-glow" style={{ top: '10%', right: '10%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Browse Our <span className="gradient-text">Academic Programs</span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: '520px',
              margin: '3rem auto',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              background: 'rgba(239, 68, 68, 0.05)'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertCircle size={26} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Failed to Load Courses
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: '1.6' }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '10px',
                background: 'var(--gradient-primary)',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ── Normal State ── */
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '3rem 0' }}>
      <div className="radial-glow" style={{ top: '10%', right: '10%' }} />
      <div className="radial-glow" style={{ bottom: '20%', left: '5%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Browse Our <span className="gradient-text">Academic Programs</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
            Elevate your engineering skills with industry-curated curriculums and tools.
          </p>
        </div>

        {/* Filter controls panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>

          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '550px', width: '100%', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search by course title, tech stack, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: '3rem',
                paddingRight: '1rem',
                borderRadius: '14px',
                height: '52px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.07)'
              }}
            />
            <Search size={20} style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>

          {/* Category Tabs — derived from real backend data */}
          {dynamicCategories.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {dynamicCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'var(--gradient-primary)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedCategory === cat ? 'white' : 'var(--text-muted)',
                    border: selectedCategory === cat ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '100px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
        </div>

        {/* Grid / Empty states */}
        {filteredCourses.length > 0 ? (
          <motion.div layout className="grid-3">
            {filteredCourses.map(course => (
              <CourseCard key={course.id || course._id} course={course} />
            ))}
          </motion.div>
        ) : searchQuery || selectedCategory !== 'All' ? (
          /* No results for current filter */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.01)',
              maxWidth: '500px',
              margin: '2rem auto'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Courses Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              We couldn't find any courses matching your search criteria. Try modifying your filters or searching another keyword.
            </p>
          </motion.div>
        ) : (
          /* API returned an empty array */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: '480px',
              margin: '3rem auto',
              padding: '3rem 2rem',
              textAlign: 'center',
              borderRadius: '16px',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.01)'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <BookOpen size={28} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              No Courses Available Yet
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Check back soon — new courses are being added regularly.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
