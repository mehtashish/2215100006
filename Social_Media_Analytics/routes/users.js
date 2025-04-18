const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../controllers/usersControllers');

router.get('/', getTopUsers);

module.exports = router;