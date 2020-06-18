const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: true
    },
    productImage: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Product', productSchema)