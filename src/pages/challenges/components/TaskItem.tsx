import React from 'react';
import { Check, Pencil, Trash2, CheckSquare } from 'lucide-react';
import {
  Item, ItemLeft, TaskIconBox, TaskInfo, TaskName, TaskMeta,
  PointsBadge, CompletionCount, CompletedBadge,
  TaskActions, IconButton, CompleteButton,
} from './TaskItem.styles';
import type { TaskWithCount } from '../../../types/task.types';
import type { CoupleWithUsers } from '../../../types/couple.types';

interface TaskItemProps {
  taskWithCount: TaskWithCount;
  currentUserId: string;
  coupleData: CoupleWithUsers;
  onEdit: (task: TaskWithCount['task']) => void;
  onDelete: (task: TaskWithCount['task']) => void;
  onComplete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  taskWithCount,
  currentUserId,
  coupleData,
  onEdit,
  onDelete,
  onComplete,
}) => {
  const { task, completion_count } = taskWithCount;
  const { name, points, max_completions, assignee } = task;

  const isCompleted = max_completions ? completion_count >= max_completions : false;

  const canInteract = (() => {
    if (assignee === 'both') {
      return currentUserId === coupleData.couple.user_id_1 || currentUserId === coupleData.couple.user_id_2;
    }
    if (assignee === 'user_1') return currentUserId === coupleData.couple.user_id_1;
    if (assignee === 'user_2') return currentUserId === coupleData.couple.user_id_2;
    return false;
  })();

  const canComplete = !isCompleted && canInteract;

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
        {canInteract && !isCompleted && (
          <IconButton onClick={() => onEdit(task)}>
            <Pencil size={14} />
          </IconButton>
        )}
        {canInteract && (
          <IconButton onClick={() => onDelete(task)}>
            <Trash2 size={14} />
          </IconButton>
        )}
        <CompleteButton
          $disabled={!canComplete}
          $completed={isCompleted}
          onClick={() => canComplete && onComplete(task.id)}
        >
          <Check size={16} />
        </CompleteButton>
      </TaskActions>
    </Item>
  );
};

export default TaskItem;