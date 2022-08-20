const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Gleydson',
    email: 'gsantos@gmail.com',
    phone: '82981114246',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => { resolve(contacts); });
  }

  findById(id) {
    const contact = contacts.find((item) => item.id === id);
    return new Promise((resolve) => { resolve(contact); });
  }

  findByEmail(email) {
    const contact = contacts.find((item) => item.email === email);
    return new Promise((resolve) => { resolve(contact); });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((item) => item.id !== id);
      resolve();
    });
  }

  save({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const contact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(contact);
      resolve(contact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        name, email, phone, category_id,
      };

      contacts = contacts.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            ...updatedContact,
          };
        }

        return contact;
      });
      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
