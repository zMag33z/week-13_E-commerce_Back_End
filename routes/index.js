// Required from server.
// Create paths with router.
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send('Route not found!')
});

module.exports = router;