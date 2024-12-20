import { router } from 'expo-router';
import { icons } from '../../constants';
import { Transaction } from "../../interface/Transaction";
import formatDate from '../../utils/formatDate';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import getName from '../../utils/transactions/getName';
const TransactionItem = ({ item }: { item: Transaction }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/transaction/${item.id}`)} className='mt-4 bg-black-100 items-center flex-row h-[120px] px-4 relative border-[1px] justify-between border-black-200 rounded-xl'>
      <View className='flex-row'>
        <View>
          <Image
            source={item.type == "Credit" ? icons.inIcon : icons.outIcon}
            className='h-[62px] w-[62px] mr-2'
            resizeMode='contain'
          />
          <View className=' bg-black-100 rounded-full absolute h-[20px] w-[20px] justify-center items-center bottom-0 right-0'>
            <Image
              source={item.backup ? icons.cloudFilled : icons.smsIcon}
              className='h-[12px] w-[12px] '
              resizeMode='contain'
            />
          </View>
        </View>
        <View className='justify-center px-1'>
          <Text className='text-[#E8E8EF] font-pbold text-[18px] leading-[20px]'>{getName(item)}</Text>
          <Text className='text-[#E8E8EF] font-pregular text-[14px] leading-[16px] mt-[6px] w-[180px]'>{item.description}</Text>

        </View>
      </View>
      <Text className='text-[#CDCDCD] font-pregular text-[14px] right-4 top-2 absolute'>{formatDate(item.date)}</Text>
      <Text style={{ color: item.type == "Credit" ? "#28A745" : "#DC3545" }} className='font-pbold text-[20px]'>₹{item.amount.toLocaleString("en-IN")}</Text>
      <Text className='text-[#e2e2e2] font-pregular text-[16px] right-4 bottom-0 absolute'>₹{item.balance}</Text>

    </TouchableOpacity>
  )
}
export default TransactionItem