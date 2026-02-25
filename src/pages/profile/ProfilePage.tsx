import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { userService } from "../../services/user.service";
import { useAuthStore } from "../../store/authStore";
import type { UserProfile, UpdateProfileData } from "../../types/user.types";
import {
  Container,
  AvatarSection,
  Avatar,
  UserName,
  UserEmail,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  SaveButton,
  SuccessMessage,
  ErrorMessage,
} from "./ProfilePage.styles";

const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  profile_picture: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { setAuth } = useAuthStore();
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
          profile_picture: profileData.profile_picture || "",
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Erro ao carregar perfil");
        } else {
          setError("Erro desconhecido");
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
      const currentToken = localStorage.getItem("token");
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
      setSuccessMessage("Perfil atualizado com sucesso!");
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao atualizar perfil");
      } else {
        setError("Erro desconhecido");
      }
      setSuccessMessage(null);
    }
  };

  if (loading) return <Container>Carregando...</Container>;
  if (error && !profile)
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );

  const avatarContent = profile?.profile_picture
    ? ""
    : profile?.name.charAt(0).toUpperCase();

  return (
    <Container>
      <AvatarSection>
        <Avatar $imageUrl={profile?.profile_picture}>{avatarContent}</Avatar>
        <UserName>{profile?.name}</UserName>
        <UserEmail>{profile?.email}</UserEmail>
      </AvatarSection>

      <Card>
        <CardTitle>Editar Perfil</CardTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Nome
            <Input {...register("name")} placeholder="Seu nome" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </Label>
          <Label>
            Foto de Perfil (URL)
            <Input
              {...register("profile_picture")}
              placeholder="URL da foto (opcional)"
            />
            {errors.profile_picture && (
              <ErrorMessage>{errors.profile_picture.message}</ErrorMessage>
            )}
          </Label>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </SaveButton>
        </Form>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>
    </Container>
  );
};

export default ProfilePage;
