import { type FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import axios from 'axios';
import { challengeService } from '../../../services/challenge.service';
import {
  Overlay,
  StyledCreateChallengeModal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
} from './CreateChallengeModal.styles';

const createChallengeSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  start_date: z.string().min(1, 'Data de início é obrigatória'),
  end_date: z.string().min(1, 'Data de fim é obrigatória'),
  period_type: z.enum(['mensal', 'trimestral', 'semestral', 'anual'] as const),
}).refine((data) => new Date(data.end_date) > new Date(data.start_date), {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['end_date'],
});

type CreateChallengeForm = z.infer<typeof createChallengeSchema>;

interface CreateChallengeModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateChallengeModal: FC<CreateChallengeModalProps> = ({ onClose, onSuccess }) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChallengeForm>({
    resolver: zodResolver(createChallengeSchema),
  });

  const onSubmit = async (data: CreateChallengeForm) => {
    setApiError(null);
    try {
      await challengeService.createChallenge(data.name, data.start_date, data.end_date, data.period_type);
      onSuccess();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.error || 'Erro ao criar desafio. Tente novamente.');
      } else {
        setApiError('Erro ao criar desafio. Tente novamente.');
      }
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <StyledCreateChallengeModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Criar Desafio</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input {...register('name')} placeholder="Nome do desafio" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Label>

          <Label>
            Data de Início
            <Input {...register('start_date')} type="date" />
            {errors.start_date && <ErrorMessage>{errors.start_date.message}</ErrorMessage>}
          </Label>

          <Label>
            Data de Fim
            <Input {...register('end_date')} type="date" />
            {errors.end_date && <ErrorMessage>{errors.end_date.message}</ErrorMessage>}
          </Label>

          <Label>
            Período
            <Select {...register('period_type')}>
              <option value="mensal">Mensal</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
              <option value="anual">Anual</option>
            </Select>
            {errors.period_type && <ErrorMessage>{errors.period_type.message}</ErrorMessage>}
          </Label>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Desafio'}
          </SubmitButton>

          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
        </Form>
      </StyledCreateChallengeModal>
    </Overlay>,
    document.body
  );
};

export default CreateChallengeModal;