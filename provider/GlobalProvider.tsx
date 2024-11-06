import { router } from 'expo-router';
import { onAuthStateChanged, signOut, User, Auth } from 'firebase/auth';
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { auth } from '../firebase/firebase';

interface GlobalContextProps {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoading,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export { GlobalContext };
