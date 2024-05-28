/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@supabase/supabase-js";
import supabase from "@utils/supabase";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface AuthContextType {
  auth: boolean;
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  setAuth: (auth: boolean) => void;
  setUser: (user: User | null | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setAuth(!!currentUser);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user ?? null);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
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
