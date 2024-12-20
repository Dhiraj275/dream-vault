import GlobalContextProps from '../../interface/GlobalContextProps'
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WishComponent from '../../components/home/WishComponent'
import { GlobalContext } from '../../provider/GlobalProvider'
import fetchUserWishlists from '../../utils/fetchUserWishlists'
import { icons } from '../../constants'
import { router } from 'expo-router'
import NoWishlistFound from '../../components/home/NoWishlist'

const Home = () => {
  const { user, setWishList, wishList } = useContext(GlobalContext) as GlobalContextProps
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setWishList(null)
        setWishList(await fetchUserWishlists(user.uid))
      }
    }
    loadData()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        <View className="h-[50px] justify-between flex-row px-4 items-center">
          <Text className="text-base text-gray-100 font-psemibold">Hi, {user?.username}</Text>
          <TouchableOpacity onPress={() => router.push(`/create`)} className="w-6 h-6 rounded-full">
            <Image
              source={icons.plus}
              resizeMode='contain'
              className='w-6 h-6'
              tintColor={"#FFA001"}
            />
          </TouchableOpacity>
        </View>
        {!wishList ?
          <View className='h-[600px] justify-center items-center'>
            <ActivityIndicator color="#fff" size={'large'}/>
          </View>
          :
          wishList.length ? <>
            {wishList.map((wish, index) => (
              <WishComponent
                key={index}
                uri={wish.coverImage || "https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/placeholders%2Fcoverimg.png?alt=media&token=42d759ba-600a-4dcf-9900-a1f1625ec68e"} // Fallback if uri is not available
                color={wish.color || '#000'} // Default color
                fulfilledWish={wish.fulfilledWish || 0}
                totalWish={wish.totalWish || 0}
                isPrivate={wish.isPrivate}
                title={wish.title || ""}
                id={wish.id}
                isVisible={wish.isVisible}
              />
            ))}
          </>
            :
            <NoWishlistFound />
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
