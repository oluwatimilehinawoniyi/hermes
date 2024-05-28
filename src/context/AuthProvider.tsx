/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@supabase/supabase-js";
import supabase from "@utils/supabase";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextType {
  auth: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  setAuth: (auth: boolean) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      setAuth(!!sessionUser);
      setLoading(false);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
          setAuth(true);
          setLoading(false);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setAuth(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, user, login, signOut, setAuth, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
