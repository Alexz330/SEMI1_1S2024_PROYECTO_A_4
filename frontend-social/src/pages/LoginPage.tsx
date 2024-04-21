import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Button,CssBaseline,TextField,Grid, Box, Typography, Container} from "@mui/material";
import { Link } from 'react-router-dom';
import { loginUserApi } from '../api/user';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { useAuth } from '../context/auth';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="">
        Cloud Social
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function LoginPage() {


  const auth = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log();


    try {
      const res = await loginUserApi({
        email: data.get('email')?.toString() || "",
        password: data.get('password')?.toString() || "",
      });
      console.log(res);
      // Mostrar alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Login successful",
        text: "",
      }).then(() => {
     
        console.log(res);
        
        let token = res.token || '';
        // setToken(token);
        // navigate("/perfil");
        
        auth.login(token)
      });
    } catch (error) {
      console.error("Error:", error);
      // Mostrar alerta de error
      Swal.fire({
        icon: "error" as SweetAlertIcon, // Asegurarse de que el icono sea del tipo SweetAlertIcon
        title: "Login failed",
        text:  error as string, // Obtener el mensaje de error o convertir el error a una cadena JSON
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
          }}
        >
          <img 
            src="https://img.squadhelp.com/story_images/visual_images/1700777636-CloudSocial1.png?class=show" 
            alt="Logo"
            style={{ width: 150, height: 100, marginBottom: 20 }} // Estilos aplicados aquí
          />
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="h5" >
              Cloud - Social
            </Typography>
            <CloudCircleOutlined />
          </Box> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
