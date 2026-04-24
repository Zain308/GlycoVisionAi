import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

// We protect this route so only logged-in users can see their data
userRouter.get('/data', userAuth, getUserData);

export default userRouter;