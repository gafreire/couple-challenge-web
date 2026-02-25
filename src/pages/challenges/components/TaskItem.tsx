import React from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';
import {
  Item,
  TaskInfo,
  TaskName,
  TaskMeta,
  TaskActions,
  CompleteButton,
  IconButton,
  PointsBadge,
} from './TaskItem.styles';
import type { TaskWithCount } from '../../../types/task.types';

interface TaskItemProps {
  taskWithCount: TaskWithCount;
  currentUserId: string;
  onEdit: (task: TaskWithCount['task']) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  taskWithCount,
  currentUserId,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const { task, completion_count } = taskWithCount;
  const { user_id, name, points, max_completions } = task;

  const isOwner = user_id === currentUserId;
  const isCompleted = max_completions ? completion_count >= max_completions : false;

  return (
    <Item>
      <TaskInfo>
        <TaskName>{name}</TaskName>
        <TaskMeta>
          <PointsBadge>{points} pontos</PointsBadge> • {completion_count} / {max_completions || '∞'}
        </TaskMeta>
      </TaskInfo>
      <TaskActions>
        <CompleteButton
          $disabled={!isOwner || isCompleted}
          onClick={() => isOwner && !isCompleted && onComplete(task.id)}
        >
          <Check size={16} />
        </CompleteButton>
        {isOwner && (
          <IconButton onClick={() => onEdit(task)}>
            <Pencil size={16} />
          </IconButton>
        )}
        {isOwner && (
        <IconButton onClick={() => onDelete(task.id)}>
          <Trash2 size={16} />
        </IconButton>
        )}
      </TaskActions>
    </Item>
  );
};

export default TaskItem;
