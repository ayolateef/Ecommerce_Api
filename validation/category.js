const Joi = require('joi');

exports.validateCategory = (category)=> {
     const schema = Joi.object({
          name: Joi.string().min(3).max(25).required(),
          description: Joi.string().required(),
     });
     return schema.validate(category);
}