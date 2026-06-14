import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import { Menu, Plus, Trash2, ShieldCheck, Database, Landmark, BookOpen } from 'lucide-react';
import { categories } from '../data/coursesData';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { courses, addCourse, deleteCourse } = useCourses();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    price: '',
    discountPrice: '',
    duration: '',
    lessonsCount: '',
    level: 'Beginner',
    instructorName: '',
    instructorTitle: '',
    thumbnail: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const success = addCourse(formData);
    if (success) {
      // Clear form
      setFormData({
        title: '',
        category: 'Web Development',
        price: '',
        discountPrice: '',
        duration: '',
        lessonsCount: '',
        level: 'Beginner',
        instructorName: '',
        instructorTitle: '',
        thumbnail: '',
        description: ''
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-dark)' }}>
      {/* Admin Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} type="admin" />

      {/* Main Admin panel area */}
      <main style={{
        flexGrow: 1,
        padding: '2rem 1.5rem',
        marginLeft: 0,
        '@media (min-width: 992px)': {
          paddingLeft: '280px'
        }
      }} className="admin-content">
        <div className="container" style={{ padding: 0 }}>
          {/* Header Panel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={26} style={{ color: 'var(--primary)' }} />
                <span>Admin Hub Portal</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Manage academic syllabi, create courses, and track performance.
              </p>
            </div>

            {/* Mobile Hamburger toggle */}
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

          {/* Metric stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <DashboardCard
              title="Platform Registrations"
              value="1,428 users"
              iconName="Users"
              trend="+14% growth"
              glowColor="rgba(124, 58, 237, 0.12)"
            />
            <DashboardCard
              title="Catalog Size"
              value={`${courses.length} courses`}
              iconName="Database"
              trend="+1 added"
              glowColor="rgba(37, 99, 235, 0.12)"
            />
            <DashboardCard
              title="Gross Mock Revenue"
              value="₹4,12,050"
              iconName="Landmark"
              trend="+22% increase"
              glowColor="rgba(16, 185, 129, 0.12)"
            />
          </div>

          {/* Admin double column grid: Form Left, Table Right */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            lgColumns: '1.2fr 2fr',
            gap: '2.5rem',
            alignItems: 'start'
          }} className="admin-grid">
            
            {/* Left: Add Course Form */}
            <div className="glass-panel" style={{ padding: '2rem 1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={20} style={{ color: 'var(--primary)' }} />
                <span>Create New Program</span>
              </h2>

              <form onSubmit={handleCreate}>
                <div className="form-group">
                  <label className="form-label">Course Title*</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Docker & Kubernetes Masterclass"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-control"
                      style={{ background: '#0d0f22' }}
                    >
                      {categories.filter(c => c !== 'All').map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="form-control"
                      style={{ background: '#0d0f22' }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Beginner to Advanced">Beginner to Advanced</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Base Price (INR)*</label>
                    <input
                      type="number"
                      name="price"
                      required
                      placeholder="e.g. 2999"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Discount Price (INR)</label>
                    <input
                      type="number"
                      name="discountPrice"
                      placeholder="e.g. 499"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Duration (Hours)</label>
                    <input
                      type="text"
                      name="duration"
                      placeholder="e.g. 35 hours"
                      value={formData.duration}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lessons Count</label>
                    <input
                      type="number"
                      name="lessonsCount"
                      placeholder="e.g. 25"
                      value={formData.lessonsCount}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Instructor Name</label>
                    <input
                      type="text"
                      name="instructorName"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.instructorName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Instructor Title</label>
                    <input
                      type="text"
                      name="instructorTitle"
                      placeholder="e.g. Lead Architect"
                      value={formData.instructorTitle}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail Image URL</label>
                  <input
                    type="url"
                    name="thumbnail"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Short Description*</label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    placeholder="Enter short promo description..."
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', borderRadius: '10px' }}
                >
                  <Plus size={16} />
                  <span>Create Course</span>
                </button>
              </form>
            </div>

            {/* Right: Existing Courses List Table */}
            <div className="glass-panel" style={{ padding: '2rem 1.5rem', overflow: 'hidden' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} style={{ color: 'var(--primary)' }} />
                <span>Existing Program Syllabus ({courses.length})</span>
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Course</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Price</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                        {/* Course metadata */}
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            style={{ width: '50px', height: '30px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <div>
                            <span style={{ fontWeight: '700', color: 'var(--text-main)', display: 'block', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {course.title}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>{course.duration} &bull; {course.lessonsCount} lessons</span>
                          </div>
                        </td>
                        {/* Category */}
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{course.category}</td>
                        {/* Price */}
                        <td style={{ padding: '1rem', fontWeight: '600' }}>
                          ₹{course.discountPrice || course.price}
                        </td>
                        {/* Actions */}
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
                                deleteCourse(course.id);
                              }
                            }}
                            className="btn-danger"
                            style={{
                              padding: '0.4rem',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                              color: '#f87171'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Embedded CSS grid alignment overrides */}
      <style>{`
        @media (min-width: 992px) {
          .admin-content {
            padding-left: 280px !important;
          }
          .admin-grid {
            grid-template-columns: 1.1fr 1.9fr !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-sidebar-trigger {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
