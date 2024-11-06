

interface WishItem {
    name: string; // Example property, adjust as per your data structure
    description?: string;
    completed: boolean;
  }
  
  export default interface WishList {
    coverImage: string;
    color: string;
    fulfilledWish: number;
    totalWish: number;
    isPublic: boolean;
    title: string;
    date: number;
    fileType: string;
    isPrivate: boolean;
    items: WishItem[]; // assuming each wishlist has multiple items
    ownerId: string;
  }
  