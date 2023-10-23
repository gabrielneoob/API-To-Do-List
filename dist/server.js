"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));
var import_cors = __toESM(require("cors"));

// src/database/mongo.ts
var import_mongoose = require("mongoose");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var mongoConnect = async () => {
  try {
    console.log("conectando ao db");
    await (0, import_mongoose.connect)(process.env.MONGO_URL);
    console.log("db conectado com sucesso!");
  } catch (err) {
    console.log(err);
  }
};
var mongo_default = mongoConnect;

// src/routes/routes.ts
var import_express = require("express");

// src/models/Task.ts
var import_mongoose2 = require("mongoose");
var schema = new import_mongoose2.Schema({
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
var Task_default = import_mongoose2.connection && import_mongoose2.connection.models[modelName] ? import_mongoose2.connection.models[modelName] : (0, import_mongoose2.model)(modelName, schema);

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

// src/routes/routes.ts
var routes = (0, import_express.Router)();
routes.get("/", getAll);
routes.get("/todo/:id", getById);
routes.get("/search", startWith);
routes.post("/create", createTodo);
routes.put("/todo/check/:id", checkTodo);
routes.put("/todo/update/:id", updateTodo);
routes.delete("/todo/:id", deleteTodo);
var routes_default = routes;

// src/server.ts
import_dotenv2.default.config();
mongo_default();
var server = (0, import_express2.default)();
server.use(import_express2.default.urlencoded({ extended: true }));
server.use((0, import_cors.default)());
server.use(routes_default);
server.use((req, res) => {
  res.status(404);
  res.json({ error: "Endpoint not find" });
});
server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
