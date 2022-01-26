const express = require('express');
const router = express.Router()

 const {  getCategorys,getCategory,createCategory,updateCategory} = require('../controllers/category')

 router.route('/').get(getCategorys).post(createCategory);

 router.route('/:id').get(getCategory).put(updateCategory);

module.exports = router;