const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy) {
    const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return db.query(`
      SELECT id, name
      FROM categories ORDER BY name ${direction}
    `);
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT id, name
      FROM categories
      WHERE id = $1
    `, [id]);

    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`
      SELECT id, name
      FROM categories
      WHERE name = $1
    `, [name]);

    return row;
  }

  async create({ name }) {
    return db.query(`
      INSERT INTO categories(name)
      VALUES ($1)
      RETURNING *
    `, [name]);
  }

  async update(id, { name }) {
    return db.query(`
      UPDATE categories SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);
  }

  async delete(id) {
    db.query(`DELETE FROM categories
     WHERE id = $1
    `, [id]);
  }
}

module.exports = new CategoriesRepository();
