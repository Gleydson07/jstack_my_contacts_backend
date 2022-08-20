const { Router } = require('express');
const ContactController = require('../app/controllers/ContactController');

const contactsRoutes = Router();

contactsRoutes.get('/', ContactController.index);
contactsRoutes.get('/:id', ContactController.show);
contactsRoutes.delete('/:id', ContactController.delete);

module.exports = contactsRoutes;
