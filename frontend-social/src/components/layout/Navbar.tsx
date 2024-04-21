import {
  Autocomplete,
  Avatar,
  Badge,
  CssBaseline,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { FC, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { getToken } from "../../utils/token";
import { User } from "../../interfaces";
import { Link, useNavigate } from "react-router-dom";
import { getUserQuery } from "../../api/user";
import { useAuth } from "../../context/auth";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: FC<NavbarProps> = ({ open, setOpen }) => {
  const [_, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado para manejar el menú desplegable
  const { getProfilePic, picProfile } = useUser();
  const { logout } = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };

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

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    const data = await getUserQuery(query);
    setSearchResults(data);
  };

  // Función para abrir el menú desplegable
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú desplegable
  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            <span style={{ marginLeft: "10px", marginRight: "10px" }}>
              Cloud Social
            </span>

            <Autocomplete
              disablePortal
              options={searchResults}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Link to={`/perfil/${option.id}`} style={{ textDecoration: 'none' }}>
                  <ListItem {...props} >
                    <ListItemAvatar>
                      {option.photos && option.photos.length > 0 && option.photos[0] && (
                        <Avatar
                          alt={`${option.name} ${option.lastname}`}
                          src={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${option.photos[0].id}.jpg`}
                        />
                      )}
                    </ListItemAvatar>
                    <ListItemText primary={option.name} secondary={option.lastname} />
                  </ListItem>
                </Link>
              )}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar personas..."
                  onChange={handleSearchChange}
                  variant="filled" 
                />
              )}
            />
          </Typography>
          {/* Campo de búsqueda */}

          <IconButton color="inherit" onClick={handleMenuOpen}>
            {picProfile ? (
              <Avatar alt="Profile Picture" src={picProfile} />
            ) : (
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            )}
          </IconButton>

          {/* Menú desplegable */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('/perfil') }>Perfil</MenuItem>
          
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem> {/* Opción de cerrar sesión */}
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
