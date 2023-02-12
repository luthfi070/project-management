const express = require("express");
const app = express();
const userSchema = require("../model/userModel");
const projectSchema = require("../model/projectModel");
const taskSchema = require("../model/taskModel");
const { checkEmail } = require("../helper/authHelper");
const { verifyToken } = require("../helper/authHelper");
const { check } = require("express-validator");
require("dotenv").config();

//create new task
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
        project_id: req.body.project_id,
      };

      let findProject = await projectSchema.findOne({
        _id: payload.project_id,
      });

      if (findProject && findProject.user_id == req.body.iduser) {
        let createTask = await taskSchema.create(payload);

        if (createTask) {
          res.status(201).json({
            status: "success",
            message: `Task ${payload.name} for Project ${findProject.name} has been created!`,
            statusCode: 201,
          });
        } else {
          throw new Error("Failed to create task!");
        }
      } else {
        throw new Error("oops this project is not exist!");
      }
    } catch (err) {
      next(err);
    }
  }
);

//get all task
app.get("/", verifyToken, async (req, res, next) => {
  try {
    let getAllTask = await taskSchema.find({
      user_id: req.body.iduser,
    });

    if (getAllTask) {
      res.status(201).json({
        status: "success",
        message: `Succesfully fetched all Task!`,
        data: getAllTask,
        statusCode: 201,
      });
    } else {
      throw new Error("Failed to fetch all Task!");
    }
  } catch (err) {
    next(err);
  }
});

//get task by id
app.get("/:id", verifyToken, async (req, res, next) => {
  try {
    let getTaskById = await taskSchema.findOne({
      _id: req.params["id"],
      user_id: req.body.iduser,
    });

    if (getTaskById) {
      res.status(201).json({
        status: "success",
        message: `Succesfully fetch Task ${req.params["id"]}!`,
        data: getTaskById,
        statusCode: 201,
      });
    } else {
      throw new Error(`Failed to fetch ${req.params["id"]}`);
    }
  } catch (err) {
    next(err);
  }
});

//update a task by id
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
        project_id: req.body.project_id,
      };

      let updateTask = await taskSchema.findOneAndUpdate(
        {
          _id: req.params["id"],
          user_id: payload.user_id,
        },
        payload
      );

      if (updateTask) {
        res.status(200).json({
          status: "success",
          message: `Succesfully updated Task ${req.params["id"]}!`,
          statusCode: 200,
        });
      } else {
        throw new Error(`failed to update task ${req.params["id"]}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

//delete task by id
app.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    let deleteTask = await taskSchema.findOneAndDelete({
      _id: req.params["id"],
      user_id: req.body.iduser,
    });

    if (deleteTask) {
      res.status(200).json({
        status: "success",
        message: `Succesfully deleted Task ${req.params["id"]}!`,
        statusCode: 200,
      });
    } else {
      throw new Error(`Failed to delete Task ${req.params["id"]}`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = app;
