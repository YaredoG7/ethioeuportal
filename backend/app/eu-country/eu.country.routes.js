const express = require('express');
const router = express.Router();

require('./eu.country')(router);

module.exports = router;