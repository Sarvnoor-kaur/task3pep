const express = require('express');
const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.get('/all', protect, authorize('manager', 'admin'), getAllLeaves);
router.put('/:id', protect, authorize('manager', 'admin'), updateLeaveStatus);
router.delete('/:id', protect, deleteLeave);

module.exports = router;
