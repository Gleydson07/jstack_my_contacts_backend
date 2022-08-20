const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy) {
    const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(`
      SELECT ctc.id, ctc.name, ctc.email, ctc.phone, ctc.category_id, cat.name AS category_name
      FROM contacts AS ctc
        LEFT JOIN categories AS cat ON ctc.category_id = cat.id
      ORDER BY ctc.name ${direction}
    `);
  }

  async findById(id) {
    return db.query(`
      SELECT ctc.id, ctc.name, ctc.email, ctc.phone, ctc.category_id, cat.name AS category_name
      FROM contacts AS ctc
        LEFT JOIN categories AS cat ON ctc.category_id = cat.id
      WHERE ctc.id = $1
    `, [id]);
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT id, name, email, phone, category_id
      FROM contacts
      WHERE email = $1
    `, [email]);

    return row;
  }

  async delete(id) {
    db.query('DELETE FROM contacts WHERE id = $1', [id]);
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts SET
        name = $1,
        email = $2,
        phone = $3,
        category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }
}

module.exports = new ContactsRepository();
