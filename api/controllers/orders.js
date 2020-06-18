const Order = require('../models/order')

exports.getOrders = (req, res, next) => {
    Order.find()
    .select('product quantity')
    .populate('product', 'name')
    .exec()
    .then((orders) => {
        const result = {
            count: orders.length,
            data: orders,
        }
        res.status(200).send(result)
    })
    .catch(next)
}

exports.addOrder = (req,res, next) => {
    Order.create(req.body)
    .then((order) => {
        res.status(201).send(order)
    })
    .catch(next)
}

exports.getOrder = (req, res, next) => {
    res.status(200).json({
        message: "Order details",
        orderId: req.params.orderId
    })
}

exports.deleteOrder = (req, res, nxt) => {
    res.status(200).json({
        message: "Order deleted",
        orderId: req.params.orderId
    })
}