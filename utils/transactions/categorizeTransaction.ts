import { Transaction } from "../../interface/Transaction";
import hash from "../hash";

// Debit and credit patterns
const debitPattern = /Rs\.(\d+(\.\d+)?) transferred from A\/c \.\.\.(\d+) to:(UPI\/\d+)\. Total Bal:Rs\.(\d+(\.\d+)?)CR\..*?Avlbl Amt:Rs\.(\d+(\.\d+)?).*?\((\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\)/;
const creditPattern = /(?:Rs\.|રૂ\.)\s*(\d+(\.\d+)?)\s+Credited\s+to\s+A\/c\s+\.\.\.(\d+)\s+thru\s+(UPI\/\d+)\s+by\s+([\w\d_@-]+)\. Total\s+Bal:(?:Rs\.|રૂ\.)\s*(\d+(\.\d+)?)CR\. Avlbl\s+Amt:(?:Rs\.|રૂ\.)\s*(\d+(\.\d+)?)\s*\((\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\)/;
const gujaratiDebitPattern = /રૂ\. (\d+) ખાતા નં\. (\d+) માંથી ([Uu][Pp][Ii]\/\d+) ને ટ્રાન્સફર કરવામાં આવ્યા છે\. કુલ બેલેન્સ રૂ\. ([\d.]+)[Cc][Rr]\. ઉપલબ્ધ રકમ: રૂ\. ([\d.]+)\((\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\)/;

var names: any = {
    "patilpranav589_": "Pranav",
    "singhshivam9550": "Shivam",
    "vinodprajapati_": "Vinnod Mama",
    "dipakkumar0418_": "Dipak",
    "8511500331_ptye": "Shivam@Paytm",
    "goog-payments_a": "Reward",
    "rajubhaigprajap": "Papa",
    "9574314091_ptye": "Saurabh",
    "patilpranav589@okicici": "Pranav",
    "himanshumishra3281@okicici": "Himanshu Mishra",
    "q381437418@ybl": "Mahakal Stationary",
    "paytmqr5dvk39@ptys": "Dairy",
    "q113633972@ybl": 'Narmade Her',
    "6351892489_ptye": "Khushi",
    "6351892489@ptyes": "Khushi",
    "bharatpe9h0y7b2r8v724055@yesbankltd": "Kunal Dairy",
    // "bharatpe.90070847725@fbpe":"Kunal Dairy",
}
// Function to categorize transaction based on message content
export default function categorizeTransaction(message: string, metaData: any): Transaction | null {
    // Check for debit transaction
    const debitMatch = message.match(debitPattern);
    const gujaratiDebitMatch = message.match(gujaratiDebitPattern);

    if (gujaratiDebitMatch) {
        var thisTransactionMetaData = metaData[gujaratiDebitMatch[3].replace("upi/", "")]
        function getRecipient() {
            if (thisTransactionMetaData) {
                if (names[thisTransactionMetaData.creditedTo]) {
                    return names[thisTransactionMetaData.creditedTo]
                }
                else {
                    return thisTransactionMetaData.creditedTo
                }
            } else {
                //@ts-ignore
                return gujaratiDebitMatch[3]
            }
        }
        return {
            type: "Debit",
            amount: parseFloat(gujaratiDebitMatch[1]),
            sender: gujaratiDebitMatch[2], // Account number
            recipient: gujaratiDebitMatch[3], // recipient
            recipientName: getRecipient(),
            // upiReferenceId: ,
            balance: parseFloat(gujaratiDebitMatch[5]),
            date: gujaratiDebitMatch[6],
            id: hash(gujaratiDebitMatch[6] + gujaratiDebitMatch[2]),
        };
    }


    if (debitMatch) {

        return {
            type: "Debit",
            amount: parseFloat(debitMatch[1]),
            sender: debitMatch[3],
            recipient: debitMatch[4],
            balance: parseFloat(debitMatch[5]),
            date: debitMatch[9],
            id: hash(debitMatch[9] + debitMatch[3])
        }
    }

    // Check for credit transaction
    const creditMatch = message.match(creditPattern);
    if (creditMatch) {
        return {
            type: "Credit",
            amount: parseFloat(creditMatch[1]),
            recipient: creditMatch[3],
            sender: creditMatch[5],
            transaction_info: creditMatch[4],
            balance: parseFloat(creditMatch[6]),
            date: creditMatch[10],
            id: hash(creditMatch[10] + creditMatch[5]),
            senderName: names[creditMatch[5]]
        };
    }

    // If no match found
    return null;
}


