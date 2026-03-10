import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import axios from 'axios';
import { taskService } from '../../../services/task.service';
import type { CoupleWithUsers } from '../../../types/couple.types';
import {
  Overlay,
  StyledCreateTaskModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
} from './CreateTaskModal.styles';
import { Select } from './CreateChallengeModal.styles';

const createTaskSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  points: z.string().min(1, 'Pontos são obrigatórios'),
  max_completions: z.string().optional(),
  assignee: z.enum(['user_1', 'user_2', 'both']),
});

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

interface CreateTaskModalProps {
  challengeId: string;
  coupleData: CoupleWithUsers;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ challengeId, coupleData, onClose, onSuccess }) => {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      assignee: 'both',
    },
  });

  const assigneeOptions = [
    { value: 'both', label: 'Ambos' },
    { value: 'user_1', label: coupleData.user_1.name.split(' ')[0] },
    { value: 'user_2', label: coupleData.user_2?.name.split(' ')[0] || 'Parceiro' },
  ];

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await taskService.createTask({
        challenge_id: challengeId,
        name: data.name,
        description: data.description,
        points: Number(data.points),
        max_completions: data.max_completions ? Number(data.max_completions) : undefined,
        assignee: data.assignee,
      });
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao criar tarefa');
      } else {
        setError('Erro inesperado');
      }
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledCreateTaskModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Criar Tarefa</ModalTitle>
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
          <Label>
            Quem pode concluir
            <Select {...register('assignee')}>
              {assigneeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
            {errors.assignee && <ErrorMessage>{errors.assignee.message}</ErrorMessage>}
          </Label>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Tarefa'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </StyledCreateTaskModal>
    </Overlay>,
    document.body
  );
};

export default CreateTaskModal;