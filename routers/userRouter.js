import User from "../models/userModel.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(500).send({ message: "User already exists." });
    } else {
      const newUser = new User({
        username,
        password,
      });
      const createdUser = await newUser.save();
      res.send(createdUser);
    }
  })
);

// todoRouter.put("/:id",expressAsyncHandler(async(req,res)=>{
//     const idToEdit = req.params.id;
//     const newTodo = await Todo.findById(idToEdit);
//     newTodo.name = req.body.name;
//     const newEdited = await newTodo.save();
//     res.send(newEdited);

// }))

// todoRouter.delete("/:id", expressAsyncHandler(async(req,res)=>{
//     const idToDelete = req.params.id;
//     try{
//     const delTodo = await Todo.deleteOne({_id:idToDelete},(err)=>{
//       //  res.send("record not found");
//     });
// }catch(e){
//     res.send("Item Deleted");
// }
// }))
export default userRouter;
