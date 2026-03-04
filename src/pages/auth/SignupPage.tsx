import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
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

const signupSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError('');
      const response = await authService.signup(data.name, data.email, data.password);
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao fazer cadastro');
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
          <CardTitle>Criar nova conta</CardTitle>
          <CardSubtitle>Comece sua jornada hoje mesmo.</CardSubtitle>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <InputIcon><User size={15} /></InputIcon>
            <Input
              type="text"
              placeholder="Seu nome"
              {...register('name')}
            />
          </InputWrapper>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <InputWrapper>
            <InputIcon><Mail size={15} /></InputIcon>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              {...register('email')}
            />
          </InputWrapper>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <InputWrapper>
            <InputIcon><Lock size={15} /></InputIcon>
            <Input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register('password')}
            />
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : <>Cadastrar <ArrowRight size={16} /></>}
          </Button>
        </Form>
      </Card>

      <SignupLink>
        Já tem uma conta? <Link to="/login">Entre agora</Link>
      </SignupLink>
    </Container>
  );
};

export default SignupPage;