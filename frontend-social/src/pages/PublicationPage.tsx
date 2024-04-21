import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material"; // Importa el icono de la cámara
import { usePublication } from "../hooks/usePublication";
import { createPublicationApi } from "../api/publication";
import { getToken } from "../utils/token";
import Swal from "sweetalert2";
import { Publications } from "../components/publications";
import { useEffect } from "react";


export const PublicationPage = () => {
    const {
      content,
      photoBase64,
      photoPreview,
      handleContentChange,
      handlePhotoChange,
      reset,
      publicationsFriends,
      getPublicationsFriends
    } = usePublication();
    
    useEffect(() => {
      getPublicationsFriends();
    }, []);
  
    const handleSubmit = async () => {
        const token = getToken() || '';
        try {
          await createPublicationApi(token, { content, photoBase64 });
          Swal.fire({
            icon: 'success',
            title: 'Publicación exitosa',
            text: 'Tu publicación ha sido creada correctamente.',
          });
          reset()
        } catch (error) {
          console.error('Error al crear la publicación:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear la publicación. Por favor, inténtalo de nuevo.',
          });
        }
        
    };

   
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Crear una nueva publicación
          </Typography>
          <TextField
            label="Contenido"
            multiline
            rows={1}
            fullWidth
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            style={{ marginBottom: "20px" }}
          />
          <input
            type="file"
            accept="image/*"
            id="photo-input"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label htmlFor="photo-input">
              <IconButton component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "20px",
                  marginRight: "10px",
                }}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={(content === '' || photoPreview === '')} // Deshabilita el botón si no hay contenido
            >
              Publicar
            </Button>
          </Box>
        </Paper>
        <br />
        <Typography variant="h5" gutterBottom>
            Publicaciones de mis amigos
          </Typography>
        <Box
              sx={{
                flex: 1,
                overflowY: 'scroll', // Agrega desbordamiento vertical
                height:'50vh'
              }}
            >
              <Publications publications={publicationsFriends} />
            </Box>
      </Container>
    );
  };