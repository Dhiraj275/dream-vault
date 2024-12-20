import { ref, set } from "firebase/database";
import hash from "../hash";
import fetchTransaction from "./fetchTransactions";
import { database } from "../../firebase/firebase";

export default async function backupTransaction(uid: string) {
    const fetchedTransaction = await fetchTransaction();
    var transactionMap: any = {}
    fetchedTransaction.map((item, index) => {
        transactionMap[hash(item.date + item.sender)] = {
            ...item
        }
    })
    const transactionRef = ref(database, `users/${uid}/transactions`)
    await set(transactionRef,transactionMap)

}