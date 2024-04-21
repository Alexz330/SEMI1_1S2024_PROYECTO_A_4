import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Avatar,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Publication as P } from "../../interfaces/publication";
import { convertTextToAudio, getImageLabels, translateText } from "../../api/aws";

export const Publication: React.FC<P> = ({
  content,
  photoUrl,

  created_at,
  author,
}) => {
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [imageLabels, setImageLabels] = useState<string[]>([]);

  const translateContent = async () => {
    try {
      const translations = await translateText(content);
      if (translations[selectedLanguage]) {
        setTranslatedContent(translations[selectedLanguage]);
      }
    } catch (error) {
      console.error("Error translating content:", error);
    }
  };

  const convertTextToAudioHandler = async () => {
 
      const audioBase64 = await convertTextToAudio(translatedContent || content);
      const audio = new Audio("data:audio/mp3;base64," + audioBase64);
      audio.play();
  
  };

  const getImageLabelsHandler = async () => {
    try {
      const labels = await getImageLabels(photoUrl);
      setImageLabels(labels);
    } catch (error) {
      console.error("Error getting image labels:", error);
    }
  };

  // Translate content and get image labels when component mounts
  useEffect(() => {
    translateContent();
    getImageLabelsHandler();
  }, []);

  // Translate content when selected language changes
  useEffect(() => {
    translateContent();
  }, [selectedLanguage]);

  if (!author) {
    return (
      <Card sx={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Idioma original: {content}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Traducción: {translatedContent || content}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publicado el: {created_at}
          </Typography>
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as string)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="it">Italiano</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
          <Button variant="outlined" onClick={convertTextToAudioHandler}>
            <VolumeUpIcon />
          </Button>
          <div style={{ marginTop: '10px' }}>
          <Typography variant="h6" gutterBottom>
         Etiquietas
        </Typography>
            {imageLabels.map((label, index) => (
              <Chip key={index} label={label} style={{ marginRight: '5px', marginBottom: '5px' }} />
            ))}
          </div>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${photoUrl}.jpg`}
          alt="Publication Photo"
        />
      </Card>
    );
  }

  return (
    <Card sx={{ marginBottom: "20px" }}>
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          {author.photos && author.photos.length > 0 && (
            <Avatar
              alt={`${author.name} ${author.lastname}`}
              src={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${author.photos[0].id}.jpg`}
            />
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "10px" }}
          >
            Publicado por: {author.name} {author.lastname} el {created_at}
          </Typography>

          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as string)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="it">Italiano</MenuItem>
            <MenuItem value="fr">Français</MenuItem>
          </Select>
        </div>
        <Typography variant="h6" gutterBottom>
          Idioma original: {content}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Traducción: {translatedContent || content}
        </Typography>
        <Button variant="outlined" onClick={convertTextToAudioHandler}>
          <VolumeUpIcon />
        </Button>
        <div style={{ marginTop: '10px' }}>
        <Typography variant="h6" gutterBottom>
         Etiquietas
        </Typography>
          {imageLabels.map((label, index) => (
            <Chip key={index} label={label} style={{ marginRight: '5px', marginBottom: '5px' }} />
          ))}
        </div>
      </CardContent>
      <CardMedia
        component="img"
        height="140"
        image={`https://practicassemi1.s3.amazonaws.com/Publicaciones/${photoUrl}.jpg`}
        alt="Publication Photo"
      />
    </Card>
  );
};