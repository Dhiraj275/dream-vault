

export interface WishItem {
  title: string; // Example property, adjust as per your data structure
  description?: string;
  completed: boolean;
  checked: boolean
}

export default interface WishList {
  coverImage: string;
  color: string;
  fulfilledWish: number;
  totalWish: number;
  id: string,
  isPublic: boolean;
  title: string;
  date: number;
  fileType: string;
  isPrivate: boolean;
  items: WishListItems; // assuming each wishlist has multiple items
  ownerId: string;
  list: WishItem[]
}

interface WishListItems {
  [key: string]: WishItem;
}

interface WishListRaw {
  items: WishListItems;
}


