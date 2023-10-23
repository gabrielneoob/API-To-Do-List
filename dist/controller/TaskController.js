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

// src/controller/TaskController.ts
var TaskController_exports = {};
__export(TaskController_exports, {
  checkTodo: () => checkTodo,
  createTodo: () => createTodo,
  deleteTodo: () => deleteTodo,
  getAll: () => getAll,
  getById: () => getById,
  startWith: () => startWith,
  updateTodo: () => updateTodo
});
module.exports = __toCommonJS(TaskController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkTodo,
  createTodo,
  deleteTodo,
  getAll,
  getById,
  startWith,
  updateTodo
});
