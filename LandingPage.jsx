import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Award, Users, Play, Star, Code, ShieldCheck } from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';

const LandingPage = () => {
  const { courses } = useCourses();
  
  // Show first 3 courses as featured
  const featuredCourses = courses.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background glow effects */}
      <div className="radial-glow" style={{ top: '-10%', left: '10%' }} />
      <div className="radial-glow" style={{ top: '40%', right: '10%' }} />

      {/* Hero Section */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              gap: '1.5rem',
              maxWidth: '850px',
              margin: '0 auto' 
            }}
          >
            <motion.div 
              variants={itemVariants}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                background: 'rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#c084fc'
              }}
            >
              <Award size={14} />
              <span>Flat 85% off on all student certifications this week!</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                fontWeight: '800', 
                lineHeight: '1.1',
                letterSpacing: '-1.5px' 
              }}
            >
              Master In-Demand <br />
              <span className="gradient-text glow-text">Skills from Anywhere</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
                color: 'var(--text-muted)', 
                maxWidth: '650px',
                lineHeight: '1.6'
              }}
            >
              Learn modern web technologies, machine learning, and cybersecurity from industry experts. Get certified and launch your tech career.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                marginTop: '1rem'
              }}
            >
              <Link to="/courses" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: '12px' }}>
                <span>Browse Courses</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: '12px' }}>
                <span>Try Free Demo</span>
                <Play size={16} style={{ color: 'var(--primary)' }} />
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'flex', 
                gap: '3rem', 
                justifyContent: 'center', 
                marginTop: '3.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '2rem',
                width: '100%'
              }}
            >
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>10k+</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Global Students</p>
              </div>
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>98%</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Satisfaction Rate</p>
              </div>
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>50+</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Expert Courses</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255, 0.01)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Our Programs</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Explore Our <span className="gradient-text">Featured Curriculums</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 0 auto' }}>
              Handpicked training models built for job placement and technical mastery.
            </p>
          </div>

          <div className="grid-3">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/courses" className="btn-secondary" style={{ borderRadius: '10px' }}>
              <span>View All Available Courses</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Platform Perks */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            
            {/* Perk 1 */}
            <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Code size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Practical Developer Exercises</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Skip the generic slideshow lectures. Code along in real-time exercises, building working files you can publish.
              </p>
            </div>

            {/* Perk 2 */}
            <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Mentorship & Peer Forums</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Connect with thousands of senior developers, review design patterns, and solve debugging issues together.
              </p>
            </div>

            {/* Perk 3 */}
            <div className="glass-panel" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Verifiable Credentials</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Earn cryptographically secured certificates of completion that you can embed in LinkedIn profiles and resumes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Grid */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div className="container">
          <div 
            className="glass-panel" 
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(0,0,0,0) 80%)',
              zIndex: -1
            }} />

            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
              Start Shaping Your Future Today
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Join over 10,000 students taking the leap towards technical proficiency. Immediate access, no credit cards required for free modules.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem', borderRadius: '12px' }}>
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
