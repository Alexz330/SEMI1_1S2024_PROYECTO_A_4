import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../interfaces";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import {
  AccountCircle,
  CalendarToday,
  Email,
  Update,
  VerifiedUser,
  PersonAdd,
} from "@mui/icons-material";
import Sally from "../assets/Saly-31.svg";
import { useAuth } from "../context/auth";
import { addFriend, checkAreFriends, getUserById } from "../api/user";
import { getToken } from "../utils/token";
import Swal from "sweetalert2";

export const OtherPerilPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const { user: userCurrent } = auth;
  const [areFriends, setAreFriends] = useState<boolean>(false);

  if (user?.id == userCurrent?.id) {
    navigate("/perfil");
  }

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getUserById(id);
        setUser(data);
      }
    })();
  }, [id]);

  const handleAreFriend = async () => {
    if(user){
      const token = getToken() || "";
      const data = await checkAreFriends(token, user?.id);
      // console.log(data);
  
      setAreFriends(data.areFriends);
    }

  };
  useEffect(() => {
 
      (async () => {
        handleAreFriend()
      })();
 
  }, [user]);

  const handleAddFriend = async () => {
    try {
      // Solo permite agregar como amigo si no son amigos
      if (!areFriends) {
        const token = getToken() || "";
        if (user?.id) {
          await addFriend(token, user?.id);
          console.log("Amigo agregado: ", user?.id);
          // Muestra una alerta de éxito si se agrega el amigo correctamente
          Swal.fire({
            icon: "success",
            title: "¡Amigo agregado!",
            text: `Ahora eres amigo de ${user?.name} ${user?.lastname}`,
          });
          handleAreFriend()
        }
      } else {
        console.log("Ya son amigos");
        // Muestra una alerta indicando que ya son amigos
        Swal.fire({
          icon: "info",
          title: "Ya son amigos",
          text: `Ya eres amigo de ${user?.name} ${user?.lastname}`,
        });
      }
    } catch (error) {
      console.error("Error al agregar amigo:", error);
      // Muestra una alerta de error si ocurre algún problema al agregar el amigo
      Swal.fire({
        icon: "error",
        title: "Error al agregar amigo",
        text: "Ha ocurrido un error al intentar agregar el amigo. Por favor, intenta de nuevo más tarde.",
      });
    }
  };

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
                <VerifiedUser color="primary" />{" "}
                {user?.name || "Nombre no disponible"} -{" "}
                {user?.lastname || "Apellido no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Nombre:{" "}
                {user?.name || "Nombre no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Apellido:{" "}
                {user?.lastname || "Apellido no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <AccountCircle color="primary" /> Nombre de usuario:{" "}
                {user?.username || "Nombre de usuario no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <Email color="primary" /> Email:{" "}
                {user?.email || "Email no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <VerifiedUser color="primary" /> Estado:{" "}
                {user?.isActive ? "Activo" : "Inactivo"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <CalendarToday color="primary" /> Fecha de creación:{" "}
                {user?.created_at || "Fecha de creación no disponible"}
              </Typography>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <Update color="primary" /> Última actualización:{" "}
                {user?.updated_at || "Última actualización no disponible"}
              </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={handleAddFriend}
                disabled={areFriends} // Deshabilita el botón si ya son amigos
              >
                {areFriends ? "Ya son amigos" : "Agregar Amigo"}
              </Button>
            </Box>
            <Box>
              <Avatar
                alt={`${user?.name} ${user?.lastname}`}
                src={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${user?.photos[0]?.id}.jpg`} // Agrega la URL de la imagen de perfil aquí
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
