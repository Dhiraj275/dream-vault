import { Transaction } from '../../interface/Transaction';
import GlobalContextProps from '../../interface/GlobalContextProps';
import { GlobalContext } from '../../provider/GlobalProvider';
import fetchTransaction from '../../utils/transactions/fetchTransactions';
import { router, useGlobalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import formatDate from '../../utils/formatDate';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import getName from '../../utils/transactions/getName';
import allTransactionTags from '../../utils/transactions/allTransactionTags';



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
const TransactionDetails = () => {
  const context = useContext(GlobalContext) as GlobalContextProps
  const glob = useGlobalSearchParams();
  const [transaction, setTransaction] = useState<Transaction>()
  const [transactionTags, setTransactionTags] = useState(allTransactionTags)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recipientName, setRecipientName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
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
        className={`p-3 rounded-xl m-2 border-[${item.color}] border-2 flex-row`}
        style={{
          backgroundColor: isSelected ? item.color : "#161622",
          borderColor: item.color
        }}
      >
        <Text
          className={`font-semibold text-sm ${!isSelected ? 'text-white' : 'text-black'}`}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    async function loadData() {
      const transactionsRaw = await fetchTransaction(context.user?.uid)
      const currentTransaction = transactionsRaw.filter((value) => value.id == parseInt(glob.id as string))[0]
      setTransaction(currentTransaction)
      if (currentTransaction?.recipientName) setRecipientName(currentTransaction?.recipientName)
      if (currentTransaction?.description) setDescription(currentTransaction?.description)
      if (currentTransaction?.tags) {
        var selectedTags = currentTransaction.tags || []
        setSelectedTags(currentTransaction?.tags)
        setTransactionTags(sortAllTags(selectedTags))
      }
    }
    loadData()

  }, [])
  const handleSave = async () => {
    const transactionRef = ref(database, `users/${context.user?.uid}/transactions/${transaction?.id}`)
    await set(transactionRef, {
      ...transaction,
      tags: selectedTags.length ? selectedTags : null,
      description: description !== "" ? description : null,
      senderName: null,
      recipientName: transaction?.type == "Debit" ? recipientName !== "" && recipientName : null
    })
    router.back()
  }
  if (transaction) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView>
          <View className='items-center mt-[30px]'>
            <Image
              source={transaction.type === "Credit" ? icons.inIcon : icons.outIcon}
            />
            <TextInput
              className='h-[35px] w-[200px] m-4  text-[#e8e8efe5] font-psemibold text-[20px] mt-4'
              placeholder={getName(transaction)}
              placeholderTextColor={"#ffffffa9"}
              textAlign='center'
              value={recipientName}
              onChangeText={(text) => setRecipientName(text)}
            />

            <Text className='text-[#E8E8EF] font-pbold text-[28px] mt-4 leading-[32px]'>
              ₹{
                transaction.amount
              }
            </Text>
            <Text className='text-[#e8e8ef97] font-pregular text-[18px] mt-4 leading-[22px]'>
              {
                formatDate(transaction.date)
              }
            </Text>
            <View className='bg-black-200 min-h-[55px] justify-center m-4 rounded-3xl'>
              <TextInput
                onChangeText={(text) => setDescription(text)}
                className=' min-w-[200px]  px-4 py-2  text-center font-pregular text-[18px] leading-[30px] text-[#ffffffce]'
                placeholder='type description...'
                placeholderTextColor={"#ffffffa9"}
                value={description}
                multiline
              />
            </View>
            <View className='flex-wrap flex-row justify-center'>
              {
                transactionTags.map((item, index) => {
                  return <RenderTag item={item} key={index} />
                })
              }
            </View>
            <TouchableOpacity
              onPress={handleSave}
              className="mt-4 px-4 py-2 bg-secondary rounded-lg items-center"
            >
              <Text className="text-white rfont-bold">Save</Text>
            </TouchableOpacity>
          </View >
        </ScrollView>
      </SafeAreaView>
    )
  }

}

export default TransactionDetails