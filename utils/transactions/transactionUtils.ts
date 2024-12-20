import { getDate } from '../formatDate';
import allTransactionTags from './allTransactionTags';
import fetchTransaction from './fetchTransactions';
import summarizeTransaction from './summarizeTransaction';

export const sortAllTags = (selectedTags: string[]) => {
    const newArr = [...allTransactionTags];
    newArr.sort((a, b) => {
        const aIsSelected = selectedTags.includes(a.name);
        const bIsSelected = selectedTags.includes(b.name);
        return aIsSelected === bIsSelected ? a.name.localeCompare(b.name) : aIsSelected ? -1 : 1;
    });
    return newArr;
};

export const filterTransactions = (transactions: any[], selectedDate: any, selectedTags: string[]) => {
    return transactions
        .filter((value) => {
            const transactionDate = getDate(value.date);
            return (
                transactionDate.month === selectedDate.month &&
                transactionDate.year === selectedDate.year
            );
        })
        .filter((value) => {
            const tags = value.tags || [];
            if (!selectedTags.includes('Exclude') && tags.includes('Exclude')) return false;
            if (selectedTags.length) return tags.some((tag: string) => selectedTags.includes(tag));
            return !tags.includes('Exclude');
        });
};

export const today = new Date().toISOString().split('T')[0];

export const loadTransactions = async (userId: string, selectedDate: any, selectedTags: string[]) => {
    const transactionsRaw = await fetchTransaction(userId);
    const filteredTransactions = filterTransactions(transactionsRaw, selectedDate, selectedTags);
    return { filteredTransactions, summary: summarizeTransaction(filteredTransactions) };
};
