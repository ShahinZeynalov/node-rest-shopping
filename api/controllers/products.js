const Product = require('../models/pruduct')


exports.getProducts = (req, res, next) => {
    Product.find()
    .select('name price productImage')
    .exec()
    .then((products) => {
        response = {
            count: products.length,
            data: products
        }
        res.status(200).send(response)
    })
}

exports.addProduct = ((req, res, next) => {
    console.log('--------', req.file);
    Product.create({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    .then((product) => {
        res.json(product) 
    }).catch(next)
})

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(function(product) {
        res.status(200).send(product)

    }).catch(function() {
        res.status(404).json({message: "not found"})
    })
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.productId
    Product.update({_id:id}, req.body)
    .exec()
    .then(() => {
        Product.findOne({_id: id})
        .exec()
        .then((product) => {
            res.send(product)
        }).catch(next)
    }).catch(next)
}

exports.deleteProduct = (req, res, next) => {
    id = req.params.productId
    Product.remove({_id: id })
    .exec()
    .then(function(result) {
        res.status(200).send(result)
    })
    .catch(next)
}