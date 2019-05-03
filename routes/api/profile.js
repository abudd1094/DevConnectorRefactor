const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Load Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Test users route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']) // populate adds the fields name and avatar from the user model to our current query

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile) // if there is a profile, return the profile in JSON form
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;