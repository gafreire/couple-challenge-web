import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import {
  Container,
  Logo,
  Card,
  Form,
  Input,
  Button,
  ErrorMessage,
  SignupLink
} from './LoginPage.styles';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      const response = await authService.login(data.email, data.password);
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao fazer login');
      } else {
        setError('Erro inesperado, tente novamente');
      }
    }
  };

  return (
    <Container>
      <Logo>Couple Challenge</Logo>
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>

        <SignupLink>
          Não tem conta? <Link to="/signup">Cadastre-se</Link>
        </SignupLink>
      </Card>
    </Container>
  );
};

export default LoginPage;