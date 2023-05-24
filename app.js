// app.js

// pacotes
require('dotenv/config'); // permite acesso ao arquivo .env
const express = require('express');
const app = express();

// banco de dados
require('./db');

// configurações
require('./configs')(app);

// rotas
const todoRoutes = require('./routes/todo.routes');
app.use(todoRoutes);
app.use('/auth', require('./routes/auth.routes'));

//app.use(isAuthenticated);
app.use('/todos', require ('./routes/todo.routes'));
app.use('/users', require ('./routes/user.routes'));

// erros
app.use((req, res, next) => {
  res.status(404).json('Não encontrado!');
});

require('./error-handling')(app); // importamos e executamos a função já executando ela.

// exportar app
module.exports = app;