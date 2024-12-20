import { Transaction } from "../../interface/Transaction";
import hash from "../hash";

// Debit and credit patterns
const debitPattern = /Rs\.(\d+(\.\d+)?) transferred from A\/c \.\.\.(\d+) to:(UPI\/\d+)\. Total Bal:Rs\.(\d+(\.\d+)?)CR\..*Avlbl Amt:Rs\.(\d+(\.\d+)?).*?\((\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\)/;
const creditPattern = /Rs\.(\d+(\.\d+)?)\s+Credited\s+to\s+A\/c\s+\.\.\.(\d+)\s+thru\s+(UPI\/\d+)\s+by\s+([\w\d_@-]+)\. Total\s+Bal:Rs\.(\d+(\.\d+)?)CR\. Avlbl\s+Amt:Rs\.(\d+(\.\d+)?)\((\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2})\)/;
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
// Function to categorize transaction based on message content
export default function categorizeTransaction(message: string): Transaction | null {
    // Check for debit transaction
    const debitMatch = message.match(debitPattern);
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


