import { useContext } from "react";
import { LoginUserContext } from "../providers/LoginUserProvider";

export const useLoginUser = () => {
  const context = useContext(LoginUserContext);
  if (context === undefined) {
    throw new Error("useLoginUser must be used within a LoginUserProvider");
  }
  return context;
};
