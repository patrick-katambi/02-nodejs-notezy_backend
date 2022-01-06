const Joi = require('joi');
const User = require('./users.model')
const usersSchema = require('./users.validation')

class UsersController {
    validateUserInputs(req, res, next) {
        const validation = usersSchema.registerSchema.validate(req.body.userInfo);
        if (validation.error) return res.send(validation)
        next()
    }
    registerUser(req, res) {
        res.send({ message: 'on to registering the user' })

        // // registering to db
        // const user = new User({
        //     username: req.body.userInfo.name,
        //     email: req.body.userInfo.email,
        //     password: req.body.userInfo.password,
        //     repeatPassword: req.body.userInfo.repeatPassword,
        // })

        // try {
        //     const savedUser = await user.save()
        //     return res.send(savedUser)
        // } catch (error) {
        //     console.log(error)
        //     res.status(400).send(error)
        // }
    }
}

module.exports = new UsersController()