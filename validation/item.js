const Joi = require('joi');

exports.validateItem = (item)=> {
     const schema = Joi.object({
          name: Joi.string().min(3).max(25).required(),
          price: Joi.number().required(),
     });
     return schema.validate(item);
}