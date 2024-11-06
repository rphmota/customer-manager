import { ReactNode } from "react";

type AppContextProps = {
  children: ReactNode;
};

export function AppContextProvider({ children }: AppContextProps) {
  return <>{children}</>;
}
