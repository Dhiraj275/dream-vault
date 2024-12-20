import { Transaction } from "@/interface/Transaction"

const getName = (transaction: Transaction) => {
    if (transaction.type == "Credit") {
        if (transaction.senderName) return transaction.senderName
        else return transaction.sender
    }
    else{
        if (transaction.recipientName) return transaction.recipientName
        else return transaction.recipient
    }
}

export default getName