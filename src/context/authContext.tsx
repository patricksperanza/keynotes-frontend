import axios from "axios";
import {
  AuthContextType,
  AuthContextProviderProps,
  LoginInputs,
  User,
} from "../types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContexProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "") || null
  );

  const login = async (inputs: LoginInputs) => {
    const res = await axios.post("http://localhost:3001/auth/login", inputs, {
      withCredentials: true,
    });
    console.log(res.data);

    setCurrentUser({ ...res.data });
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3001/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
  };

  // Store current user info to local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
