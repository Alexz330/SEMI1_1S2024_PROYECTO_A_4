import { LoginUserData, User } from "../interfaces";
import { VITE_PORT_BACKEND, VITE_URL_BACKEND } from "../constants/api";

const loginUserApi = async (userData: LoginUserData): Promise<any> => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();

    return data;
    // Aquí puedes manejar la respuesta del servidor
  } catch (error) {
    throw error;
  }
};

const resgisterApi = async (userRegister:RegisterUser )=>{
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      }
    );

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();

    return data;
    // Aquí puedes manejar la respuesta del servidor
  } catch (error) {
    throw error;
  }
}

const getMeUserApi = async (token: string): Promise<User> => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/getMe`,
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

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error devolviendo un valor predeterminado o lanzando una excepción
    throw error; // O puedes devolver un valor predeterminado como 'null' o 'undefined'
  }
};

const getCurrentPicProfile = async (token: string): Promise<User> => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/get_photo_profile`,
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

    const data = await response.json();

    return data.id;
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error devolviendo un valor predeterminado o lanzando una excepción
    throw error; // O puedes devolver un valor predeterminado como 'null' o 'undefined'
  }
};

const checkAreFriends = async (token: string, idFriend: string) => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/validated-friend/${idFriend}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al verificar si son amigos:", error);
  }
};

const getUserById = async (id: string) => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/${id}`
    );
    if (!response.ok) {
      throw new Error("Usuario no encontrado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
  }
};

const getUserQuery = async (query: string) => {
  try {
    // Realizar una solicitud al backend para obtener resultados de búsqueda predictiva
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/search?query=${query}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
  }
};

const addFriend = async (token: string, idFriend: string) => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/friends/${idFriend}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al agregar amigo");
    }

    const data = await response.json();

    return data;
    // Aquí puedes manejar la respuesta del servidor
  } catch (error) {
    throw error;
  }
};

const getFriendsUser = async (token: string): Promise<User[]> => {
  try {
    const response = await fetch(
      `${VITE_URL_BACKEND}:${VITE_PORT_BACKEND}/api/user/friends/get_friends_user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al verificar si son amigos:", error);
    throw error;
  }
};

export {
  loginUserApi,
  resgisterApi,
  getMeUserApi,
  getCurrentPicProfile,
  checkAreFriends,
  getUserById,
  getUserQuery,
  addFriend,
  getFriendsUser,
};
