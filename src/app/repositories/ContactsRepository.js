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

  delete(id) {
    contacts = contacts.filter((item) => item.id !== id);
    return new Promise((resolve) => { resolve(contacts); });
  }
}

module.exports = new ContactsRepository();
