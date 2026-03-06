import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2 } from 'lucide-react';
import axios from 'axios';
import { taskService } from '../../../services/task.service';
import type { Task } from '../../../types/task.types';
import {
  Overlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Body,
  Description,
  TaskName,
  ButtonRow,
  CancelButton,
  DeleteButton,
  ErrorMessage,
} from './DeleteTaskModal.styles';

interface DeleteTaskModalProps {
  task: Task;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');
    try {
      await taskService.deleteTask(task.id);
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao deletar tarefa');
      } else {
        setError('Erro inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Deletar Tarefa</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <Body>
          <Description>Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita.</Description>
          <TaskName>{task.name}</TaskName>
        </Body>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonRow>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <DeleteButton onClick={handleDelete} disabled={isLoading}>
            <Trash2 size={14} style={{ marginRight: 6, display: 'inline' }} />
            {isLoading ? 'Deletando...' : 'Deletar'}
          </DeleteButton>
        </ButtonRow>
      </Modal>
    </Overlay>,
    document.body
  );
};

export default DeleteTaskModal;