// Import express
const express = require('express')

// Import users controller
const usersController = require('../controllers/User-Controller')

// Create express router
const router = express.Router()

// Endpoint for fetching all users from database
//router.get('/all', usersController.getUserData)

// Endpoint for checking user credentials
router.put("/verify", usersController.verifyUserData)

// Endpoint for adding user to database
router.put('/add', usersController.addUserData);

// Export router
module.exports = router