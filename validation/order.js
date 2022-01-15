const Joi = require ('joi');

exports.validateOrder = (order) => {
     const schema = Joi.object({
       name_of_item: Joi.string().min(3).max(25).required(),
       unit_price: Joi.number().required(),
       quantity: Joi.number().required(),
     });
     return schema.validate(order);
   }