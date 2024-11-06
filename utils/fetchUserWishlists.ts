import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import WishList from "@/interface/WishList";

const fetchUserWishlists   = async (userId: string): Promise<WishList[]> => {
  return new Promise(resolve => {
    const userWishListRef = ref(database, `users/${userId}/wishlists`);
    const wishList: WishList[] = [];

    onValue(userWishListRef, async (wishlistsSnapshot) => {
      const wishlistsData = wishlistsSnapshot.val();

      if (wishlistsData) {
        // Collect promises to wait for all wishlist items to load
        const wishListPromises = Object.keys(wishlistsData).map(id => {
          const wishlistRef = ref(database, `wishlists/${id}`);
          return new Promise<WishList>(resolve => {
            onValue(wishlistRef, (wishItemSnapshot) => {
              resolve(wishItemSnapshot.val());
            }, { onlyOnce: true });
          });
        });

        // Wait for all wish items to load
        const resolvedWishItems: WishList[] | any = await Promise.all(wishListPromises);
        wishList.push({...resolvedWishItems[0], 
          coverImage:`https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/wish_covers%2F${resolvedWishItems[0].ownerId}%2F${resolvedWishItems[0].date}.${resolvedWishItems[0].fileType}?alt=media`});
      }
      resolve(wishList);
    }, { onlyOnce: true });
  });
};



export default fetchUserWishlists
