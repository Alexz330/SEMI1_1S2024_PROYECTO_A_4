import { useEffect } from "react";
import { usePublication } from "../hooks/usePublication";
import { Publications } from "../components/publications";
import { Container, CircularProgress, Box, Typography } from "@mui/material";
import { Assignment } from "@mui/icons-material"; // Icono de "Assignment"
import Sally from "../assets/Saly-12.svg";

export const MyPublicationsPage = () => {
  const { myPublications, getMyPublications, loading } = usePublication();

  useEffect(() => {
    getMyPublications();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "20px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Assignment sx={{ fontSize: "2rem", marginRight: "10px" }} />
            <Typography variant="h5">Mis Publicaciones</Typography>
            <br />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              
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
            <Box
              sx={{
                flex: 1,
                overflowY: 'scroll', // Agrega desbordamiento vertical
                height:'50vh'
              }}
            >
              <Publications publications={myPublications} />
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};
