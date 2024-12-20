import { Transaction } from "../../interface/Transaction";

const summarizeTransaction = (transactionsData: Transaction[]) => {
    const transactionsOfMonth = transactionsData;
    var debit = 0;
    var credit = 0;
    for (let i in transactionsOfMonth) {
        if (transactionsOfMonth[i].type === "Credit") {
            credit += transactionsOfMonth[i].amount
        }
        else {
            debit += transactionsOfMonth[i].amount
        }
    }
    return {
        leftBalance: credit-debit,
        debit: debit,
        credit: credit
    }

}
export default summarizeTransaction