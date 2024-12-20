import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoTransactionFound from '../../components/transaction/NoTransactionFound';
import TransactionItem from '../../components/transaction/TransactionItem';
import { icons } from '../../constants';
import GlobalContextProps from '../../interface/GlobalContextProps';
import { Transaction } from "../../interface/Transaction";
import { GlobalContext } from '../../provider/GlobalProvider';
import { getDate, getMonthAndYear, months } from '../../utils/formatDate';
import fetchTransaction from '../../utils/transactions/fetchTransactions';
import summarizeTransaction from '../../utils/transactions/summarizeTransaction';
import allTransactionTags from '../../utils/transactions/allTransactionTags';
import { useFocusEffect } from 'expo-router';
function sortAllTags(selectedTags: string[]) {
  var newArr = [...allTransactionTags]
  newArr.sort((a, b) => {
    const aIsSelected = selectedTags.includes(a.name);
    const bIsSelected = selectedTags.includes(b.name);
    if (aIsSelected === bIsSelected) {
      return a.name.localeCompare(b.name);
    }

    // Otherwise, put the selected items first
    return aIsSelected ? -1 : 1;
  })
  return newArr
}

const today = new Date().toISOString().split('T')[0]
const Transactions = () => {
  const context = useContext(GlobalContext) as GlobalContextProps
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableAmount, setAvailableAmount] = useState(0)
  const [selectedDate, setSelectedDate] = useState(getMonthAndYear(today))
  const [transactionList, setTransactionList] = useState<Transaction[] | null>()
  const [summery, setSummery] = useState({
    leftBalance: 0,
    debit: 0,
    credit: 0
  })
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const RenderTag = ({ item }: { item: { name: string; color: string } }) => {
    const isSelected = selectedTags.includes(item.name);
    return (
      <TouchableOpacity
        onPress={() => toggleTag(item.name)}
        className={`p-2 rounded-lg my-2 mx-[2px] border-[${item.color}] border-2 flex-row`}
        style={{
          backgroundColor: isSelected ? item.color : "#161622",
          borderColor: item.color
        }}
      >
        <Text
          className={`font-semibold text-[12px] ${!isSelected ? 'text-white' : 'text-black'}`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  async function loadData() {
    const transactionsRaw = await fetchTransaction(context.user?.uid)
    const transactions = transactionsRaw
      .filter((value) => {
        // Filter by selected date
        const transactionDate = getDate(value.date);
        return transactionDate.month === selectedDate.month && transactionDate.year === selectedDate.year;
      })
      .filter((value) => {
        const tags = value.tags || []; // Ensure tags is always an array

        // If "Exclude" is not selected in `selectedTags`, exclude transactions with the "Exclude" tag
        if (!selectedTags.includes("Exclude") && tags.includes("Exclude")) {
          return false;
        }

        // If specific tags are selected, show transactions matching those tags
        if (selectedTags.length) {
          if (Array.isArray(selectedTags)) {
            return tags.some((tag) => selectedTags.includes(tag));
          } else {
            return tags.includes(selectedTags);
          }
        }

        // If no tags are selected, include transactions without "Exclude" tag
        return !tags.includes("Exclude");
      });


    setTransactionList(transactions)
    setSummery(summarizeTransaction(transactions))
  }
  useEffect(() => {
    loadData()
  }, [selectedDate, selectedTags])
  useEffect(() => {
    async function loadData() {
      const transactionsRaw = await fetchTransaction(context.user?.uid)
      setAvailableAmount(transactionsRaw[0].balance)
    }
    loadData()
  }, [])
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
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
        <View className="summery bg-secondary-100 w-full rounded-xl p-4">
          <View className='flex-row justify-between items-start'>
            <View>
              <Text className='text-black-200 text-[24px] leading-[26px] font-pbold'>
                ₹{Math.floor(availableAmount).toLocaleString("en-In")}
              </Text>
              <Text className='text-primary text-[30px] leading-[34px] font-pblack'>
                ₹{Math.floor(summery.leftBalance).toLocaleString("en-In")}
              </Text>
            </View>
            <View className="month flex-row justify-center gap-2 items-center mt-1">
              <TouchableOpacity className='h-[20px] w-[24px] items-center justify-center' onPress={decreaseMonth} activeOpacity={0.6}>
                <Image
                  source={icons.arrowLeft}
                />
              </TouchableOpacity>
              <Text className='text-[#4B3718] font-pbold text-[18px] leading-[22px]'>{months[selectedDate.month - 1]}' {selectedDate.year - 2000}</Text>
              <TouchableOpacity className='h-[20px] w-[24px] items-center justify-center' onPress={increaseMonth} activeOpacity={0.6}>
                <Image
                  className='rotate-[180deg]'
                  source={icons.arrowLeft}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className='flex-row justify-between'>
            <View className="bg-white w-[160px] rounded-xl p-2 justify-center">
              <View>
                <Image
                  source={icons.inIcon}
                  className='h-[50px] w-[50px]'
                  resizeMode='cover'
                />
              </View>
              <Text className='text-success-100 font-pbold text-[30px] leading-[40px] mt-2 '>
                ₹{summery.credit.toLocaleString("en-In")}
              </Text>
            </View>
            <View className="bg-white w-[160px] rounded-xl p-2 justify-center">
              <View>
                <Image
                  source={icons.outIcon}
                  className='h-[50px] w-[50px]'
                  resizeMode='cover'
                />
              </View>
              <Text className='text-error font-pbold text-[30px] leading-[40px] mt-2 '>
                ₹{Math.floor(summery.debit).toLocaleString("en-In")}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView horizontal className='flex-row'>
          {sortAllTags(selectedTags).map((item, index) => {
            return <RenderTag item={item} key={index} />
          })}
        </ScrollView>
        {
          !transactionList ? <View className="flex-1 h-[400px] items-center justify-center bg-primary">
            <ActivityIndicator color={"#fff"} />
          </View>
            :
            <View>
              {
                transactionList?.length ?
                  <FlatList
                    data={transactionList}
                    renderItem={TransactionItem}
                    scrollEnabled={false}
                  />
                  :
                  <NoTransactionFound />
              }

            </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}
export default Transactions;