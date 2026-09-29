import { ApiError, asyncHandler } from "../../lib/helperFunction.js";
import type { Response, Request } from "express";
import taskService from "./task.service.js";
import { createTaskValidation } from "../../validations/task.js";
import { verifyToken } from "../../lib/jwt.js";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
	const body = req.body;
	const result = createTaskValidation.safeParse(body);
	if (!result.success) {
		throw new ApiError(result.error.message);
	}
	const decoded = verifyToken(req);
	const task = await taskService.create(result.data, decoded.id);

	return res.status(201).json({ message: "Task created successfully !", task });
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
	const decoded = verifyToken(req);
	const tasks = await taskService.getAll(decoded.id);
	return res
		.status(200)
		.json({ message: "Tasks fetched successfully !", tasks });
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) throw new ApiError("Task id is missing !", 400);
	const decoded = verifyToken(req);
	const task = await taskService.getById(decoded.id, id as string);
	return res.status(200).json({ message: "Task fetched successfully !", task });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) throw new ApiError("Task id is missing !", 400);

	const body = req.body;
	const decoded = verifyToken(req);

	const updatedTask = await taskService.updateById(
		decoded.id,
		body,
		id as string,
	);

	return;
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) throw new ApiError("Task id is missing !", 400);

	const decoded = verifyToken(req);
	await taskService.deleteById(decoded.id, id as string);

	return res.status(204).json();
});

export const deleteAllTask = asyncHandler(
	async (req: Request, res: Response) => {
		const decoded = verifyToken(req);
		await taskService.deleteAll(decoded.id);

		return res.status(204);
	},
);
