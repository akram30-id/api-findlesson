import express from "express";
import userController from "../controller/user-controller.js";
import cors from "cors";
import { whitelistMiddleware } from "../middleware/whitelist-middlewate.js";

const publicRouter = express.Router();

publicRouter.use(cors(/*whitelistMiddleware*/));

publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

export {
    publicRouter
}