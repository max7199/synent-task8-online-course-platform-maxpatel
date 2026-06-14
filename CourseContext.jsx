import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch courses from backend on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/courses');
        const data = response.data;
        // Support both { courses: [...] } and plain array responses
        setCourses(Array.isArray(data) ? data : data.courses ?? []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError(
          err.response?.data?.message ||
          'Unable to load courses. Please check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const addCourse = (courseData) => {
    if (!courseData.title || !courseData.description || !courseData.price) {
      toast.error('Please fill in required fields (Title, Description, Price)', { className: 'custom-toast' });
      return false;
    }

    const id = courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check if course already exists
    if (courses.some(c => c.id === id)) {
      toast.error('A course with this title already exists', { className: 'custom-toast' });
      return false;
    }

    const newCourse = {
      id,
      title: courseData.title,
      category: courseData.category || 'Web Development',
      rating: 5.0,
      reviewsCount: 1,
      duration: courseData.duration || '10 hours',
      lessonsCount: parseInt(courseData.lessonsCount) || 5,
      level: courseData.level || 'Beginner',
      instructor: {
        name: courseData.instructorName || 'Platform Instructor',
        title: courseData.instructorTitle || 'Expert Educator',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      },
      price: parseFloat(courseData.price),
      discountPrice: parseFloat(courseData.discountPrice) || null,
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
      description: courseData.description,
      longDescription: courseData.longDescription || courseData.description,
      curriculum: [
        {
          sectionTitle: 'Module 1: Getting Started',
          lectures: [
            { title: 'Introduction & Setup', duration: '05:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
            { title: 'First Steps & Core Concepts', duration: '12:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
          ]
        },
        {
          sectionTitle: 'Module 2: Advanced Topics',
          lectures: [
            { title: 'Deep Dive Analysis', duration: '18:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            { title: 'Final Project & Wrap-up', duration: '22:40', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
          ]
        }
      ]
    };

    setCourses(prev => [newCourse, ...prev]);
    toast.success('Course created successfully!', { className: 'custom-toast' });
    return true;
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast.success('Course deleted successfully', { className: 'custom-toast' });
  };

  // Derive categories dynamically from fetched courses
  const dynamicCategories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <CourseContext.Provider value={{
      courses,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      filteredCourses,
      dynamicCategories,
      addCourse,
      deleteCourse
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
