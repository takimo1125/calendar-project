import { useState, type ReactNode } from "react";
import type { LoginUserType } from "../types/login";
import { LoginUserContext } from "./LoginUserContext";

export const LoginUserProvider = ({ children }: { children: ReactNode }) => {
  const [loginUser, setLoginUser] = useState<LoginUserType>({
    id: 0,
    name: "",
  });

  return <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>{children}</LoginUserContext.Provider>;
};
