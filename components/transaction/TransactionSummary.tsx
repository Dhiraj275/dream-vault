import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../constants';
import fetchTransaction from '../../utils/transactions/fetchTransactions';
import { GlobalContext } from '../../provider/GlobalProvider';
import GlobalContextProps from '../../interface/GlobalContextProps';

const TransactionSummary = ({ summery, decreaseMonth, increaseMonth, selectedDate, months }: any) => {
  const { user } = useContext(GlobalContext) as GlobalContextProps;
  const [availableAmount,setAvailableAmount] = useState(0)
  useEffect(() => {
    async function loadData() {
      const transactionsRaw = await fetchTransaction(user?.uid)
      setAvailableAmount(transactionsRaw[0].balance)
    }
    loadData()
  }, [])
  return <View className="summery bg-secondary-100 w-full rounded-xl p-4">
    <View className="flex-row justify-between items-start">
      <View>
        <Text className="text-black-200 text-[24px] leading-[26px] font-pbold">
          ₹{Math.floor(availableAmount).toLocaleString('en-In')}
        </Text>
        <Text className="text-primary text-[30px] leading-[34px] font-pblack">
          ₹{Math.floor(summery.leftBalance).toLocaleString('en-In')}
        </Text>
      </View>
      <View className="month flex-row justify-center gap-2 items-center mt-1">
        <TouchableOpacity className="h-[20px] w-[24px] items-center justify-center" onPress={decreaseMonth}>
          <Image source={icons.arrowLeft} />
        </TouchableOpacity>
        <Text className="text-[#4B3718] font-pbold text-[18px] leading-[22px]">
          {months[selectedDate.month - 1]}' {selectedDate.year - 2000}
        </Text>
        <TouchableOpacity className="h-[20px] w-[24px] items-center justify-center" onPress={increaseMonth}>
          <Image className="rotate-[180deg]" source={icons.arrowLeft} />
        </TouchableOpacity>
      </View>
    </View>
    <View className="flex-row justify-between">
      <SummaryItem
        icon={icons.inIcon}
        amount={summery.credit}
        textClass="text-success-100"
      />
      <SummaryItem
        icon={icons.outIcon}
        amount={summery.debit}
        textClass="text-error"
      />
    </View>
  </View>
};

const SummaryItem = ({ icon, amount, textClass }: any) => (
  <View className="bg-white w-[160px] rounded-xl p-2 justify-center">
    <Image source={icon} className="h-[50px] w-[50px]" resizeMode="cover" />
    <Text className={`${textClass} font-pbold text-[30px] leading-[40px] mt-2`}>
      ₹{Math.floor(amount).toLocaleString('en-In')}
    </Text>
  </View>
);

export default TransactionSummary;
