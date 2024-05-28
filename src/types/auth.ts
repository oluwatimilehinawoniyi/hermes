import { User } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthContextType {
  auth: boolean;
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
}
