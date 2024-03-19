// routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Get all activities
router.get('/', activityController.getAllActivities);

// Create a new activity
router.post('/create', activityController.createActivity);

// Get all activities of a user
router.get('/:id', activityController.getActivityById);

// Update an activity
router.put('/update/:id', activityController.updateActivity);

// Delete an activity
router.delete('/delete/:id', activityController.deleteActivity);

module.exports = router;
