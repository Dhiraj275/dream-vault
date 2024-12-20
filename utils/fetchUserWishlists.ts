import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import fetchWishList from "./fetchWishList"; // Import the fetchWishList function
import WishList from "../interface/WishList";

const fetchUserWishlists = async (userId: string): Promise<WishList[]> => {
  const userWishListRef = ref(database, `users/${userId}/wishlists`);

  return new Promise((resolve, reject) => {
    onValue(
      userWishListRef,
      async (wishlistsSnapshot) => {
        const wishlistsData = wishlistsSnapshot.val();
        if (wishlistsData) {
          try {
            const wishListPromises = Object.keys(wishlistsData).map((id) =>
              fetchWishList(id)
            );

            const resolvedWishLists = await Promise.all(wishListPromises);
            resolvedWishLists.sort((a, b) => b.date - a.date)
            resolve(resolvedWishLists)
          } catch (error) {
            console.error("Error fetching wishlists: ", error);
            reject(error);
          }
        } else {
          resolve([]);
        }
      },
      { onlyOnce: true }
    );
  });

};


export default fetchUserWishlists;
