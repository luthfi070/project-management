const express = require("express");
const app = express();
const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");
const { checkEmail } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helper/authHelper");
const { check } = require("express-validator");
require("dotenv").config();

//Create User / Register
app.post(
  "/",
  check("name").trim().escape(),
  check("email").isEmail().normalizeEmail(),
  check("password").trim().escape(),
  checkEmail,
  async (req, res) => {
    let payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    let salt = await bcrypt.genSalt();
    let encPass = await bcrypt.hash(payload.password, salt);

    payload.password = encPass;

    await userSchema.create(payload);

    res.status(201).json({
      status: "success",
      message: `User ${payload.email} has been created!`,
      statusCode: 201,
    });
  }
);

//Login
app.post(
  "/login",
  check("email").isEmail().normalizeEmail(),
  check("password").trim().escape(),
  async (req, res) => {
    let payload = {
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    };

    let checkEmail = await userSchema.findOne({
      email: payload.email,
    });

    if (checkEmail) {
      let checkPassword = bcrypt.compareSync(
        payload.password,
        checkEmail.password
      );

      if (checkPassword) {
        let token = jwt.sign({ checkEmail }, process.env.SECRET_KEY, {
          expiresIn: "2h",
        });

        res.status(202).json({
          status: "success",
          message: `User ${payload.email} has been logged in!`,
          token: token,
          statusCode: 201,
        });
      } else {
        res.status(401).json({
          status: "error",
          message: `Your password is incorrect!`,
          statusCode: 401,
        });
      }
    } else {
      res.status(401).json({
        status: "error",
        message: `User ${payload.email} is not exist!`,
        statusCode: 401,
      });
    }
  }
);

//Get All User
app.get("/", verifyToken, async (req, res, next) => {
  try {
    let getAllUser = await userSchema.find({}).select({ email: 1, name: 1 });

    if (getAllUser) {
      res.status(200).json({
        status: "success",
        message: `Successfully fetch all User!`,
        data: getAllUser,
        statusCode: 200,
      });
    } else {
      throw new Error(`Failed to fetch all user data!`);
    }
  } catch (err) {
    next(err);
  }
});

//Get User By Id
app.get("/:id", verifyToken, async (req, res, next) => {
  try {
    if (req.params["id"] !== req.body.iduser) {
      throw new Error(`Oops you are not allowed to view that!`);
    }

    let getUser = await userSchema.findById(req.params["id"]);

    if (getUser) {
      res.status(200).json({
        status: "success",
        message: `Successfully fetch user ${req.params["id"]}`,
        data: getUser,
        statusCode: 200,
      });
    } else {
      throw new Error(`User ${req.params["id"]} not found!`);
    }
  } catch (err) {
    next(err);
  }
});

//Update User By Id
app.put(
  "/:id",
  check("name").trim().escape(),
  check("email").isEmail().normalizeEmail(),
  check("password").trim().escape(),
  verifyToken,
  async (req, res, next) => {
    try {
      if (req.params["id"] !== req.body.iduser) {
        throw new Error(`Oops you are not allowed to do that!`);
      }

      let payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      let salt = await bcrypt.genSalt();
      let encPass = await bcrypt.hash(payload.password, salt);

      payload.password = encPass;

      let updateUser = await userSchema.findByIdAndUpdate(
        req.params["id"],
        payload
      );

      if (updateUser) {
        res.status(200).json({
          status: "success",
          message: `Successfully updated user ${req.params["id"]}`,
          statusCode: 200,
        });
      } else {
        throw new Error(`Failed to update user ${req.params["id"]}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

//Delete User by Id
app.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    if (req.params["id"] !== req.body.iduser) {
      throw new Error(`Oops you are not allowed to do that!`);
    }

    let deleteUser = await userSchema.findOneAndDelete({
      _id: req.params["id"],
    });

    if (deleteUser) {
      res.status(200).json({
        status: "success",
        message: `Successfully deleted user ${req.params["id"]}`,
        statusCode: 200,
      });
    } else {
      throw new Error(`Failed to delete user ${req.params["id"]}`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = app;
