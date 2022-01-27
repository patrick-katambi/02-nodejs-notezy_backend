const Joi = require("joi");
const User = require("./users.model");
const usersSchema = require("./users.validation");
const bcrypt = require("bcrypt");
const axios = require("axios");
const https = require("https");
var btoa = require("btoa");

const api_key = "06026359699ee2d1";
const secret_key =
  "YzQzNzAwNzE3ZWYyZmUwOGNkNmI2NTc3ZmFjNjJhOTNjODA2Y2NjNmQ5MmM0MzMxMzVkNTVkYTg0NTZjZjE4Mw==";
const content_type = "application/json";
const source_addr = "INFO";

class UsersController {
  validateUserInputs(req, res, next) {
    const validation = usersSchema.registerSchema.validate(req.body);
    if (validation.error) return res.send(validation.error.details[0].message);
    next();
  }

  async checkUsername(req, res, next) {
    const doc = await User.findOne({ username: req.body.username });
    if (doc)
      return res.send({
        message: "Failed",
        details: "username already exists",
        data: null,
        errors: null,
      });
    next();
  }

  async checkEmail(req, res, next) {
    const doc = await User.findOne({ email: req.body.email });
    if (doc)
      return res.send({
        message: "Failed",
        details: "email already exists",
        data: null,
        errors: null,
      });
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
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      repeatPassword: hashedPassword,
    });

    try {
      await user.save().then((savedDoc) => {
        // sending one-time-password sms
        send_sms(req.body.phoneNumber);

        // const { _id, username, email, phoneNumber, date } = savedDoc;
        return res.send({
          message: "Success",
          details: "Successfully registered the user",
          data: savedDoc,
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

function send_sms(phoneNumber) {
  const randomNumber = getRandomInt(10001, 99999);
  axios
    .post(
      "https://apisms.beem.africa/v1/send",
      {
        source_addr: source_addr,
        schedule_time: "",
        encoding: 0,
        message: `[ Notezy ] your verification code is ${randomNumber}. Do not share this code with anyone.`,
        recipients: [{ recipient_id: 1, dest_addr: phoneNumber }],
      },
      {
        headers: {
          "Content-Type": content_type,
          Authorization: "Basic " + btoa(api_key + ":" + secret_key),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    )
    .then((response) => console.log(response, api_key + ":" + secret_key))
    .catch((error) => console.error(error.response.data));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
