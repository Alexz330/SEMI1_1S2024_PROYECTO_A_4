import { ChangeEvent, useState } from "react";
import { Publication } from "../interfaces/publication";
import { getToken } from "../utils/token";
import { getMyPublicationsApi, getPublicationsByFriends } from "../api/publication";

export const usePublication = () => {
  const [content, setContent] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [myPublications,setMypublications] = useState<Publication[]>([]);
  const [publicationsFriends, setPublicationsFriens] = useState<Publication[]>([]);
  const [loading,setLoading] = useState(false)

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader?.result) {
        setPhotoPreview(reader?.result as string);
        const base64String = (reader.result as string).split(",")[1];
        setPhotoBase64(base64String);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getMyPublications = async () =>{

    const token = getToken() || '';
    const publications:Publication[] =  await getMyPublicationsApi(token);
    setLoading(true);

    setMypublications(publications);
    setLoading(false);
  }

  const getPublicationsFriends = async () =>{

    const token = getToken() || '';
    const publications:Publication[] =  await getPublicationsByFriends(token);
    setLoading(true);

    setPublicationsFriens(publications);
    setLoading(false);
  }

  const reset = () => {
    setPhotoBase64("");
    setContent("");
    setPhotoPreview("");
  };

  return {
    content,
    photoBase64,
    photoPreview,
    handleContentChange,
    handlePhotoChange,
    reset,
    myPublications,
    getMyPublications,
    loading,
    getPublicationsFriends,
    publicationsFriends
  };
};
