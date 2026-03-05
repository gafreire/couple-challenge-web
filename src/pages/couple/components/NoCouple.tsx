import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Send, Shield } from 'lucide-react';
import { coupleService } from '../../../services/couple.service';
import {
  Container,
  Card,
  EmojiWrapper,
  Title,
  Subtitle,
  Form,
  InputWrapper,
  InputIcon,
  Input,
  Button,
  SecurityNote,
  ErrorMessage,
} from './NoCouple.styles';

const NoCouple: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      await coupleService.createCouple(email.trim());
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao enviar convite');
      } else {
        setError('Erro inesperado ao enviar convite');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <EmojiWrapper>🧡‍🔥</EmojiWrapper>

        <Title>Convidar seu parceiro</Title>
        <Subtitle>Digite o e-mail do seu parceiro para começar a competir!</Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputIcon><Mail size={15} /></InputIcon>
            <Input
              type="email"
              placeholder="email@parceiro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading || !email.trim()}>
            <Send size={15} />
            {isLoading ? 'Enviando...' : 'Convidar'}
          </Button>
        </Form>

        <SecurityNote>
          <Shield size={11} /> Seus dados estão protegidos
        </SecurityNote>
      </Card>
    </Container>
  );
};

export default NoCouple;