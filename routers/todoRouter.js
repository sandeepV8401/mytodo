import Todo from "../models/todoModel.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const todoRouter = express.Router();

todoRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const todos = await Todo.find({});
    res.send(todos);
  })
);

todoRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newTodo = new Todo({
      name: req.body.name,
    });
    const createdTodo = await newTodo.save();
    res.send(createdTodo);
  })
);

todoRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const idToEdit = req.params.id;
    const newTodo = await Todo.findById(idToEdit);
    newTodo.name = req.body.name;
    const newEdited = await newTodo.save();
    res.send(newEdited);
  })
);

todoRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const idToDelete = req.params.id;
    try {
      const delTodo = await Todo.deleteOne({ _id: idToDelete }, (err) => {
        //  res.send("record not found");
      });
    } catch (e) {
      res.send("Item Deleted");
    }
  })
);
export default todoRouter;
