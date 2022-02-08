const User = require('../models/userModel')

const bcrypt = require('bcryptjs')

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            username,
            password: hashedPassword
        })
        req.session.user = newUser
        res.status(201).json({
            status: 'Sucess',
            data: {
                user: newUser.username
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if (!isCorrect) {
            return res.status(400).json({
                status: 'fail',
                message: 'Unable to log user in'
            })
        }

        req.session.user = user
        res.status(200).json({
            status: 'Sucess',
            data: {
                user: username
            }
        })

        return;
    } catch (e) {
        return res.status(400).json({
            status: 'fail',
            error: e
        })
    }
}