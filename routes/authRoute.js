// Import necessary modules
const router = require('express').Router();
const { signup, login } = require('./../controllers/authController');

// Route to register a new user
router.post('/register', signup);

// Route to authenticate and log in a user
router.post('/login', login);

// Export the router to be used in other parts of the application
module.exports = router;