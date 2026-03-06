import React from 'react';
import { Check, Pencil, Trash2, CheckSquare } from 'lucide-react';
import {
  Item, ItemLeft, TaskIconBox, TaskInfo, TaskName, TaskMeta,
  PointsBadge, CompletionCount, CompletedBadge,
  TaskActions, IconButton, CompleteButton,
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
    <Item $completed={isCompleted}>
      <ItemLeft>
        <TaskIconBox $completed={isCompleted}>
          <CheckSquare size={18} />
        </TaskIconBox>
        <TaskInfo>
          <TaskName $completed={isCompleted}>{name}</TaskName>
          <TaskMeta>
            <PointsBadge>+{points} pts</PointsBadge>
            <CompletionCount>{completion_count} / {max_completions || '∞'}</CompletionCount>
            {isCompleted && <CompletedBadge>● Concluída</CompletedBadge>}
          </TaskMeta>
        </TaskInfo>
      </ItemLeft>

      <TaskActions>
        {isOwner && !isCompleted && (
          <IconButton onClick={() => onEdit(task)}>
            <Pencil size={14} />
          </IconButton>
        )}
        {isOwner && (
          <IconButton onClick={() => onDelete(task.id)}>
            <Trash2 size={14} />
          </IconButton>
        )}
        <CompleteButton
          $disabled={!isOwner || isCompleted}
          $completed={isCompleted}
          onClick={() => isOwner && !isCompleted && onComplete(task.id)}
        >
          <Check size={16} />
        </CompleteButton>
      </TaskActions>
    </Item>
  );
};

export default TaskItem;