
import { User as FirebaseUser } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import WishList from './WishList';
export interface User extends FirebaseUser {
  username: string
}
export default interface GlobalContextProps {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  wishList: WishList[] | null,
  setWishList: Dispatch<SetStateAction<WishList[] | null>>
}