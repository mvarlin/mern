import express from 'express';
import { addFish, allFish } from '../controllers/fishController';

let fishRouter = express.Router();

fishRouter.post('/add', addFish);
fishRouter.get('/all', allFish);

export default fishRouter;
