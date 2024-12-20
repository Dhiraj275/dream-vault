export interface Transaction {
    type: "Debit" | "Credit";
    amount: number;
    sender: string;
    recipient: string;
    balance: number;
    date: string;
    id: number,
    backup?: boolean,
    transaction_info?: string,
    description?: string,
    senderName?: string
    recipientName?: string
    tags?: string[]
}
export interface SmsItem {
    _id: string;
    address: string;
    body: string;
    date: string;
    date_sent?: string;
    read?: string;
    thread_id?: string;
    type?: string;
}
