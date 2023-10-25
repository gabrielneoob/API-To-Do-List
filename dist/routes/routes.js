"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/models/Task.ts
var import_mongoose = require("mongoose");
var schema = new import_mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  check: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
var modelName = "Task";
var Task_default = import_mongoose.connection && import_mongoose.connection.models[modelName] ? import_mongoose.connection.models[modelName] : (0, import_mongoose.model)(modelName, schema);

// src/controller/TaskController.ts
var getAll = async (req, res) => {
  try {
    const todos = await Task_default.find();
    res.status(202).json(todos);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var getByFilter = async (req, res) => {
  const { filter } = req.params;
  if (filter === "all")
    return res.json({ all: true });
  let val = false;
  console.log(filter);
  if (filter === "done")
    val = true;
  if (filter === "undone")
    val = false;
  try {
    const todos = await Task_default.find({
      check: val
    });
    res.status(202).json(todos);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var getById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Task_default.findById(id);
    res.status(202).json(todo);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var startWith = async (req, res) => {
  const { task } = req.body;
  try {
    const searchTodos = await Task_default.find({
      task: { $regex: "^" + task, $options: "i" }
    });
    res.status(202).json(searchTodos);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await Task_default.create({
      task,
      check: false
    });
    res.status(202).json({ id: newTodo._id });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var checkTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const currentTodo = await Task_default.findByIdAndUpdate(id);
    if (currentTodo) {
      currentTodo.check ? currentTodo.check = false : currentTodo.check = true;
      currentTodo.save();
      res.status(202).json(currentTodo);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
var updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  try {
    const currentTodo = await Task_default.findByIdAndUpdate(id);
    if (currentTodo) {
      currentTodo.task = task;
      currentTodo.save();
      console.log(currentTodo);
      res.status(202).json(currentTodo);
    }
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
var deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Task_default.findByIdAndDelete(id);
    res.status(202).json({ deleted: true });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// src/routes/routes.ts
var routes = (0, import_express.Router)();
routes.get("/", getAll);
routes.get("/todo/:id", getById);
routes.post("/todo/:filter", getByFilter);
routes.post("/search", startWith);
routes.post("/create", createTodo);
routes.put("/todo/check/:id", checkTodo);
routes.put("/todo/update/:id", updateTodo);
routes.delete("/todo/:id", deleteTodo);
var routes_default = routes;
