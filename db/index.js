// db/index.js

//const mongoose = require('mongoose');
const { connect } = require("mongoose");

const DB_URI = process.env.MONGO_URI;

const connectDB = async () => {
  console.log("Aguarde conexão com banco de dados...");
  try {
    // caso não exista link no arquivo .env, geramos um erro.
    if (!DB_URI) {
      throw new Error("Sem endereço de banco de dados.");
    }

    const x = await connect(DB_URI);
    const dbName = x.connections[0].name;
    console.log(`Conectado ao banco: ${dbName}`);
  } catch (error) {
    console.log("Falha ao conectar banco de dados:", error);
    // process.exit() funciona como um CTRL+C no terminal, encerrando o processo.
    process.exit();
  }
};

connectDB();
