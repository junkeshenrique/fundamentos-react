import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";

const CESUL_USER = "cesul.user";

type Credentials = {
  username: string,
  password: string;
}

type User = {
  id:string;
  cpf: string;
  email: string;
  fullName: string;
  avatarUrl: string;
}

type SessionContextData = {
  user: User;
  updateUser: (user: User) => Promise<void>;
}

const SessionContext = createContext({} as SessionContextData);

export async function signIn({ username, password}: Credentials){
}

export async function signOut() {
  destroyCookie(null, CESUL_USER, {
    path: "/"
  });

}

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({children}: SessionProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function updateUser(user: User){
    createCookieUser(user);
  }

  async function createCookieUser(user: User) {
    setCookie(null, CESUL_USER, JSON.stringify(user), {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    setUser(user);
  }

  return (
    <SessionContext.Provider value={{user, updateUser}}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
