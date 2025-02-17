import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { firestore, auth } from "../libs/firebaseConfig.ts";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
  uid: string;
  email: string | null;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  Login: (email: string, password: string) => Promise<void>;
  Register: (
    email: string,
    password: string,
    name: string,
    address: string
  ) => Promise<void>;
  LogOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const userDocRef = doc(firestore, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userDoc.data()?.role,
            });
          } else {
            await setDoc(userDocRef, {
              email: firebaseUser.email,
              role: "user",
            });
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: "user",
            });
          }
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  });

  //login function
  const Login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: userDoc.data().role,
        });
      } else {
        console.error("User document not found in Firestore.");
        setUser(null);
      }
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
    }
  };
  

  const Register = async (email: string, password: string, name: string, address: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
  
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, { email, name, address, role: "user" });
  
      // Fetch user from Firestore after registration
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUser({
          uid: user.uid,
          email: user.email,
          role: userDoc.data().role,
        });
      }
    } catch (err) {
      console.error("Sign Up Error:", err);
    }
  };

  const LogOut = async() => {
    try {
        await signOut(auth)
        setUser(null)
    } catch (err) {
        console.error('Error logging out:', err)
    }
  }



  return <AuthContext.Provider value={{user, loading, Login, Register, LogOut}}>
    {!loading && children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error('useAuth must be within an Auth Provider')
    }

    return context;
}
