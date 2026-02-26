import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { challengeService } from "../../services/challenge.service";
import { taskService } from "../../services/task.service";
import { useAuthStore } from "../../store/authStore";
import type { Challenge } from "../../types/challenge.types";
import type { TaskWithCount, Task } from "../../types/task.types";
import TaskItem from "../challenges/components/TaskItem";
import CreateTaskModal from "../challenges/components/CreateTaskModal";
import EditTaskModal from "../challenges/components/EditTaskModal";
import {
  Container,
  Header,
  CreateButton,
  EmptyMessage,
  ErrorMessage,
  ChallengeInfo,
  ChallengeLabel,
  ChallengeName,
  TaskList,
} from "./TasksPage.styles";

const TasksPage = () => {
  const { user } = useAuthStore();
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [tasks, setTasks] = useState<TaskWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const active = await challengeService
        .getActiveChallenge()
        .catch(() => null);
      setActiveChallenge(active);

      if (active) {
        const tasksData = await taskService.listChallengesTasks(active.id);
        setTasks(tasksData);
      }
    } catch {
      setError("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleCloseCreateTaskModal = () => {
    setShowCreateTaskModal(false);
  };

  const handleCreateTaskSuccess = () => {
    setTaskError(null);
    fetchData();
  };

  const handleEditTask = (task: Task) => {
    setTaskError(null);
    setEditingTask(task);
  };

  const handleCloseEditTaskModal = () => {
    setEditingTask(null);
  };

  const handleEditTaskSuccess = () => {
    setTaskError(null);
    fetchData();
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      try {
        await taskService.deleteTask(taskId);
        setTaskError(null);
        fetchData();
      } catch {
        setTaskError("Erro ao deletar tarefa");
      }
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await taskService.completeTask(taskId);
      setTaskError(null);
      fetchData();
    } catch {
      setTaskError("Erro ao completar tarefa");
    }
  };

  if (loading)
    return (
      <Container>
        <ErrorMessage>Carregando...</ErrorMessage>
      </Container>
    );

  if (error)
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );

  if (!activeChallenge) {
    return (
      <Container>
        <EmptyMessage>Nenhum desafio ativo no momento</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <ChallengeInfo>
          <ChallengeLabel>Desafio ativo</ChallengeLabel>
          <ChallengeName>{activeChallenge.name}</ChallengeName>
        </ChallengeInfo>
        <CreateButton onClick={handleCreateTask}>
          <Plus size={16} />
        </CreateButton>
      </Header>

      <TaskList>
        {taskError && <ErrorMessage>{taskError}</ErrorMessage>}
        {tasks.length > 0 ? (
          tasks.map((taskWithCount) => (
            <TaskItem
              key={taskWithCount.task.id}
              taskWithCount={taskWithCount}
              currentUserId={user?.id || ""}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          ))
        ) : (
          <EmptyMessage>Nenhuma tarefa criada</EmptyMessage>
        )}
      </TaskList>

      {showCreateTaskModal && (
        <CreateTaskModal
          challengeId={activeChallenge.id}
          onClose={handleCloseCreateTaskModal}
          onSuccess={handleCreateTaskSuccess}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={handleCloseEditTaskModal}
          onSuccess={handleEditTaskSuccess}
        />
      )}
    </Container>
  );
};

export default TasksPage;
