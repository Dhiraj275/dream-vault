import { database } from "../firebase/firebase";
import WishList, { WishItem } from "../interface/WishList";
import { onValue, ref } from "firebase/database";

const fetchWishList = (id: string) => {
    const wishlistRef = ref(database, `wishlists/${id}`);
    return new Promise<WishList>(resolve => {
        onValue(wishlistRef, (wishItemSnapshot) => {
            const rawWishlist = {
                ...wishItemSnapshot.val(), id
            }
            var resolvedWishList: WishList = rawWishlist;
            let fulfilledWish = 0;

            const wishListItems: WishItem[] = resolvedWishList.items
                ? Object.keys(resolvedWishList.items).map((item) => {
                    const wishItem = resolvedWishList.items[item];
                    if (wishItem.checked) fulfilledWish++;
                    return { ...wishItem, id: item };
                })
                : []; // If items is undefined, return an empty array

            resolve({
                ...resolvedWishList,
                coverImage: resolvedWishList.fileName ? `https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/wish_covers%2F${resolvedWishList.ownerId}%2F${resolvedWishList.fileName}?alt=media` : "https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/placeholders%2Fcoverimg.png?alt=media&token=42d759ba-600a-4dcf-9900-a1f1625ec68e",
                list: wishListItems,
                totalWish: wishListItems.length,
                fulfilledWish
            })

        });

    });

}

export default fetchWishList