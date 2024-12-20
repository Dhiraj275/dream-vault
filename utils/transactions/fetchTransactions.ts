import { database } from "../../firebase/firebase";
import { SmsItem, Transaction } from "../../interface/Transaction";
import categorizeTransaction from "./categorizeTransaction";
import fetchSms from "./fetchSMS";
import requestSmsPermission from "./requestSMS";
import { onValue, ref } from "firebase/database";
var names: any = {
    "patilpranav589_": "Pranav",
    "singhshivam9550": "Shivam",
    "vinodprajapati_": "Vinnod Mama",
    "dipakkumar0418_": "Dipak",
    "8511500331_ptye": "Shivam@Paytm",
    "goog-payments_a": "Reward",
    "rajubhaigprajap": "Papa",
    "9574314091_ptye": "Saurabh"
}
const parseDate = (dateString: string): Date => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds); // `month - 1` because months are 0-indexed in JS
};
const fetchTransaction = async (uid?: string): Promise<Transaction[]> => {

    // Step 1: Request SMS Permission and Fetch SMS List
    await requestSmsPermission();
    const smsList: SmsItem[] = await fetchSms();

    // Step 2: Extract SMS bodies and categorize transactions
    const transactionMap: Record<string, Transaction> = {}; // To store unique transactions
    smsList.forEach((sms) => {
        const body = sms.body;

        // Check if the SMS contains valid transaction details
        if (body.includes("UPI/") && !body.includes("ઉપલબ્ધ") && body.includes("A/c ...")) {
            const transaction = categorizeTransaction(body);
            if (transaction) {
                transactionMap[transaction.id] = transaction; // Use `id` as the key to ensure uniqueness
            }
        }
    });

    // Step 3: Fetch existing transactions from Firebase
    const getFirebaseTransactions = (): Promise<Transaction[]> =>
        new Promise((resolve) => {
            const transactionRef = ref(database, `users/${uid}/transactions`);

            onValue(transactionRef, (snapshot) => {
                const firebaseTransactions: Record<string, any> = snapshot.val() || {};

                // Add 'backup: true' to every transaction object
                const updatedFirebaseTransactions: any = Object.fromEntries(
                    Object.entries(firebaseTransactions).map(([key, value]) => [
                        key,
                        { ...(value as Record<string, any>), backup: true },
                    ])
                );
                const allTransactions = { ...transactionMap, ...updatedFirebaseTransactions }; // Merge SMS and Firebase transactions

                // Convert transactions object to array
                const transactionsArray: Transaction[] = Object.keys(allTransactions).map((id) => ({
                    ...allTransactions[id],
                    senderName: names[allTransactions[id].sender]

                }));
                transactionsArray.sort((a, b) => {
                    const dateA = parseDate(a.date);
                    const dateB = parseDate(b.date);
                    return dateB.getTime() - dateA.getTime();
                });
                resolve(transactionsArray); // Resolve with combined transactions
            });
        });

    // If `uid` exists, fetch Firebase transactions
    if (uid) {
        return await getFirebaseTransactions();
    }

    // If `uid` doesn't exist, return only categorized SMS transactions
    return Object.values(transactionMap);
};

export default fetchTransaction;
