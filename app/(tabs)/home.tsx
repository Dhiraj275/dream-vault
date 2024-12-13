import GlobalContextProps from '@/interface/GlobalContextProps'
import React, { useContext, useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WishComponent from '../../components/home/WishComponent'
import { GlobalContext } from '../../provider/GlobalProvider'
import fetchUserWishlists from '@/utils/fetchUserWishlists'
import { icons } from '@/constants'
import { router } from 'expo-router'

const Home = () => {
  const context = useContext(GlobalContext) as GlobalContextProps
  useEffect(() => {
    const loadData = async () => {
      if (context.user) {
        context.setWishList(await fetchUserWishlists(context.user.uid))

      }
    }
    loadData()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        <View className="h-[50px] justify-between flex-row px-4 items-center">
          <Text className="text-base text-gray-100 font-psemibold">Hi, Dhiraj</Text>
          <TouchableOpacity onPress={()=>router.push(`/create`)} className="w-6 h-6 rounded-full">
            <Image 
              source={icons.plus}
              resizeMode='contain'
              className='w-6 h-6'
              tintColor={"#FFA001"}
            />
          </TouchableOpacity>
        </View>
        {context.wishList.map((wish, index) => (
          <WishComponent
            key={index}
            uri={wish.coverImage || 'default-uri'} // Fallback if uri is not available
            color={wish.color || '#000'} // Default color
            fulfilledWish={wish.fulfilledWish || 0}
            totalWish={wish.totalWish || 0}
            isPrivate={wish.isPrivate}
            title={wish.title || ""}
            id={wish.id}
            isVisible={wish.isVisible}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
