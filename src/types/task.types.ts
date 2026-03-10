export interface Task {
  id: string;
  challenge_id: string;
  user_id: string;
  name: string;
  description: string | null;
  points: number;
  max_completions: number | null;
  assignee: 'user_1' | 'user_2' | 'both';
  created_at: string;
  updated_at: string;
}

export interface TaskWithCount {
  task: Task;
  completion_count: number;
}

export interface TaskCompletion {
  id: string;
  task_id: string;
  user_id: string;
  completed_at: string;
  photo_url: string | null;
  points_earned: number;
  created_at: string;
}

export interface CreateTaskData {
  challenge_id: string;
  name: string;
  description?: string;
  points: number;
  max_completions?: number;
  assignee?: 'user_1' | 'user_2' | 'both';
}

export interface UpdateTaskData {
  name?: string;
  description?: string;
  points?: number;
  max_completions?: number;
  assignee?: 'user_1' | 'user_2' | 'both';
}