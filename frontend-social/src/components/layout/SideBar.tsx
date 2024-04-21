import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemAvatar } from '@mui/material';
import { AccountCircle, Description, PeopleAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Importa el componente Link

interface SideProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<SideProps> = ({ open, setOpen }) => {

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Utiliza el componente Link para crear enlaces */}
        <ListItemButton component={Link} to="/perfil">
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Perfil" />
        </ListItemButton>
        <ListItemButton component={Link} to="/publication-me">
          <ListItemAvatar>
            <Avatar>
              <Description />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Mis Publicaciones" />
        </ListItemButton>
        <ListItemButton component={Link} to="/publication">
          <ListItemAvatar>
            <Avatar>
              <PeopleAlt />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Publicaciones de amigos" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
