import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import axios from 'axios';
import type { Task } from '../../../types/task.types';
import { taskService } from '../../../services/task.service';
import {
  Overlay,
  StyledEditTaskModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './EditTaskModal.styles';

const editTaskSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  points: z.string().min(1, 'Pontos são obrigatórios'),
  max_completions: z.string().optional(),
});

type EditTaskFormData = z.infer<typeof editTaskSchema>;

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSuccess: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onSuccess }) => {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      name: task.name,
      description: task.description || '',
      points: String(task.points),
      max_completions: task.max_completions ? String(task.max_completions) : '',
    },
  });

  const onSubmit = async (data: EditTaskFormData) => {
    try {
      await taskService.updateTask(task.id, {
        name: data.name,
        description: data.description,
        points: Number(data.points),
        max_completions: data.max_completions ? Number(data.max_completions) : undefined,
      });
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao atualizar tarefa');
      } else {
        setError('Erro inesperado');
      }
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledEditTaskModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Editar Tarefa</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input {...register('name')} placeholder="Nome da tarefa" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Label>
          <Label>
            Descrição
            <Input {...register('description')} placeholder="Descrição (opcional)" />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </Label>
          <Label>
            Pontos
            <Input
              {...register('points')}
              placeholder="Pontos"
              inputMode="numeric"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
            {errors.points && <ErrorMessage>{errors.points.message}</ErrorMessage>}
          </Label>
          <Label>
            Máximo de Conclusões
            <Input
              {...register('max_completions')}
              placeholder="Máximo (opcional)"
              inputMode="numeric"
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                  e.preventDefault();
                }
              }}
            />
            {errors.max_completions && <ErrorMessage>{errors.max_completions.message}</ErrorMessage>}
          </Label>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Atualizando...' : 'Atualizar Tarefa'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </StyledEditTaskModal>
    </Overlay>,
    document.body
  );
};

export default EditTaskModal;