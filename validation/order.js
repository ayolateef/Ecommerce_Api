const Joi = require ('joi');

exports.validateOrder = (order) => {
     const schema = Joi.object({
       userId: Joi.string().required(),
       itemsId: Joi.array()
       .items(Joi.string())
       .required()
     })
     return schema.validate(order);
   }