const { Router } = require('express');
const CategoryController = require('../app/controllers/CategoryController');

const categoriesRoutes = Router();

categoriesRoutes.get('/', CategoryController.index);
categoriesRoutes.get('/:id', CategoryController.show);
categoriesRoutes.delete('/:id', CategoryController.delete);
categoriesRoutes.post('/', CategoryController.store);
categoriesRoutes.put('/:id', CategoryController.update);

module.exports = categoriesRoutes;
