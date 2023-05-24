const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  // aqui vão as propriedades
  description: {
    type: String,
    required: true
  },
  done:{
    type: Boolean,
    required: true,
    default: false
  },
  userId:{
   type: Schema.Types.ObjectId, 
   ref: 'User' 
  } 
  
  
},{ timestamps: true });

module.exports = model('Todo', todoSchema);