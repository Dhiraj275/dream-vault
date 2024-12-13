import { database, storage } from "@/firebase/firebase";
import WishList, { WishItem } from "@/interface/WishList";
import { ref as databaseRef, push, set } from "firebase/database";
import { ref, uploadBytes } from "firebase/storage";
import { Dispatch, SetStateAction } from "react";
import fetchUserWishlists from "./fetchUserWishlists";
import { ToastAndroid } from "react-native";
const updateWishList = async (wishList: WishItem[], wishListMetaData?: WishList, setWishList?: Dispatch<SetStateAction<WishList[] | null>>, setIsBackedUp?: Dispatch<SetStateAction<boolean>>) => {
    const date = Date.now();
    var fileName = wishListMetaData?.fileName ? wishListMetaData?.fileName : null
    if (wishListMetaData?.localImageURI && wishListMetaData?.localImageURI !== "") {
        const response = await fetch(wishListMetaData.localImageURI);
        const blob = await response.blob();
        const coverStorageRef = ref(storage, `wish_covers/${wishListMetaData.ownerId}/${date}.png`);
        await uploadBytes(coverStorageRef, blob);
        fileName = `${date}.png`
    }

    const wishlistRef = databaseRef(database, `/wishlists/${wishListMetaData?.id}`);

    // Push the rawData and get a unique key for the wishlist
    await set(wishlistRef, {
        ...wishListMetaData,
        lastUpdateDate: date,
        list: null,
        items: null,
        localImageURI: null,
        id: null,
        totalWish: null,
        fulfilledWish: null,
        fileName
    });

    // Add items to the wishlist using the generated key
    const wishlistItemsRef = databaseRef(database, `/wishlists/${wishListMetaData?.id}/items`);
    const userWishlistRef = databaseRef(database, `users/${wishListMetaData?.ownerId}/wishlists/${wishListMetaData?.id}`);

    await set(userWishlistRef, { isVisible: true })
    var wishListHashmap = {}
    for (let i in wishList) {
        if (wishList[i].title === "") continue;
        else if (wishList[i].id) {
            wishListHashmap = {
                ...wishListHashmap,
                [wishList[i].id as string]: {
                    ...wishList[i]
                }
            }
        }
        else {
            wishListHashmap = {
                ...wishListHashmap,
                [Date.now() + i]: {
                    ...wishList[i]
                }
            }
        }
    }
    set(wishlistItemsRef, wishListHashmap).then(async () => {
        if (setWishList && wishListMetaData?.ownerId && setIsBackedUp) {
            setWishList(await fetchUserWishlists(wishListMetaData.ownerId))
            setIsBackedUp(true)
            ToastAndroid.showWithGravity(
                'Wishlist updated Successfully',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    })
}

export default updateWishList