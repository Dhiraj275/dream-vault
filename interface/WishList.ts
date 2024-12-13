

export interface WishItem {
  title: string; // Example property, adjust as per your data structure
  checked: boolean;
  id: string | null
  description?: string;
  completed?: boolean;
  link?: string | null
}

export default interface WishList {
  isPrivate: boolean;
  items: WishListItems; // assuming each wishlist has multiple items
  ownerId: string;
  list: WishItem[]
  id: string,
  localImageURI: string,
  lastUpdateDate?: number
  coverImage?: string;
  color?: string;
  fulfilledWish?: number;
  totalWish?: number;
  isVisible:boolean,
  title?: string;
  date: number;
  fileName?: string,
}

interface WishListItems {
  [key: string]: WishItem;
}

interface WishListRaw {
  items: WishListItems;
}


