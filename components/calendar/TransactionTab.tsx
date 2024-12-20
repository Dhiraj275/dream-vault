import { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';
import { images } from '../../constants';
import GlobalContextProps from '../../interface/GlobalContextProps';
import { Transaction } from '../../interface/Transaction';
import { GlobalContext } from '../../provider/GlobalProvider';
import { getDate } from '../../utils/formatDate';
import fetchTransaction from '../../utils/transactions/fetchTransactions';
import TransactionItem from '../transaction/TransactionItem';
const TransactionTab = ({ selectedDate }: { selectedDate: string }) => {
    const [transactionList, setTransactionList] = useState<Transaction[]>()
    const context = useContext(GlobalContext) as GlobalContextProps
    useEffect(() => {
        async function loadData() {
            const transactions = await fetchTransaction(context.user?.uid)
            setTransactionList(transactions.filter((value) => {
                return getDate(value.date).month === getDate(selectedDate).month &&
                    getDate(value.date).year === getDate(selectedDate).year &&
                    getDate(value.date).day === getDate(selectedDate).day
            }))
        }
        loadData()
    }, [selectedDate])
    return (
        <View className='mt-4 px-2'>
            {
                transactionList?.length ?
                    <FlatList
                        style={{ height: Dimensions.get("screen").height - 570 }}
                        data={transactionList}
                        renderItem={TransactionItem}
                    /> :
                    <View className='items-center h-[300px] justify-center'>
                        <Image
                            source={images.noTransaction}
                            className='w-[150px] h-[150px]'
                        />
                        <Text className='text-white font-pbold text-[16px]'>No Transaction Found</Text>
                    </View>
            }

        </View>
    )
}

export default TransactionTab