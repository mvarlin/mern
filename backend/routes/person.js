import express from 'express';
import { login, signUp, all } from '../controllers/personController';

let personRouter = express.Router();

personRouter.post('/signUp', signUp);
personRouter.post('/login', login);
personRouter.get('/all', all);

export default personRouter;
