const { Router } = require('express');
const contactsRoutes = require('./contacts.routes');

const router = Router();

router.use('/contacts', contactsRoutes);

module.exports = router;
