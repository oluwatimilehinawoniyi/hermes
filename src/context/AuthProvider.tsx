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
  signUp: (email: string, password: string, fullname: string) => Promise<void>;
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

  const signUp = async (email: string, password: string, fullname: string) => {
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
        },
      },
    });

    if (error) {
      console.error("Error during sign up:", error);
    } else {
      const { data, error: insertError } = await supabase
        .from("managers")
        .insert([{ id: user?.id, email, fullname }]);

      if (insertError) {
        console.error("Error inserting user into managers table:", insertError);
      } else {
        console.log("User inserted into managers table:", data);
      }
    }
  };

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
        } else if (event === "SIGNED_OUT" || !session) {
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
      value={{ auth, user, login, signOut, setAuth, setUser, signUp }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
