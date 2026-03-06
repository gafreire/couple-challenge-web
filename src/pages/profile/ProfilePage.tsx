import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Save, User, LogOut, ChevronRight } from 'lucide-react';
import { userService } from '../../services/user.service';
import { useAuthStore } from '../../store/authStore';
import type { UserProfile, UpdateProfileData } from '../../types/user.types';
import {
  Container, AvatarSection, AvatarWrapper, Avatar, UserName, UserStats,
  Card, CardTitle, Form, Label, Input, SaveButton,
  LogoutRow, LogoutButton, LogoutLeft,
  SuccessMessage, ErrorMessage,
} from './ProfilePage.styles';

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  profile_picture: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { setAuth, logout } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await userService.getProfile();
        setProfile(profileData);
        reset({
          name: profileData.name,
          profile_picture: profileData.profile_picture || '',
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Erro ao carregar perfil');
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updateData: UpdateProfileData = {
        name: data.name,
        profile_picture: data.profile_picture || null,
      };
      const updatedProfile = await userService.updateProfile(updateData);
      setProfile(updatedProfile);
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        setAuth(
          {
            id: updatedProfile.id,
            name: updatedProfile.name,
            email: updatedProfile.email,
            couple_id: updatedProfile.couple_id,
          },
          currentToken,
        );
      }
      setSuccessMessage('Perfil atualizado com sucesso!');
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao atualizar perfil');
      } else {
        setError('Erro desconhecido');
      }
      setSuccessMessage(null);
    }
  };

  if (loading) return <Container><ErrorMessage>Carregando...</ErrorMessage></Container>;
  if (error && !profile) return <Container><ErrorMessage>{error}</ErrorMessage></Container>;

  const avatarContent = profile?.profile_picture ? '' : profile?.name.charAt(0).toUpperCase();

  return (
    <Container>
      <AvatarSection>
        <AvatarWrapper>
          <Avatar $imageUrl={profile?.profile_picture}>{avatarContent}</Avatar>
        </AvatarWrapper>
        <UserName>{profile?.name}</UserName>
        <UserStats>
          <span>{profile?.email}</span>
        </UserStats>
      </AvatarSection>

      <Card>
        <CardTitle><User size={16} color="#E63946" /> Editar Perfil</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input {...register('name')} placeholder="Seu nome" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Label>
          <Label>
            Foto de Perfil (URL)
            <Input
              {...register('profile_picture')}
              placeholder="URL da foto (opcional)"
            />
            {errors.profile_picture && (
              <ErrorMessage>{errors.profile_picture.message}</ErrorMessage>
            )}
          </Label>
          <SaveButton type="submit" disabled={isSubmitting}>
            <Save size={15} />
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </SaveButton>
        </Form>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>

      {/* Sair — apenas mobile */}
      <LogoutRow>
        <LogoutButton onClick={logout}>
          <LogoutLeft>
            <LogOut size={16} />
            Sair da conta
          </LogoutLeft>
          <ChevronRight size={16} />
        </LogoutButton>
      </LogoutRow>
    </Container>
  );
};

export default ProfilePage;