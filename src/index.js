require('dotenv/config');
const express = require('express');
require('express-async-errors');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => console.log(`Running on port ${process.env.PORT || 3001}`));
