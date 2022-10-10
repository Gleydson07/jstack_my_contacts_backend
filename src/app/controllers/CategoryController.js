const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.status(200).json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid category id.' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ message: 'Category not found.' });
    }

    response.status(200).json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ message: 'Name is required' });
    }

    const nameAlreadyExists = await CategoriesRepository.findByName(name);

    if (nameAlreadyExists) {
      response.status(400).json({ message: 'Name already exists' });
    }

    const category = await CategoriesRepository.create({ name });
    response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid category id.' });
    }

    const { name } = request.body;
    const categoryAlreadyExists = await CategoriesRepository.findById(id);

    if (!categoryAlreadyExists) {
      return response.status(404).json({ message: 'Category not found.' });
    }

    const categoryByName = await CategoriesRepository.findByName(name);

    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ message: 'Name is already in use.' });
    }

    const contact = await CategoriesRepository.update(id, {
      name,
    });

    response.status(201).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if(!isValidUUID(id)){
      return response.status(400).json({ message: 'Invalid category id.' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ message: 'Category not found.' });
    }

    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
