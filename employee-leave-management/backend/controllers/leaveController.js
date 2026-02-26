const Leave = require('../models/Leave');
const User = require('../models/User');

exports.createLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ success: false, message: 'End date must be after start date' });
    }

    const leave = await Leave.create({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    const populatedLeave = await Leave.findById(leave._id).populate('employeeId', 'name email department');

    res.status(201).json({
      success: true,
      leave: populatedLeave
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id })
      .populate('reviewedBy', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'manager') {
      const employees = await User.find({ managerId: req.user.id });
      const employeeIds = employees.map(emp => emp._id);
      query = { employeeId: { $in: employeeIds } };
    }

    const leaves = await Leave.find(query)
      .populate('employeeId', 'name email department')
      .populate('reviewedBy', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, reviewComment } = req.body;
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }

    if (req.user.role === 'manager') {
      const employee = await User.findById(leave.employeeId);
      if (employee.managerId.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
      }
    }

    leave.status = status;
    leave.reviewedBy = req.user.id;
    leave.reviewedAt = Date.now();
    leave.reviewComment = reviewComment || '';

    await leave.save();

    const updatedLeave = await Leave.findById(leave._id)
      .populate('employeeId', 'name email department')
      .populate('reviewedBy', 'name');

    res.status(200).json({
      success: true,
      leave: updatedLeave
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }

    if (leave.employeeId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await leave.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Leave deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
