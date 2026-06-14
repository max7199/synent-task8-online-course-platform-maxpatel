const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private (Student only)
const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    // 1. Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 2. Check if student is already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // 3. Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
      status: 'active',
      progress: 0,
    });

    // Populate course details on response
    const populatedEnrollment = await enrollment.populate({
      path: 'course',
      select: 'title description instructor category price',
      populate: {
        path: 'instructor',
        select: 'name email',
      },
    });

    return res.status(201).json(populatedEnrollment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during course enrollment', error: error.message });
  }
};

// @desc    Get logged-in student's enrollments
// @route   GET /api/enrollments/me
// @access  Private (Student only)
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: 'course',
        select: 'title description instructor category price content',
        populate: {
          path: 'instructor',
          select: 'name email',
        },
      });

    return res.json(enrollments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error retrieving your enrollments', error: error.message });
  }
};

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  const { progress } = req.body;

  if (progress === undefined || progress < 0 || progress > 100) {
    return res.status(400).json({ message: 'Please provide progress percentage between 0 and 100' });
  }

  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment record not found' });
    }

    // Ensure the student updating progress owns the enrollment record
    if (enrollment.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this enrollment' });
    }

    enrollment.progress = progress;
    
    // Automatically set status to completed if progress is 100
    if (progress === 100) {
      enrollment.status = 'completed';
    } else {
      enrollment.status = 'active';
    }

    const updatedEnrollment = await enrollment.save();
    return res.json(updatedEnrollment);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Enrollment record not found' });
    }
    return res.status(500).json({ message: 'Server error updating enrollment progress', error: error.message });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
};
