const express = require('express');
const router = express.Router();
const { getLatestPosts } = require('../controllers/postsControllers');


router.get('/', getLatestPosts);

module.exports = router;