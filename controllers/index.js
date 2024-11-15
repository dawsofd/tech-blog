// Import just the router express
const router = require('express').Router();
// Import the index.js from 'api' folder
const apiRoutes = require('./api');
// Import the home and dashboard routes from the 'api' folder
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// When a request is made to the /api route, it will be directed to the index.js in the 'api' folder.
router.use('/api', apiRoutes);
// When a request is made to the / route, it will be directed to homeRoutes.js 
router.use('/', homeRoutes);
//When a request is made to the /dashboard route, it will be directed to dashboardRoutes.js
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
