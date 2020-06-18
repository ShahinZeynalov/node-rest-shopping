const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUsers = (req, res, next) => {
    User.find()
    .select('username email password firstName lastName')
    .exec()
    .then((users) => {
        const result = {
            count: users.length,
            data: users
        }
        res.status(200).send(result)
    })
    .catch(next)
}

exports.getUser = (req, res, next) => {
    const id = req.params.userId
    User.findById({_id:id})
    .select('username email password firstName lastName avatar')
    .exec()
    .then((user) => {
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(500).json({
                message:'Not found'
            })
        }
    })
    .catch(next)
}

exports.addUser = ((req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then((user) => {
        if(user.length >=1) {
            return res.status(409).json({
                message: "User is already exists with this email address"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                User.create({
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash
                })
                .then(() => {
                    res.status(201).json({
                        message: 'User created'
                    })
                })
                .catch(next)
            })
        }
    })
    .catch(next)
})

exports.loginUser = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then((user) => {
        if (user.length <1) {
            return res.status(401).json({
                message: "Authentication failed"
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                } if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        access: token
                    })
                }
                res.status(401).json({
                    message: "Authentication failed"
                })
            })
        }
    })
    .catch(next)
}


exports.updateUser = ((req, res, next) => {
    const id = req.params.userId
    
    User.findByIdAndUpdate({ _id: id }, req.file, req.body)
    .select('username email password avatar firstName lastName')
    .exec()
    .then((user) => {
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.avatar = req.file.path || user.avatar
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName

        res.status(200).send(user)
    })
    .catch(next)
})

