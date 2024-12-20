import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebase";
import ChecklistItem from "../../interface/Checklist";

const fetchCheckList = (uid: string) => {
    const wishlistRef = ref(database, `users/${uid}/checklist`);
    return new Promise<ChecklistItem[]>(resolve => {
        onValue(wishlistRef, (wishItemSnapshot) => {
            const rawWishlist = {
                ...wishItemSnapshot.val()
            }
            var resolvedWishList = rawWishlist;

            const wishListItems: ChecklistItem[] = Object.keys(resolvedWishList).map((item) => {
                return { checkedDates:[],...resolvedWishList[item], id: item, };
            })
            resolve(wishListItems)
        });

    });

}
export default fetchCheckList