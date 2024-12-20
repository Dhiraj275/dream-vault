import GlobalContextProps from '@/interface/GlobalContextProps';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Backdrop from '../../components/common/Backdrop';
import CustomButton from '../../components/CustomButton';
import NoTransactionFound from '../../components/transaction/NoTransactionFound';
import TransactionItem from '../../components/transaction/TransactionItem';
import TransactionSummary from '../../components/transaction/TransactionSummary';
import TransactionTags from '../../components/transaction/TransactionTags';
import { icons } from '../../constants';
import { GlobalContext } from '../../provider/GlobalProvider';
import { getMonthAndYear, months } from '../../utils/formatDate';
import allTransactionTags from '../../utils/transactions/allTransactionTags';
import { loadTransactions, today } from '../../utils/transactions/transactionUtils';

const Transactions = () => {
  const { user } = useContext(GlobalContext) as GlobalContextProps;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(getMonthAndYear(today));
  const [transactionList, setTransactionList] = useState<any[] | null>(null);
  const [summery, setSummery] = useState({ leftBalance: 0, debit: 0, credit: 0 });
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const loadData = async () => {
    if (user?.uid) {
      setTransactionList(null)
      const { filteredTransactions, summary } = await loadTransactions(user.uid, selectedDate, selectedTags);
      setTransactionList(filteredTransactions);
      setSummery(summary);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);
  const decreaseMonth = () => {
    if (selectedDate.month === 1) {
      setSelectedDate({ ...selectedDate, month: 12, year: selectedDate.year - 1 })
    }
    else {
      setSelectedDate({ ...selectedDate, month: selectedDate.month - 1 })
    }
  }
  const increaseMonth = () => {
    if (selectedDate.month === 12) {
      setSelectedDate({ ...selectedDate, month: 1, year: selectedDate.year + 1 })
    }
    else {
      setSelectedDate({ ...selectedDate, month: selectedDate.month + 1 })
    }

  }
  return (
    <SafeAreaView className="bg-primary flex-1 p-4">
      <ScrollView>
        <TransactionSummary
          summery={summery}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          selectedDate={selectedDate}
          months={months} // Replace with actual months
        />
        <TouchableOpacity activeOpacity={0.8} onPress={()=>setFilterOpen(true)} className="flex-row">
          <View className='flex-row outline-white outline-2 items-center px-2 py-1 rounded-md mt-3'>
            <Image
              source={icons.filtersIcon}
              className='h-[20px] w-[20px]'
            />
            <Text className='text-white font-bold ml-1'>Filters</Text>
          </View>
        </TouchableOpacity>
        {transactionList ? (
          transactionList.length ? (
            <FlatList scrollEnabled={false} data={transactionList} renderItem={TransactionItem} />
          ) : (
            <NoTransactionFound />
          )
        ) : (
          <View className='h-[400px] justify-center'>
            <ActivityIndicator color="#fff" />
          </View>
        )}
      </ScrollView>
      <Backdrop open={filterOpen} setOpen={setFilterOpen} >
        <View className=''>
          <Text className='text-white text-[18px] font-bold'>
            Filters
          </Text>
          <TransactionTags
            tags={allTransactionTags}
            selectedTags={selectedTags}
            toggleTag={(tag: string) =>
              setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
            }
          />
          <View className='items-end'>
            <CustomButton onPress={() => { loadData(); setFilterOpen(false) }} textStyle='text-xs' containerStyle='px-2 min-h-[35px] rounded-md mt-4' text='Apply' />
          </View>
        </View>
      </Backdrop>
    </SafeAreaView>
  );
};

export default Transactions;
