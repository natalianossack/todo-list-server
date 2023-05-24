const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Todo = require('../models/Todo.model');

// middlewares
//const { isAdmin } = require('../middlewares/role.middleware');

// rotas de autenticação - funcionando
//router.get('/', (req, res) => {
//  res.json('Tudo certo aqui!'); // rota de teste
//});

// Crud -> Create - funcionando
router.post('/', async (req, res, next) =>{
    const { description } = req.body;
    try{
        await Todo.create({description});
        res.status(201).json('Descriçao adicionada com sucesso')
        //if(!description) {
        //    res.status(400).json({msg: "Descriçao é obrigatória"});
        //    return;
    //};
       // const newTodoFromDB = await Todo.create({ description });
       // res.status(200).json(newTodoFromDB);
    } catch (error) {
        next(error);
    }
 });
// Crud -> Read - nao funciona 
router.get('/', async(req, res, next) =>{
    try{
        const todosFromDB = await Todo.find();
    res.status(200).json({data: todosFromDB});
} catch (error) {
    res.status(200).json({msg: error });
    next(error);
}
  })
// Crud -> Read one user - funcionando
  router.get('/:todoId', async (req, res, next) =>{
    const { todoId } = req.params;
    try{
        const todoFromDB = await Todo.findById(todoId);
        res.status(200).json({data: todoFromDB});
     } catch (error){
        next(error);
     }
  })
//crUd -> Update - funcionando
  router.put('/:todoId', async (req, res, next) =>{
    const { todoId } = req.params;
    try{
        const todoFromDB = await Todo.findByIdAndUpdate(todoId, req.body, {new:true});
        res.status(200).json({data: todoFromDB});
    } catch (error){
        next(error);
    }
  })
//cruD -> delete  - funcionando
  router.delete('/:todoId', async (req, res, next) =>{
    const { todoId } = req.params;
    try{
        await Todo.findByIdAndRemove(todoId);
        res.status(200).json({data:{}});
    } catch(error){
        next(error);
    }
  })


module.exports = router;