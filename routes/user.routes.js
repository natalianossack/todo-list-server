const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const User = require("../models/User.model");

// middlewares
//const { isAdmin } = require('../middlewares/role.middleware');

// rotas de autenticação
//router.get("/", (req, res, next) => {
//  res.json("Tudo certo aqui!"); // rota de teste
//});

// Crud -> Create - funcionando
router.post("/", async (req, res) => {
  const { username, password, todos } = req.body;
  try {
    if (!username) {
      const error = new Error("Username é obrigatório");
      error.code = 400;
      throw new Error();
    }
    const newUserFromDB = await User.create({ username, password, todos });
    res.status(200).json(newUserFromDB);
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

// Crud -> Read - nao funciona 
router.get("/", async (req, res, next) => {
  try {
    const usersFromDB = await User.find();
    res.status(200).json({ data: usersFromDB });
  } catch (error) {
    res.status(500).json({description: 'Erro ao listar usuários', error});
    next(error);
  }
});

// Crud -> Read one user - funcionando
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userFromDB = await User.findById(userId);
    res.status(200).json({ data: userFromDB });
  } catch (error) {
    next(error);
  }
});

//crUd -> Update - funcionando
router.put("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userFromDB = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({ data: userFromDB });
  } catch (error) {
    next(error);
  }
});

//cruD -> delete  - funcionando
router.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndRemove(userId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
