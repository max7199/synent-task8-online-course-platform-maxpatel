import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, BookOpen, User, CheckCircle2, ChevronDown, ChevronUp, Play, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Loader from '../components/Loader';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrolledCourses, enrollInCourse } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0); // Track open accordion index

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Failed to fetch course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (!course) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The course you are looking for does not exist or has been removed.</p>
        <Link to="/courses" className="btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const isEnrolled = enrolledCourses.some(enrollment => 
    (enrollment.course?._id || enrollment.course) === course._id
  );

  const handleEnrollment = async () => {
    if (!user) {
      toast.error('Please login to enroll in this course');
      navigate('/login');
      return;
    }

    const success = await enrollInCourse(course._id);
    if (success) {
      navigate('/dashboard');
    }
  };

  const toggleSection = (idx) => {
    setActiveSection(activeSection === idx ? null : idx);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="radial-glow" style={{ top: '10%', left: '10%' }} />

      {/* Top Hero Banner */}
      <section style={{
        background: 'linear-gradient(to bottom, rgba(13, 15, 34, 0.8) 0%, rgba(6, 7, 19, 1) 100%)',
        borderBottom: '1px solid var(--border-color)',
        padding: '4rem 0 3rem 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Left text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span className="badge badge-primary" style={{ width: 'max-content' }}>{course?.category ?? 'General'}</span>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', letterSpacing: '-0.5px' }}>{course?.title ?? 'Untitled Course'}</h1>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{course?.description ?? 'No description available.'}</p>
              
              {/* Review metrics */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)' }}>
                  <Star size={16} fill="var(--warning)" />
                  <span style={{ fontWeight: '800', color: 'white' }}>{course?.rating?.toFixed(1) ?? '0.0'}</span>
                  <span>({course?.reviewsCount ?? 0} reviews)</span>
                </div>
                <div>Level: <strong style={{ color: 'white' }}>{course?.level ?? 'TBA'}</strong></div>
              </div>

              {/* Instructor Bio Preview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <img src={course?.instructor?.avatar ?? ''} alt={course?.instructor?.name ?? 'Instructor'} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>Taught by {course?.instructor?.name ?? 'Unknown Instructor'}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course?.instructor?.title ?? ''}</span>
                </div>
              </div>
            </div>

            {/* Right Thumbnail & Enroll box */}
            <div className="glass-panel" style={{ padding: '1.5rem', overflow: 'hidden' }}>
              <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', paddingTop: '56.25%', marginBottom: '1.5rem' }}>
                <img 
                  src={course?.thumbnail || 'https://images.unsplash.com/photo-1542744094-3a31f272c49a?q=80&w=2069&auto=format&fit=crop'} 
                  alt={course?.title ?? 'Course'} 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542744094-3a31f272c49a?q=80&w=2069&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Price Details */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {course?.discountPrice ? (
                  <>
                    <span style={{ fontSize: '2rem', fontWeight: '800' }}>₹{course?.discountPrice?.toFixed(2) ?? "0.00"}</span>
                    <span style={{ fontSize: '1.1rem', color: 'var(--text-dark)', textDecoration: 'line-through' }}>₹{course?.price?.toFixed(2) ?? "0.00"}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700' }}>
                      {course?.price ? Math.round(((course.price - course.discountPrice) / course.price) * 100) : 0}% OFF
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: '2.2rem', fontWeight: '800' }}>₹{course?.price?.toFixed(2) ?? "0.00"}</span>
                )}
              </div>

              {/* Purchase button */}
              {isEnrolled ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link to={`/learning/${course._id}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', borderRadius: '10px' }}>
                    <span>Resume Learning</span>
                  </Link>
                  <Link to="/dashboard" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', borderRadius: '10px' }}>
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <button onClick={handleEnrollment} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', borderRadius: '10px' }}>
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Split Grid */}
      <section className="container" style={{ position: 'relative', zIndex: 1, marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgColumns: '2fr 1fr', gap: '3rem' }} className="details-grid">
          
          {/* Main Info Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Description */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Course Overview</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>{course?.description}</p>
            </div>

            {/* Curriculum Accordion */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Course Curriculum</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {course?.content?.length || 0} lessons &bull; {course?.duration || '10 hours'} total length
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {course?.content?.map((lecture, idx) => (
                  <div key={idx} className="glass-panel" style={{ overflow: 'hidden', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Play size={16} className="text-primary" />
                    <span style={{ fontWeight: '600' }}>{idx + 1}. {lecture.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>This Course Includes:</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                  <span>{course.duration} on-demand video tutorials</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                  <span>Lifetime access to course updates</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                  <span>Certificate of Mastery on completion</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                  <span>Interactive Q&A forum access</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Responsiveness Helper Style */}
      <style>{`
        @media (min-width: 992px) {
          .details-grid {
            grid-template-columns: 2fr 1.1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetailsPage;
