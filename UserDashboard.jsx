import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import ProgressBar from '../components/ProgressBar';
import Loader from '../components/Loader';
import { Menu, Play, BookOpen, Clock, Award, Compass, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user, enrolledCourses, loadingEnrollments } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter courses user actually enrolled in (backend gives full objects)
  const userEnrolledList = enrolledCourses;

  // Compute stats
  const totalEnrolled = userEnrolledList.length;

  // Calculate average progress
  let progressSum = 0;
  userEnrolledList.forEach(enrollment => {
    progressSum += enrollment.progress || 0;
  });
  const avgProgress = totalEnrolled > 0 ? Math.round(progressSum / totalEnrolled) : 0;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loadingEnrollments) return <Loader />;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-dark)' }}>
      {/* Sidebar Panel */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} type="student" />

      {/* Main Panel Content Area */}
      <main style={{
        flexGrow: 1,
        padding: '2rem 1.5rem',
        marginLeft: '0', // Shift for responsive sidebar handled by media queries
        // On desktop sidebar is sticky
        '@media (min-width: 992px)': {
          paddingLeft: '280px'
        }
      }} className="dashboard-content">
        <div className="container" style={{ padding: 0 }}>
          {/* Header Dashboard panel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
                Welcome back, <span className="gradient-text">{user?.name}</span> 👋
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Keep building, code compilation starts here.
              </p>
            </div>

            {/* Sidebar toggle for mobile */}
            <button
              onClick={toggleSidebar}
              className="btn-secondary mobile-sidebar-trigger"
              style={{
                display: 'none',
                padding: '0.6rem',
                borderRadius: '10px'
              }}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Stats Cards Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <DashboardCard
              title="Enrolled Courses"
              value={totalEnrolled}
              iconName="BookOpen"
              trend="+1 new"
              glowColor="rgba(124, 58, 237, 0.12)"
            />
            <DashboardCard
              title="Average Progress"
              value={`${avgProgress}%`}
              iconName="Award"
              trend="On track"
              glowColor="rgba(16, 185, 129, 0.12)"
            />
          </div>

          {/* Recently Accessed Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={20} className="text-primary" />
                Active Courses
              </h2>
              <Link to="/courses" className="link-primary" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Browse Catalog</Link>
            </div>

            {totalEnrolled === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ padding: '3rem 2rem', textAlign: 'center' }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(124, 58, 237, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'var(--accent)'
                }}>
                  <Compass size={30} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>No active courses yet</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  Explore our collection of professional courses and start learning today.
                </p>
                <Link to="/courses" className="btn-primary">Explore Courses</Link>
              </motion.div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {userEnrolledList.map((enrollment) => {
                  const course = enrollment.course;
                  return (
                    <motion.div
                      key={enrollment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-panel glass-panel-hover"
                      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                    >
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}>
                          <img
                            src={course?.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200'}
                            alt={course?.title || 'Course'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase' }}>{course?.category || 'Development'}</span>
                          <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            marginTop: '0.25rem',
                            marginBottom: '0.5rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {course?.title || 'Untitled Course'}
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>by {course?.instructor?.name || 'Platform Instructor'}</p>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                          <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{enrollment.progress || 0}%</span>
                        </div>
                        <ProgressBar progress={enrollment.progress || 0} />
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                        <Link
                          to={`/learning/${course?._id || course}`}
                          className="btn-primary"
                          style={{
                            padding: '0.6rem 1rem',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            flex: 1
                          }}
                        >
                          <Play size={14} fill="currentColor" />
                          Continue
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
