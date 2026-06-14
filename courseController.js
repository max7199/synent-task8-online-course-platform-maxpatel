const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by search query in title if provided
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(query).populate('instructor', 'name email');
    return res.json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error fetching courses', error: error.message });
  }
};

// @desc    Get single course details
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.json(course);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(500).json({ message: 'Server error fetching course details', error: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Instructor only)
const createCourse = async (req, res) => {
  const { title, description, category, price, content } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
      category,
      price: price || 0,
      content: content || [],
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid course data', error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Instructor only & Owner only)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the authenticated user is the instructor who created the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User is not authorized to edit this course' });
    }

    const { title, description, category, price, content } = req.body;

    // Update course details
    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price !== undefined ? price : course.price;
    course.content = content || course.content;

    const updatedCourse = await course.save();
    return res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(500).json({ message: 'Server error updating course', error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor only & Owner only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the authenticated user is the instructor who created the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User is not authorized to delete this course' });
    }

    await Course.deleteOne({ _id: req.params.id });
    return res.json({ message: 'Course removed successfully' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Course not found' });
    }
    return res.status(500).json({ message: 'Server error deleting course', error: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
