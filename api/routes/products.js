const express = require('express')
const router = express.Router();

const requireLogin = require('../middleware/requireLogin')
const productController = require('../controllers/products')
const upload = require('../middleware/uploadImage')

router.get('/', productController.getProducts )
router.get('/:productId', productController.getProduct )
router.post('/', upload.single('productImage'), productController.addProduct )
router.put('/:productId', productController.updateProduct )
router.delete('/:productId', productController.deleteProduct )

module.exports = router