import { VITE_PORT_BACKEND, VITE_URL_BACKEND } from "../constants/api";
import { CreatePublication, Publication } from "../interfaces/publication";

const createPublicationApi = async (token: string,publication:CreatePublication) => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/publication/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(publication)
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();

    return data.id;
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error devolviendo un valor predeterminado o lanzando una excepción
    throw error; // O puedes devolver un valor predeterminado como 'null' o 'undefined'
  }
};


const getMyPublicationsApi = async (token:string):Promise<Publication[]>=>{
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/publication/get-publications-by-user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data:Publication[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error devolviendo un valor predeterminado o lanzando una excepción
    throw error; // O puedes devolver un valor predeterminado como 'null' o 'undefined'
  }
}

///api/publication/get-publications-by-friends

const getPublicationsByFriends = async (token:string):Promise<Publication[]> => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/publication/get-publications-by-friends`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data:Publication[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error devolviendo un valor predeterminado o lanzando una excepción
    throw error; // O puedes devolver un valor predeterminado como 'null' o 'undefined'
  }
};

export { createPublicationApi,getMyPublicationsApi,getPublicationsByFriends };
