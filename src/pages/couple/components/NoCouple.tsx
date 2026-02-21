import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Button, Container, ErrorMessage, Form, Icon, Input, Subtitle, Title } from './NoCouple.styles';
import { coupleService } from '../../../services/couple.service';

const createCoupleSchema = z.object({
  email: z.string().email('Email inválido'),
});

type CreateCoupleFormData = z.infer<typeof createCoupleSchema>;

const NoCouple  = () => {
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCoupleFormData>({
    resolver: zodResolver(createCoupleSchema),
  });

  const onSubmit = async (data: CreateCoupleFormData) => {
    try {
      setError('');
      await coupleService.createCouple(data.email);
      window.location.reload()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao criar casal');
      } else {
        setError('Erro inesperado, tente novamente');
      }
    }
  };

  return (
    <Container>
        <Icon>💏</Icon>
        <Title>Convide seu parceiro</Title>
        <Subtitle>Digite o email do seu parceiro para criar um casal</Subtitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Convidando...' : 'Convidar'}
          </Button>
        </Form>

    </Container>
  );
};

export default NoCouple ;