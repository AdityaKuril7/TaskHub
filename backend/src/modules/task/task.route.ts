import { Router } from "express";
import {
	createTask,
	deleteAllTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask,
} from "./task.controller.js";

export const taskRouter = Router();

taskRouter.route("/").post(createTask);
taskRouter.route("/:id").get(getTask);
taskRouter.route("/").get(getTasks);
taskRouter.route("/:id").delete(deleteTask);
taskRouter.route("/:id").patch(updateTask);
taskRouter.route("/").delete(deleteAllTask);
