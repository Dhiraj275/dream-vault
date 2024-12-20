import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth, database } from '../firebase/firebase';
import GlobalContextProps, { User } from '../interface/GlobalContextProps';
import WishList from '../interface/WishList';
import { onValue, ref } from 'firebase/database';



const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}


const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [wishList, setWishList] = useState<WishList[] | null>(null)
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ ...user, username: "User" });
        onValue(ref(database, `users/${user.uid}/username`), (snap) => {
          setUser({ ...user, username: snap.val() });
        })
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
        wishList: wishList,
        setWishList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export { GlobalContext };

