import { useAuth } from "../context/auth";
import { Typography, Paper, Avatar, Box, Button } from "@mui/material";
import {
  AccountCircle,
  Email,
  CalendarToday,
  Update,
  VerifiedUser,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getToken } from "../utils/token";
import { useUser } from "../hooks/useUser";
import Sally from "../assets/Saly-19.svg";
import { User } from "../interfaces";
import { getFriendsUser } from "../api/user";
import { Link } from "react-router-dom";

export const PerfilPage = () => {
  const auth = useAuth();
  const { user } = auth;

  if (!user) {
    // Si el usuario no está definido, puedes mostrar un mensaje de carga o redireccionar a la página de inicio de sesión
    return <div>Cargando...</div>;
  }

  const { getProfilePic, picProfile } = useUser();
  const [friends, setFriends] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken() || "";
        await getProfilePic(token);
      } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error);
      }
    };

    (async () => {
      await fetchData();
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken() || "";

        const data = await getFriendsUser(token);

        setFriends(data);
      } catch (error) {
        console.error(
          "Error al obtener la imagen de perfil o la lista de amigos:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <img
          src="https://img.squadhelp.com/story_images/visual_images/1700777636-CloudSocial1.png?class=show"
          alt="Logo"
          style={{ width: 150, height: 100 }} // Estilos aplicados aquí
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Paper
            elevation={3}
            style={{ padding: "20px" }}
            sx={{ display: "flex" }}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                <VerifiedUser color="primary" /> Perfil de Usuario
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Nombre:{" "}
                {user.name || "Nombre no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Apellido:{" "}
                {user.lastname || "Apellido no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Nombre de usuario:{" "}
                {user.username || "Nombre de usuario no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <Email color="primary" /> Email:{" "}
                {user.email || "Email no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <VerifiedUser color="primary" /> Estado:{" "}
                {user.isActive ? "Activo" : "Inactivo"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <CalendarToday color="primary" /> Fecha de creación:{" "}
                {user.created_at || "Fecha de creación no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <Update color="primary" /> Última actualización:{" "}
                {user.updated_at || "Última actualización no disponible"}
              </Typography>
              <Typography
                variant="h5"
                display="flex"
                alignItems="center"
                gutterBottom
                sx={{ marginTop: 2 }}
              >
                Amigos:
              </Typography>
              {/* Mostrar lista de amigos */}
              {friends?.map((friend) => (
                <Paper
                  key={friend.id}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt={`${friend.name} ${friend.lastname}`}
                    src={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${friend.photos[0].id}.jpg`} // Agrega la URL de la imagen de perfil aquí
                    sx={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Nombre: {friend.name || "Nombre no disponible"} -{" "}
                    {friend.lastname}
                  </Typography>
                  {/* Envuelve el Link dentro de un Button */}
                  <Button
                    component={Link}
                    to={`/perfil/${friend.id}`}
                    variant="contained"
                    color="primary"
                    sx={{
                      marginLeft:2
                    }}
                  >
                    Ver perfil
                  </Button>
                </Paper>
              ))}
            </Box>
            <Box>
              <Avatar
                alt={`${user.name} ${user.lastname}`}
                src={picProfile || ""} // Agrega la URL de la imagen de perfil aquí
                sx={{ width: 150, height: 150, marginLeft: 10 }}
              />
            </Box>
          </Paper>
        </Box>
        <Box>
          <Box
            sx={{
              marginTop: -20,
            }}
          >
            <img
              src={Sally}
              className="App-logo"
              alt="logo"
              height={600}
              width={600}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
