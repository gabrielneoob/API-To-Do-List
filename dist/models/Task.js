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

// src/models/Task.ts
var Task_exports = {};
__export(Task_exports, {
  default: () => Task_default
});
module.exports = __toCommonJS(Task_exports);
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
