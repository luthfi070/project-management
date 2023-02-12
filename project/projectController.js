const express = require("express");
const app = express();
const userSchema = require("../model/userModel");
const projectSchema = require("../model/projectModel");
const { checkEmail } = require("../helper/authHelper");
const { verifyToken } = require("../helper/authHelper");
const { check } = require("express-validator");
require("dotenv").config();

//create project
app.post(
  "/",
  check("name").trim().escape(),
  check("description").trim().escape(),
  check("date").isDate(),
  verifyToken,
  async (req, res, next) => {
    try {
      let payload = {
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.date,
        user_id: req.body.iduser,
      };

      let createProject = projectSchema.create(payload);

      if (createProject) {
        res.status(201).json({
          status: "success",
          message: `Project ${payload.name} has been created!`,
          statusCode: 201,
        });
      } else {
        throw new Error(`Failed to create ${payload.name} Project!`);
      }
    } catch (err) {
      next(err);
    }
  }
);

//get all project
app.get("/", verifyToken, async (req, res, next) => {
  try {
    let getAllProject = await projectSchema.find({
      user_id: req.body.iduser,
    });

    if (getAllProject) {
      res.status(201).json({
        status: "success",
        message: `Succesfully fetched all Project!`,
        data: getAllProject,
        statusCode: 201,
      });
    } else {
      throw new Error("Failed to fetch all Project!");
    }
  } catch (err) {
    next(err);
  }
});

//get project by id
app.get("/:id", verifyToken, async (req, res, next) => {
  try {
    let getProjectById = await projectSchema.findOne({
      _id: req.params["id"],
      user_id: req.body.iduser,
    });

    if (getProjectById) {
      res.status(200).json({
        status: "success",
        message: `Succesfully fetched ${req.params["id"]} Project!`,
        data: getProjectById,
        statusCode: 200,
      });
    } else {
      throw new Error(`Failed to fetch ${req.params["id"]} Project!`);
    }
  } catch (err) {
    next(err);
  }
});

//update project by id
app.put(
  "/:id",
  check("name").trim().escape(),
  check("description").trim().escape(),
  check("date").isDate(),
  verifyToken,
  async (req, res, next) => {
    try {
      let payload = {
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.date,
        user_id: req.body.iduser,
      };

      let updateProject = await projectSchema.findOneAndUpdate(
        {
          _id: req.params["id"],
          user_id: req.body.iduser,
        },
        payload
      );

      if (updateProject) {
        res.status(200).json({
          status: "success",
          message: `Successfully updated Project ${req.params["id"]}`,
          statusCode: 200,
        });
      } else {
        throw new Error(`Failed to update Project ${req.params["id"]}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

//delete project by id
app.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    let deleteProject = await projectSchema.findOneAndDelete({
      _id: req.params["id"],
      user_id: req.body.iduser,
    });

    if (deleteProject) {
      res.status(200).json({
        status: "success",
        message: `Successfully deleted Project ${req.params["id"]}`,
        statusCode: 200,
      });
    } else {
      throw new Error(`Failed to delete Project ${req.params["id"]}`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = app;
