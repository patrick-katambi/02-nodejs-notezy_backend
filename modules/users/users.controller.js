const Joi = require("joi");
const User = require("./users.model");
const usersSchema = require("./users.validation");

const bcrypt = require("bcrypt");

class UsersController {
  validateUserInputs(req, res, next) {
    const validation = usersSchema.registerSchema.validate(req.body);
    if (validation.error) return res.send(validation.error.details[0].message);
    next();
  }

  async checkUsername(req, res, next) {
    const doc = await User.findOne({ username: req.body.username });
    if (doc) return res.send("username already exists");
    next();
  }

  async checkEmail(req, res, next) {
    const doc = await User.findOne({ email: req.body.email });
    if (doc) return res.send("email already exists");
    next();
  }

  async registerUser(req, res) {
    // hashing the password password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    // registering to mongodb
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      repeatPassword: hashedPassword,
    });

    try {
      await user.save().then((savedDoc) => {
        const { _id, username, email, date } = savedDoc;
        return res.send({
          message: "Success",
          details: "Successfully registered the user",
          data: { _id, username, email, date },
          error: null,
        });
      });
    } catch (error) {
      res.status(400).send({
        message: "Failed",
        details: "User already exists",
        data: null,
        error: error,
      });
    }
  }

  async getUserByUsername(req, res) {
    const doc = await User.findOne({ username: req.params.username });
    if (doc) console.log("doc obtained");
    res.send(doc);
  }
}

module.exports = new UsersController();
