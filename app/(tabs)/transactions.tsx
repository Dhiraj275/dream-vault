import { icons } from '@/constants';
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import transactionsData, { Transaction } from "@/utils/dummy_transaction"
import { FlatList } from 'react-native';
import formatDate, { getDate } from '@/utils/formatDate';
import TransactionItem from '@/components/transaction/TransactionItem';

const Transactions = () => {
  const [summery, setSummery] = useState({
    leftBalance: 0,
    debit: 0,
    credit:0
  })
  useEffect(() => {
    const transactionsOfMonth = transactionsData.filter((value) => { return getDate(value.date).month === 12 && getDate(value.date).year === 2024 }).reverse();
    var debit = 0;
    var credit = 0;
    for (let i in transactionsOfMonth) {
      if(transactionsOfMonth[i].type==="Credit"){
        credit+=transactionsOfMonth[i].amount
      }
      else{
        debit+=transactionsOfMonth[i].amount
      }
    }
    console.log("debit:",debit,"credit:",credit)
    setSummery({
      credit:credit,
      debit:debit,
      leftBalance:credit - debit
    })
  }, [])
  return (
    <SafeAreaView className="bg-primary flex-1 p-4">
      <View className="summery bg-secondary-100 w-full rounded-xl p-4">
        <View className='flex-row justify-between items-start'>
          <Text className='text-primary text-[42px]  font-pblack'>
            ₹{summery.leftBalance}
          </Text>
          <View className="month flex-row justify-center gap-2 items-center mt-1">
            <Image
              source={icons.arrowLeft}
            />
            <Text className='text-[#4B3718] font-pbold text-[18px] leading-[22px]'>Dec' 24</Text>
            <Image
              className='rotate-[180deg]'
              source={icons.arrowLeft}
            />
          </View>
        </View>
        <View className='flex-row justify-between'>
          <View className="bg-white w-[160px] rounded-xl p-2 justify-center">
            <View>
              <Image
                source={icons.inIcon}
                resizeMode='contain'
              />
            </View>
            <Text className='text-success-100 font-pbold text-[30px] leading-[40px] mt-2 '>
              ₹{summery.credit}
            </Text>
          </View>
          <View className="bg-white w-[160px] rounded-xl p-2 justify-center">
            <View>
              <Image
                source={icons.outIcon}
                resizeMode='contain'
              />
            </View>
            <Text className='text-error font-pbold text-[30px] leading-[40px] mt-2 '>
              ₹{summery.debit}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          style={{ height: Dimensions.get("screen").height - 380 }}
          data={transactionsData.filter((value) => { return getDate(value.date).month === 12 && getDate(value.date).year === 2024 && value.type=="Debit" }).reverse()}
          renderItem={TransactionItem}
        />
      </View>
    </SafeAreaView>
  )
}
export default Transactions;