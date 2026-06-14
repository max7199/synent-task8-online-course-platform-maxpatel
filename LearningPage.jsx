import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, PlayCircle, CheckCircle, Circle, Save, Send, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import Loader from '../components/Loader';

const LearningPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrolledCourses, courseProgress, toggleLectureCompletion, loadingEnrollments } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab control state
  const [activeTab, setActiveTab] = useState('overview');
  // Local notes state
  const [notes, setNotes] = useState('');
  // Local Q&A state
  const [qaList, setQaList] = useState([
    { user: 'Sarah Connor', question: 'Why does React Fiber run asynchronously compared to the stack reconciler?', answers: 1 },
    { user: 'Bruce Wayne', question: 'How can we secure JWT cookies against CSRF hacks?', answers: 2 }
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Fetch course details
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

  // Default selected lecture (first lecture in first module)
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (course && course.content?.length > 0) {
      setCurrentLecture(course.content[0]);
    }
  }, [course]);

  // Sync notes from localStorage when lecture changes
  useEffect(() => {
    if (currentLecture && course) {
      const savedNotes = localStorage.getItem(`notes_${course._id}_${currentLecture.title.replace(/\s+/g, '')}`);
      setNotes(savedNotes || '');
    }
  }, [currentLecture, course]);

  if (loading || loadingEnrollments) return <Loader />;

  if (!course) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Course Not Found</h2>
        <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  // Double check enrollment protection
  const enrollment = enrolledCourses.find(e => (e.course?._id || e.course) === course._id);
  if (!enrollment) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '1rem' }}>
        <AlertCircle size={48} style={{ color: 'var(--danger)' }} />
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
          You must enroll in <strong>{course.title}</strong> before accessing its video lectures.
        </p>
        <Link to={`/courses/${course._id}`} className="btn-primary">View Course Details</Link>
      </div>
    );
  }

  const prog = courseProgress[course._id] || { completedLectures: [], progressPercent: 0 };

  const handleSaveNotes = () => {
    if (currentLecture) {
      localStorage.setItem(`notes_${course._id}_${currentLecture.title.replace(/\s+/g, '')}`, notes);
      toast.success('Notes saved successfully!', { className: 'custom-toast' });
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQaList(prev => [
      { user: 'You', question: newQuestion, answers: 0 },
      ...prev
    ]);
    setNewQuestion('');
    toast.success('Question posted to active Q&A forum!', { className: 'custom-toast' });
  };

  return (
    <div style={{ background: '#04050a', minHeight: 'calc(100vh - 80px)' }}>
      {/* Learning Page Subheader */}
      <div style={{
        background: '#0d0f22',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ChevronLeft size={16} />
          <span>Dashboard</span>
        </Link>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', wordBreak: 'break-all' }} className="gradient-text">{course.title}</h2>
        <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700' }}>
          Progress: {prog.progressPercent}%
        </div>
      </div>

      {/* Primary grid: Player Left, Lectures Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        lgColumns: '3fr 1.2fr',
        minHeight: 'calc(100vh - 126px)'
      }} className="learning-grid">
        
        {/* Left Side: Video Canvas & Information Tabs */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* HTML5 Video tag player */}
          <div className="glass-panel" style={{ overflow: 'hidden', padding: 0, background: '#000', border: '1px solid rgba(255,255,255,0.04)' }}>
            {currentLecture ? (
              <video
                key={currentLecture.videoUrl}
                src={currentLecture.videoUrl}
                controls
                autoPlay
                style={{ width: '100%', aspectRatio: '16/9', display: 'block' }}
              />
            ) : (
              <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Select a lecture to play
              </div>
            )}
          </div>

          {/* Current lecture playing name */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{currentLecture?.title}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Full Resolution Video</p>
            </div>
            {currentLecture && (
              <button
                onClick={() => toggleLectureCompletion(course._id, currentLecture.title, course.content?.length || 0)}
                className="btn-secondary"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  background: prog.completedLectures.includes(currentLecture.title) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  borderColor: prog.completedLectures.includes(currentLecture.title) ? 'var(--accent)' : 'var(--border-color)',
                  color: prog.completedLectures.includes(currentLecture.title) ? '#34d399' : 'var(--text-main)'
                }}
              >
                {prog.completedLectures.includes(currentLecture.title) ? 'Mark Incomplete' : 'Mark as Complete'}
              </button>
            )}
          </div>

          {/* Tabbed interface layout below video */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '1.5rem'
            }}>
              {['overview', 'notes', 'qa'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                    color: activeTab === tab ? 'white' : 'var(--text-muted)',
                    padding: '0.5rem 0',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'var(--transition)'
                  }}
                >
                  {tab === 'qa' ? 'Q&A Forum' : tab}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>About this Lecture</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Welcome to this module item. We cover standard industry setups, developer tools configurations, and clean code paradigms.
                    Review the lectures list on the right to complete all modules in this course and earn your certificate.
                  </p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={course.instructor.avatar} alt={course.instructor.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Taught by {course.instructor.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.instructor.title}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Scratchpad Notes</h3>
                  <textarea
                    rows={6}
                    placeholder="Take notes for this lecture here. Your progress and notes will be saved locally..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="btn-primary"
                    style={{ width: 'max-content', padding: '0.6rem 1.25rem', borderRadius: '8px' }}
                  >
                    <Save size={14} />
                    <span>Save Notes</span>
                  </button>
                </div>
              )}

              {activeTab === 'qa' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Post Question Form */}
                  <form onSubmit={handleAddQuestion} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Ask a technical question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      required
                      className="form-control"
                      style={{ borderRadius: '8px' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '8px' }}>
                      <Send size={14} />
                    </button>
                  </form>

                  {/* Question listing */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {qaList.map((item, idx) => (
                      <div key={idx} style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px'
                      }}>
                        <div style={{ display: 'flex', justify: 'space-between', fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                          <span>Asked by {item.user}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MessageSquare size={12} /> {item.answers} replies
                          </span>
                        </div>
                        <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{item.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Curriculum Lecture Playlist */}
        <div style={{
          borderLeft: '1px solid var(--border-color)',
          background: '#0d0f22',
          overflowY: 'auto',
          padding: '1.5rem'
        }} className="learning-sidebar">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={16} style={{ color: 'var(--primary)' }} />
            <span>Course Content</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {course.content?.map((lec, lIdx) => {
              const isCompleted = prog.completedLectures.includes(lec.title);
              const isPlaying = currentLecture?.title === lec.title;

              return (
                <div
                  key={lIdx}
                  onClick={() => setCurrentLecture(lec)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isPlaying ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: isPlaying ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.04)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isPlaying) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isPlaying) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '85%' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLectureCompletion(course._id, lec.title, course.content?.length || 0);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      {isCompleted ? (
                        <CheckCircle size={16} style={{ color: 'var(--accent)' }} />
                      ) : (
                        <Circle size={16} style={{ color: 'var(--text-dark)' }} />
                      )}
                    </button>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: isPlaying ? '700' : '500',
                      color: isPlaying ? 'white' : 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {lec.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Grid Responsiveness styles */}
      <style>{`
        @media (min-width: 992px) {
          .learning-grid {
            grid-template-columns: 3fr 1.25fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LearningPage;
