import express from 'express';
import { getAll } from '../controlers/userController';

let userRouter= express.Router();

userRouter.get('/', getAll);

export default userRouter;
