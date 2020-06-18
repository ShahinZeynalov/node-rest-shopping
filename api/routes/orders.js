const express = require('express')
const router = express.Router();
const requireLogin = require('../middleware/requireLogin')

const Product = require('../models/pruduct')
const Order = require('../models/order')

router.get('/',requireLogin, (req, res, next) => {
    Order.find()
    .populate('product','id name')
    .select('quantity product')
    .exec()
    .then((orders) => {
        const result = {
            message: 'success',
            count: orders.length,
            data: orders,
        }
        res.status(200).send(result)
    })
    .catch(next)
})

router.post('/', requireLogin, (req,res, next) => {
    Order.create(req.body)
    .then((order) => {
        res.status(201).send(order)
    })
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order details",
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, nxt) => {
    res.status(200).json({
        message: "Order deleted",
        orderId: req.params.orderId
    })
})

module.exports = router