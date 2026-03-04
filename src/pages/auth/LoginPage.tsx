import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import {
  Container,
  LogoWrapper,
  LogoIcon,
  LogoText,
  Tagline,
  Card,
  CardTitle,
  CardSubtitle,
  Form,
  InputWrapper,
  InputIcon,
  Input,
  Button,
  ErrorMessage,
  SignupLink,
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
      <LogoWrapper>
        <LogoIcon>🤍</LogoIcon>
        <LogoText>Couple<span>Challenge</span></LogoText>
        <Tagline>Transforme sua rotina em uma competição divertida.</Tagline>
      </LogoWrapper>

      <Card>
        <div>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardSubtitle>Entre para continuar seus desafios</CardSubtitle>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputIcon><Mail size={15} /></InputIcon>
            <Input
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
            />
          </InputWrapper>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <InputWrapper>
            <InputIcon><Lock size={15} /></InputIcon>
            <Input
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
          </InputWrapper>
          {/* <ForgotPassword>Esqueceu a senha?</ForgotPassword> */}
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : <>Entrar <ArrowRight size={16} /></>}
          </Button>
        </Form>
      </Card>

      <SignupLink>
        Não tem uma conta? <Link to="/signup">Cadastre-se agora</Link>
      </SignupLink>
    </Container>
  );
};

export default LoginPage;