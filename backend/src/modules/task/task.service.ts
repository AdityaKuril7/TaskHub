import { log } from "node:console";
import { prisma } from "../../lib/db.js";
import type { ICreateTask, ITask } from "../../types/task.js";
import { ApiError } from "../../lib/helperFunction.js";

class TaskService {
	async create(task: ICreateTask, userId: string) {
		return await prisma.task.create({ data: { ...task, userId } });
	}
	async getAll(userId: string, page: number, limit: number) {
		const skip = (page - 1) * limit;
		const [tasks, total] = await prisma.$transaction([
			prisma.task.findMany({
				where: {
					userId,
				},
				skip,
				take: limit,
				orderBy: { created_at: "desc" },
			}),
			prisma.task.count(),
		]);

		return { tasks, total };
	}
	async getById(userId: string, taskId: string) {
		return (await prisma.task.findUnique({
			where: { id: taskId, userId },
		})) as ITask;
	}
	async updateById(userId: string, data: any, taskId: string) {
		const updatedTask = await prisma.task.update({
			where: { id: taskId, userId },
			data: { ...data },
		});

		if (!updatedTask) throw new ApiError("Task not found !", 404);

		return updatedTask;
	}
	async deleteById(userId: string, taskId: string) {
		const task = await prisma.task.findUnique({ where: { id: taskId } });
		if (!task) {
			throw new ApiError("Task not found !", 404);
		}
		return await prisma.task.delete({ where: { userId, id: taskId } });
	}
	async deleteAll(userId: string) {
		return await prisma.task.deleteMany({ where: { userId } });
	}
}

export default new TaskService();
