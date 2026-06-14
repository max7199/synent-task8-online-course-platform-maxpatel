const express = require('express');
const {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All enrollment routes require authentication
router.use(protect);

// Student-only enrollment routes
router.post('/', authorize('student'), enrollCourse);
router.get('/me', authorize('student'), getMyEnrollments);
router.put('/:id/progress', authorize('student'), updateProgress);

module.exports = router;
