import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMe } from "@/lib/api"; // наш axios API
import type { MeResponse } from "@/types/api";

type User = MeResponse | null;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (access: string, refresh?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);

  // ⚡ восстановление сессии при перезагрузке
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getMe()
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  // вход (сохранение токенов + загрузка профиля)
  const login = async (access: string, refresh?: string) => {
    localStorage.setItem("access_token", access);
    if (refresh) localStorage.setItem("refresh_token", refresh);

    try {
      const res = await getMe();
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  // выход
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// удобный хук
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
