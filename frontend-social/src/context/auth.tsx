import { createContext, useEffect, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getToken, removeToken, setToken } from '../utils/token';
import { User }  from '../interfaces'


interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null >(null);
  const { getMe } = useUser();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        
        setUser(me);
      } else {
        setUser(null);
      }
    })();
  }, []);

  const login = async (token: string) => {
    setToken(token);
    const me = await getMe(token);
    setUser(me);
    navigate("/perfil");
  };

  const logout = () => {
    if (user) {
      setUser(null);
      removeToken();
      navigate("/login");
    }
  };

  const auth: AuthContextType = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return auth;
}

export { AuthProvider, useAuth };
