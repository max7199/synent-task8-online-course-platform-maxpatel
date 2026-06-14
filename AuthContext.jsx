import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('course_platform_user');
    const token = localStorage.getItem('course_platform_token');
    return (savedUser && token) ? JSON.parse(savedUser) : null;
  });

  // Track enrolled courses (Array of enrollment objects from backend)
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  // Fetch enrollments from backend if user is logged in
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) {
        setEnrolledCourses([]);
        return;
      }
      try {
        setLoadingEnrollments(true);
        const response = await api.get('/enrollments/me');
        setEnrolledCourses(response.data);
      } catch (err) {
        console.error('Failed to fetch enrollments:', err);
        // If unauthorized, the token is likely invalid or expired
        if (err.response?.status === 401) {
          setUser(null);
          localStorage.removeItem('course_platform_user');
          localStorage.removeItem('course_platform_token');
        }
      } finally {
        setLoadingEnrollments(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  // Track progress: { courseId: { completedLectures: [lectureTitles], progressPercent: number } }
  const [courseProgress, setCourseProgress] = useState(() => {
    const savedProgress = localStorage.getItem('course_platform_progress');
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('course_platform_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('course_platform_user');
      localStorage.removeItem('course_platform_token');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('course_platform_progress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        toast.error('Please fill in all fields', { className: 'custom-toast' });
        return false;
      }

      const response = await api.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;

      setUser({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      localStorage.setItem('course_platform_token', token);
      toast.success(`Welcome back, ${userData.name}!`, { className: 'custom-toast' });
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { className: 'custom-toast' });
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      if (!name || !email || !password) {
        toast.error('Please fill in all fields', { className: 'custom-toast' });
        return false;
      }

      const response = await api.post('/auth/register', { name, email, password });
      const { token, ...userData } = response.data;

      setUser({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      localStorage.setItem('course_platform_token', token);
      toast.success(`Account registered successfully!`, { className: 'custom-toast' });
      return true;
    } catch (err) {
      // Show detailed error message if available
      const backendMessage = err.response?.data?.message || err.response?.data?.error;
      toast.error(backendMessage || 'Registration failed', { className: 'custom-toast' });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('course_platform_token');
    toast.success('Logged out successfully.', { className: 'custom-toast' });
  };

  const enrollInCourse = async (courseId) => {
    if (!user) {
      toast.error('Please log in to enroll in this course.', { className: 'custom-toast' });
      return false;
    }

    try {
      const response = await api.post('/enrollments', { courseId });
      setEnrolledCourses(prev => [...prev, response.data]);
      
      toast.success('Enrolled successfully! Redirecting to Dashboard...', { className: 'custom-toast' });
      return true;
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        localStorage.removeItem('course_platform_user');
        localStorage.removeItem('course_platform_token');
        toast.error('Session expired. Please login again.');
        return false;
      }
      const message = err.response?.data?.message || 'Enrollment failed';
      toast.error(message, { className: 'custom-toast' });
      return message.includes('already enrolled');
    }
  };

  const toggleLectureCompletion = async (courseId, lectureTitle, totalLecturesCount) => {
    // 1. Find the enrollment record for this course
    const enrollment = enrolledCourses.find(e => {
      const eCourseId = e.course?._id || e.course;
      return eCourseId === courseId;
    });

    if (!enrollment) {
      console.warn("Cannot toggle lecture: No enrollment found for course", courseId);
      return;
    }

    const current = courseProgress[courseId] || { completedLectures: [], progressPercent: 0 };
    const completed = current.completedLectures;
    let newCompleted;

    if (completed.includes(lectureTitle)) {
      newCompleted = completed.filter(t => t !== lectureTitle);
    } else {
      newCompleted = [...completed, lectureTitle];
    }

    const progressPercent = totalLecturesCount > 0 ? Math.round((newCompleted.length / totalLecturesCount) * 100) : 0;

    // Update Local CourseProgress state (for lecture list UI)
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        completedLectures: newCompleted,
        progressPercent
      }
    }));

    // Update EnrolledCourses state (for Dashboard averages)
    setEnrolledCourses(prev =>
      prev.map(e => e._id === enrollment._id ? { ...e, progress: progressPercent } : e)
    );

    // Persist to Backend
    try {
      await api.put(`/enrollments/${enrollment._id}/progress`, { progress: progressPercent });
      if (newCompleted.length > completed.length) {
        toast.success(`Lecture completed! Progress: ${progressPercent}%`, { id: 'lecture-toast', className: 'custom-toast' });
      }
    } catch (err) {
      console.error('Failed to update progress on server:', err);
      // Optional: rollback local state if sync fails
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      enrolledCourses,
      loadingEnrollments,
      courseProgress,
      login,
      register,
      logout,
      enrollInCourse,
      toggleLectureCompletion
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
