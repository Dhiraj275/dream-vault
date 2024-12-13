import { icons } from '@/constants';
import { Transaction } from "@/utils/dummy_transaction";
import formatDate from '@/utils/formatDate';
import React from 'react';
import { Image, Text, View } from 'react-native';
const TransactionItem = ({ item }: { item: Transaction }) => {
    return (
      <View className='mt-4 bg-black-100 items-center flex-row h-[120px] px-4 relative border-[1px] justify-between border-black-200 rounded-xl'>
        <View className='flex-row'>
          <Image
            source={item.type == "Credit" ? icons.inIcon : icons.outIcon}
            className='h-[62px] w-[62px] mr-2'
            resizeMode='contain'
          />
          <View className='justify-center px-1'>
            <Text className='text-[#E8E8EF] font-pbold text-[18px] leading-[20px]'>{item.type == "Credit" ? item.sender : item.recipient}</Text>
            <Text className='text-[#E8E8EF] font-pregular text-[14px] leading-[16px] mt-[6px] w-[180px]'>-</Text>
  
          </View>
        </View>
        <Text className='text-[#CDCDCD] font-pregular text-[14px] right-4 top-2 absolute'>{formatDate(item.date)}</Text>
        <Text style={{ color: item.type == "Credit" ? "#28A745" : "#DC3545" }} className='font-pbold text-[20px]'>₹{item.amount.toLocaleString("en-IN")}</Text>
      </View>
    )
  }
  export default TransactionItem