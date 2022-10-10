const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.status(200).json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid user id.' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'Contact not found.' });
    }

    response.status(200).json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if(!isValidUUID(category_id)){
      return response.status(400).json({ message: 'Invalid category id.' });
    }

    if (!name) {
      return response.status(400).json({ message: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ message: 'E-mail is required' });
    }

    const contactAlreadyExists = await ContactsRepository.findByEmail(email);

    if (contactAlreadyExists) {
      return response.status(400).json({ message: 'Contact already exists.' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, phone, category_id,
    } = request.body;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid user id.' });
    }

    if(!isValidUUID(category_id)){
      return response.status(400).json({ message: 'Invalid category id.' });
    }

    const contactAlreadyExists = await ContactsRepository.findById(id);

    if (!contactAlreadyExists) {
      return response.status(404).json({ message: 'Contact not found.' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ message: 'E-mail is already in use.' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid user id.' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ message: 'Contact not found.' });
    }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
