const { Router } = require('express');
const ContactController = require('../app/controllers/ContactController');

const contactsRoutes = Router();

contactsRoutes.get('/', ContactController.index);
contactsRoutes.get('/:id', ContactController.show);
contactsRoutes.delete('/:id', ContactController.delete);
contactsRoutes.post('/', ContactController.store);
contactsRoutes.put('/:id', ContactController.update);

module.exports = contactsRoutes;
