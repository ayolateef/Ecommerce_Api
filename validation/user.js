const Joi = require('joi');

exports.validateUser = (user) =>  {
     const schema = Joi.object({
       first_name: Joi.string().min(3).max(25).required(),
       last_name: Joi.string().min(3).max(25).required(),
       email: Joi.string().min(3).required(),
       password: Joi.string().min(3).max(255).required(),
     });
     return schema.validate(user);
   }
