import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { challengeService } from "../../services/challenge.service";
import { coupleService } from "../../services/couple.service";
import { taskService } from "../../services/task.service";
import { useAuthStore } from "../../store/authStore";
import type { Challenge, ChallengeScore } from "../../types/challenge.types";
import type { CoupleWithUsers } from "../../types/couple.types";
import type { TaskWithCount, Task } from "../../types/task.types";
import ActiveChallengeCard from "./components/ActiveChallengeCard";
import ChallengeHistoryItem from "./components/ChallengeHistoryItem";
import CreateChallengeModal from "./components/CreateChallengeModal";
import TaskItem from "./components/TaskItem";
import CreateTaskModal from "./components/CreateTaskModal";
import EditTaskModal from "./components/EditTaskModal";
import {
  Container,
  Header,
  Title,
  CreateButton,
  Section,
  SectionTitle,
  EmptyMessage,
  ErrorMessage as ErrorMessageStyled,
} from "./ChallengesPage.styles";

const ChallengesPage = () => {
  const { user } = useAuthStore();
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null,
  );
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [score, setScore] = useState<ChallengeScore | null>(null);
  const [coupleData, setCoupleData] = useState<CoupleWithUsers | null>(null);
  const [tasks, setTasks] = useState<TaskWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [active, list, couple] = await Promise.all([
        challengeService.getActiveChallenge().catch(() => null),
        challengeService.listChallenges(),
        coupleService.getMyCouple(),
      ]);
      setActiveChallenge(active);
      setChallenges(list);
      setCoupleData(couple);

      if (active) {
        const [scoreData, tasksData] = await Promise.all([
          challengeService.getChallengeScore(active.id),
          taskService.listChallengesTasks(active.id),
        ]);
        setScore(scoreData);
        setTasks(tasksData);
      }
    } catch {
      setError("Erro ao carregar desafios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateChallenge = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSuccess = () => {
    window.location.reload();
  };

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
        <ErrorMessageStyled>Carregando...</ErrorMessageStyled>
      </Container>
    );
  if (error)
    return (
      <Container>
        <ErrorMessageStyled>{error}</ErrorMessageStyled>
      </Container>
    );

  const historyChallenges = challenges.filter(
    (c) => c.status === "completed" || c.status === "cancelled",
  );

  return (
    <Container>
      <Header>
        <Title>Desafios</Title>
        {!activeChallenge && (
          <CreateButton onClick={handleCreateChallenge}>Criar</CreateButton>
        )}
      </Header>

      {activeChallenge && coupleData && (
        <ActiveChallengeCard
          challenge={activeChallenge}
          score={score}
          coupleData={coupleData}
        />
      )}

      {activeChallenge && (
        <Section>
          <Header>
            <SectionTitle>
              Tarefas
              <CreateButton onClick={handleCreateTask}>
                <Plus size={16} />
              </CreateButton>
            </SectionTitle>
          </Header>
          {taskError && <ErrorMessageStyled>{taskError}</ErrorMessageStyled>}
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
        </Section>
      )}

      <Section>
        <SectionTitle>Histórico</SectionTitle>
        {coupleData && historyChallenges.length > 0 ? (
          historyChallenges.map((challenge) => (
            <ChallengeHistoryItem
              key={challenge.id}
              challenge={challenge}
              coupleData={coupleData}
            />
          ))
        ) : (
          <EmptyMessage>Nenhum desafio concluído ou cancelado</EmptyMessage>
        )}
      </Section>

      {showModal && (
        <CreateChallengeModal
          onClose={handleCloseModal}
          onSuccess={handleModalSuccess}
        />
      )}

      {showCreateTaskModal && activeChallenge && (
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

export default ChallengesPage;
