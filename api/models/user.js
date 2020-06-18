const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password: { type: String, required: true, unique:true }
})

module.exports = mongoose.model('User', userSchema)