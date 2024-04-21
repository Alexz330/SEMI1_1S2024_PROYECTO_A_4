import { useState } from "react";

import {  getMeUserApi, getCurrentPicProfile } from "../api/user";
import { User } from "../interfaces";

export function useUser() {

  const [loading, setLoading] = useState<boolean|null>(null);
  const [error, setError] = useState<unknown>(null);
  const [picProfile, setPicProfile] = useState<string|null>(null); 

  const getMe = async (token:string) => {
    try {

      const response:User = await getMeUserApi(token);
      
      return response;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const getProfilePic = async (token:string) =>{
    try {
     
      setLoading(true)
      const profilePicId = await getCurrentPicProfile(token);
      // Convierte el binario a una URL de datos para mostrar la imagen
      const profilePicUrl = `https://practicassemi1.s3.amazonaws.com/Publicaciones/${profilePicId}.jpg`;
      setPicProfile(profilePicUrl);
      setLoading(false)
    } catch (error) {
      setError(false);
      setLoading(false)
    }
  }
  return{
    loading,
    error,
    getMe,
    getProfilePic,
    picProfile
  }

}
