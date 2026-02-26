const express = require('express');
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getManagers
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/managers', getManagers);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
