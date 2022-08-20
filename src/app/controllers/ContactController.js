const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    response.status(200).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      response.status(400).json({ message: 'Contact not found.' });
    }

    response.status(200).json(contact);
  }

  // Create a register
  store() {

  }

  // Update a register
  update() {

  }

  // Remove a register
  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      response.status(400).json({ message: 'Contact not found.' });
    }

    response.status(200).json(contact);
  }
}

module.exports = new ContactController();
