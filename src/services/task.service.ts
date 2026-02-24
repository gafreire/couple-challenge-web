import type { Task, TaskCompletion, CreateTaskData, UpdateTaskData, TaskWithCount } from "../types/task.types";
import api from "./api";

export const taskService = {
  createTask: async (data: CreateTaskData) => {
    const response = await api.post(`/tasks`, data);
    return response.data as Task;
  },

  listChallengesTasks: async (challengeId: string) => {
    const response = await api.get(`/challenges/${challengeId}/tasks`);
    return response.data as TaskWithCount[];
  },

  updateTask: async (taskId: string, data: UpdateTaskData) => {
    const response = await api.put(`/tasks/${taskId}`, data);
    return response.data as Task;
  },

  deleteTask: async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
  },

  completeTask: async (taskId: string, photoUrl?: string) => {
    const response = await api.post(`/task-completions`, {
      task_id: taskId,
      photo_url: photoUrl || null,
    });
    return response.data as TaskCompletion;
  },
};
