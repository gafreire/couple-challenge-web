/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { challengeService } from '../../services/challenge.service';
import { taskService } from '../../services/task.service';
import { useAuthStore } from '../../store/authStore';
import { useAppCache } from '../../store/appCache';
import type { Task, TaskWithCount } from '../../types/task.types';
import TaskItem from '../challenges/components/TaskItem';
import CreateTaskModal from '../challenges/components/CreateTaskModal';
import EditTaskModal from '../challenges/components/EditTaskModal';
import DeleteTaskModal from '../challenges/components/DeleteTaskModal';
import {
  Container, Header, HeaderLeft, Title, ChallengeInfo, ChallengeLabel, ChallengeName,
  HeaderRight, CreateButton,
  FilterRow, FilterTab,
  TaskList,
  EmptyState, EmptyIcon, EmptyTitle, EmptySubtitle,
  ErrorMessage,
} from './TasksPage.styles';

type FilterType = 'todas' | 'pendentes' | 'concluidas';

const TasksPage = () => {
  const { user } = useAuthStore();
  const cache = useAppCache();

  const hasCache = cache.tasksChallenge !== null || cache.tasks.length > 0;
  const [loading, setLoading] = useState(!hasCache);
  const [error, setError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('todas');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const active = await challengeService.getActiveChallenge().catch(() => null);
      let tasksData: TaskWithCount[] = [];
      if (active) {
        tasksData = await taskService.listChallengesTasks(active.id);
      }

      cache.setTasks({
        tasksChallenge: active,
        tasks: tasksData,
      });
    } catch {
      if (!silent) setError('Erro ao carregar tarefas');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(hasCache);
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await taskService.completeTask(taskId);
      setTaskError(null);
      fetchData(true);
    } catch {
      setTaskError('Erro ao completar tarefa');
    }
  };

  const { tasksChallenge: activeChallenge, tasks } = cache;

  const filteredTasks = tasks.filter(({ task, completion_count }) => {
    const isCompleted = task.max_completions ? completion_count >= task.max_completions : false;
    if (filter === 'pendentes') return !isCompleted;
    if (filter === 'concluidas') return isCompleted;
    return true;
  });

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  if (!activeChallenge) {
    return (
      <Container>
        <Header>
          <HeaderLeft><Title>Suas Tarefas</Title></HeaderLeft>
        </Header>
        <EmptyState>
          <EmptyIcon><CheckSquare size={20} /></EmptyIcon>
          <EmptyTitle>Nenhum desafio ativo</EmptyTitle>
          <EmptySubtitle>Crie um desafio para começar a adicionar tarefas.</EmptySubtitle>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Title>Suas Tarefas</Title>
          <ChallengeInfo>
            <ChallengeLabel>Desafio Ativo</ChallengeLabel>
            <ChallengeName>{activeChallenge.name}</ChallengeName>
          </ChallengeInfo>
        </HeaderLeft>
        <HeaderRight>
          <CreateButton onClick={() => setShowCreateTaskModal(true)}>
            <Plus size={15} /> Nova Tarefa
          </CreateButton>
        </HeaderRight>
      </Header>

      <FilterRow>
        <FilterTab $active={filter === 'todas'} onClick={() => setFilter('todas')}>Todas</FilterTab>
        <FilterTab $active={filter === 'pendentes'} onClick={() => setFilter('pendentes')}>Pendentes</FilterTab>
        <FilterTab $active={filter === 'concluidas'} onClick={() => setFilter('concluidas')}>Concluídas</FilterTab>
      </FilterRow>

      <TaskList>
        {taskError && <ErrorMessage>{taskError}</ErrorMessage>}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((taskWithCount) => (
            <TaskItem
              key={taskWithCount.task.id}
              taskWithCount={taskWithCount}
              currentUserId={user?.id || ''}
              onEdit={(task) => { setTaskError(null); setEditingTask(task); }}
              onDelete={(task) => { setTaskError(null); setDeletingTask(task); }}
              onComplete={handleCompleteTask}
            />
          ))
        ) : (
          <EmptyState>
            <EmptyIcon><CheckSquare size={20} /></EmptyIcon>
            <EmptyTitle>
              {filter === 'todas' ? 'Nenhuma tarefa criada' : `Nenhuma tarefa ${filter}`}
            </EmptyTitle>
            <EmptySubtitle>
              {filter === 'todas' ? 'Crie sua primeira tarefa para começar.' : 'Tente outro filtro.'}
            </EmptySubtitle>
          </EmptyState>
        )}
      </TaskList>

      {showCreateTaskModal && (
        <CreateTaskModal
          challengeId={activeChallenge.id}
          onClose={() => setShowCreateTaskModal(false)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onSuccess={() => { setTaskError(null); fetchData(true); }}
        />
      )}
    </Container>
  );
};

export default TasksPage;