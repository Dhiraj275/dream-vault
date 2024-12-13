
import { User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import WishList from './WishList';

export default interface GlobalContextProps {
    user: User | null;
    isLoading: boolean;
    setUser: Dispatch<SetStateAction<User | null>>;
    wishList: WishList[],
    setWishList: Dispatch<SetStateAction<WishList[] | null>>
  }