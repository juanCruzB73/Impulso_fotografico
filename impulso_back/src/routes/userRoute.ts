import { Router } from "express";
import { getUsers,registerUser } from "../controllers/userController";

const userRoute=Router();

userRoute.get("/",getUsers);
userRoute.post("/",registerUser);

export default userRoute;