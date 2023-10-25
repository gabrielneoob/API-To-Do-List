import { Request, Response, json } from "express";
import Todos from '../models/Task'


//READ
export const getAll = async (req: Request, res: Response) => {
  try{
    const todos = await Todos.find();
    res.status(202).json(todos)
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
}

export const getByFilter = async (req: Request, res: Response) => {
  const { filter } = req.params;
  if(filter === "all") return res.json({ all: true});
  let val = false;
  console.log(filter);
  if(filter === "done") val = true;
  if(filter === "undone") val = false;
  
  try {
    const todos = await Todos.find({
      check: val
    })
    res.status(202).json(todos)
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
  
}

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params
  try{
    const todo = await Todos.findById(id);
    res.status(202).json(todo)
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
}

export const startWith = async (req: Request, res: Response) => {
  const { task } = req.body
  try{
    const searchTodos = await Todos.find({
      task: { $regex:'^' + task, $options: 'i'}
    });
    res.status(202).json(searchTodos)
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
}


//CREATE
export const createTodo = async (req: Request, res: Response) => {
  const { task } = req.body;
  try{
    const newTodo = await Todos.create({
      task,
      check: false
    })
    res.status(202).json({id: newTodo._id})
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
}

//PUT
export const checkTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const currentTodo = await Todos.findByIdAndUpdate(id);
    if(currentTodo) {
      currentTodo.check ? currentTodo.check = false : currentTodo.check = true
      currentTodo.save();
      res.status(202).json(currentTodo)
    }
  }
  catch(err) {
    res.status(500).json({ error: err })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task } = req.body
  try{
    const currentTodo = await Todos.findByIdAndUpdate(id);
    if(currentTodo) {
      currentTodo.task = task;
      currentTodo.save();
      console.log(currentTodo);
      
      res.status(202).json(currentTodo)
    }
  }
  catch(err) {
    res.status(404).json({ error: err })
  }
}

//DELETE
export const deleteTodo = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    await Todos.findByIdAndDelete(id);
    res.status(202).json({deleted: true})
  } 
  catch(err) {
    res.status(404).json({ error: err })
  }
}