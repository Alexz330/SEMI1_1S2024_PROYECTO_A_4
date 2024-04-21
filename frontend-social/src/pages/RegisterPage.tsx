import * as React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resgisterApi } from '../api/user'; // Importa el servicio registerApi aquí
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="">
        Social Cloud
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function RegisterPage() {
  const [photoBase64, setPhotoBase64] = React.useState<string>('');
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        setPhotoBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userRegister = {
      name: data.get('firstName') as string,
      lastname: data.get('lastName') as string,
      username: data.get('userName') as string, // Debes establecer el nombre de usuario si lo tienes
      password: data.get('password') as string,
      email: data.get('email') as string,
      photoBase64: photoBase64,
    };
    try {
      await resgisterApi(userRegister);
      // Mostrar notificación de éxito
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado exitosamente',
      });
      // Redireccionar al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Mostrar notificación de error
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario',
        text: 'Ocurrió un error al intentar registrar el usuario. Por favor, inténtalo de nuevo más tarde.',
      });
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
            src="https://img.squadhelp.com/story_images/visual_images/1700777636-CloudSocial1.png?class=show" 
            alt="Logo"
            style={{ width: 150, height: 100, marginBottom: 20 }} // Estilos aplicados aquí
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User name"
                  name="userName"
                  autoComplete="userName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
  
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
                <label htmlFor="photo">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Select Photo
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
