// let get it noFugazi dev

import  React, { useState, useEffect, createContext, useContext } from "react";
import { account, databases, ID } from "../libs/appwrite.ts";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    address: string,
    number: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // this is to check if the user is currently logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

    // login a user function

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get()
      setUser(user);
    } catch (error) {
      console.error("failed to login:", error);
      throw error;
    }

  };

  // creating a new user
  const register = async (
    email: string,
    password: string,
    name: string,
    address: string,
    number: string
  ) => {
    try {
        await account.create(ID.unique(), email, password, name );
        await login(email, password);
        await databases.createDocument(
            process.env.REACT_APP_APPRWRITE_DATABASE_ID || '',
            'users',
            ID.unique(), 
            {name, address, number}
        )
    } catch (error) {
        console.error('failed to register user:', error)
        throw error;
    }

  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("failed to logout:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{login, logout, register, user, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
    }
