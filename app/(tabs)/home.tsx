import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WishComponent from '../../components/home/WishComponent'
import fetchUserWishlists from '../../utils/fetchUserWishlists'
import { GlobalContext } from '../../provider/GlobalProvider'
import WishList from "../../interface/WishList"
import { GlobalContextProps } from '@/interface/GlobalContextProps'

const Home = () => {
  const context = useContext(GlobalContext) as GlobalContextProps
  const [wishList, setWishList] = useState<WishList[]>([]) // Typed with WishList
  useEffect(() => {
    async function fetchList() {
      if (context.user?.uid) {
        const fetchedWishList: WishList[] = await fetchUserWishlists(context.user.uid)
        setWishList(fetchedWishList)
      }
    }
    fetchList();
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        <View className="h-[50px] justify-between flex-row px-4 items-center">
          <Text className="text-base text-gray-100 font-psemibold">Hi, Dhiraj</Text>
          <View className="w-6 h-6 bg-secondary rounded-full" />
        </View>
        {wishList.map((wish, index) => (
          <WishComponent
            key={index}
            uri={wish.coverImage || 'default-uri'} // Fallback if uri is not available
            color={wish.color || '#000'} // Default color
            fulfilledWish={wish.fulfilledWish}
            totalWish={wish.totalWish}
            isPublic={wish.isPublic}
            title={wish.title}
            id={wish.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
