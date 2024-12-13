import { router } from 'expo-router';
import { onAuthStateChanged, signOut, User, Auth } from 'firebase/auth';
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { auth } from '../firebase/firebase';
import WishList from '@/interface/WishList';
import fetchUserWishlists from '@/utils/fetchUserWishlists';
import GlobalContextProps from '@/interface/GlobalContextProps';



const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [wishList, setWishList] = useState<WishList[] | null>([])
  const [user, setUser] = useState<User | null>(null);
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
        wishList:wishList?wishList:[],
        setWishList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export { GlobalContext };
