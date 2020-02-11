const express = require('express');

const itemsRouter = require('./routes/items');

const api = express();

api.use('/items', itemsRouter);

module.exports = api;
