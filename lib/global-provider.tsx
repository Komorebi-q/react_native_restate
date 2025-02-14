import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (params?: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch
  } = useAppwrite({
    fn: getCurrentUser
  });

  const isLoggedIn = !!user;
  console.log("user", JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        refetch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};

export default GlobalProvider;
