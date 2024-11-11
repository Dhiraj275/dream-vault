import { database } from "@/firebase/firebase";
import WishList, { WishItem } from "@/interface/WishList";
import { onValue, ref } from "firebase/database";

const fetchWishList = (id: string) => {
    const wishlistRef = ref(database, `wishlists/${id}`);
    return new Promise<WishList>(resolve => {
        onValue(wishlistRef, (wishItemSnapshot) => {
            const rawWishlist = {
                ...wishItemSnapshot.val(), id
            }
            var resolvedWishList: WishList = rawWishlist;
            var wishListItems: WishItem[] = Object.keys(resolvedWishList.items).map((item) => {
                return { ...resolvedWishList.items[item], id: item }
            })
            resolve({
                ...resolvedWishList,
                coverImage: `https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/wish_covers%2F${resolvedWishList.ownerId}%2F${resolvedWishList.date}.${resolvedWishList.fileType}?alt=media`,
                list: wishListItems,
                totalWish: wishListItems.length,
                fulfilledWish: 1
            })
        }, { onlyOnce: true });

    });

}

export default fetchWishList