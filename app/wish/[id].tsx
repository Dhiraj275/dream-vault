import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import ParallaxScrollView from "../../components/ParallaxScrollView"
import { icons, images } from '../../constants'
import { useGlobalSearchParams } from 'expo-router'
import fetchWishList from "../../utils/fetchWishList"
import WishList, { WishItem } from '@/interface/WishList'

const WishListScreen = () => {
  const [wishList, setWishList] = useState<WishItem[]>([])
  const [wishListMetaData, setWishListMetaData] = useState<WishList | null>(null)
  const glob = useGlobalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      if (glob.id) { // Ensure glob.id exists
        const data: WishList = await fetchWishList(glob.id as string);
        setWishList(data.list)
        setWishListMetaData(data);
      } else {
        console.error("No ID found in global search parameters.");
      }
    };

    fetchData();
  }, [glob.id]); // Add glob.id to dependency array

  const handleCheck = (index: number) => {
    const list = [...wishList]
    list[index].checked = !wishList[index].checked
    setWishList(list)
  }

  return (
    <View className="flex-1 bg-primary">
      <ParallaxScrollView
        headerImage={
          <Image
            source={{uri:wishListMetaData?.coverImage}}
            className="w-full h-[255px]"
            resizeMode='cover'
          />
        }
        headerBackgroundColor={{ dark: "#fff", light: "#fff" }}
      >
        <View className="-translate-y-6">
          <View className="px-6 relative pr-5 py-6 bg-[#28A745] rounded-3xl">
            <View className="flex-row items-center gap-2">
              <TextInput
                placeholder={wishListMetaData?.title || "Title"} // Provide fallback
                placeholderTextColor="#FFFFFF"
                className="text-white font-pbold text-xl w-full h-[35px]"
              />
            </View>
            {/* progress-bar */}
            <View className="relative mt-10">
              <View
                style={{ left: `${(wishListMetaData?.fulfilledWish || 0) / (wishListMetaData?.totalWish || 1) * 100}%` }}
                className="absolute bottom-[12px] -translate-x-[16px]"
              >
                <View className="items-center">
                  <Image source={images.indicator} />
                  <Text className="absolute font-psemibold">
                    {wishListMetaData?.fulfilledWish || 0}
                  </Text>
                </View>
              </View>
              <View className="w-full h-2 bg-[#ffffffc2] rounded-full">
                <View
                  style={{ width: wishListMetaData?.totalWish ?? 0 ? `${(wishListMetaData?.fulfilledWish || 0) / (wishListMetaData?.totalWish || 1) * 100}%` : "0%" }}
                  className="h-2 bg-error rounded-full"
                />
              </View>
            </View>
            <View className="flex-row mt-2">
              <TouchableOpacity activeOpacity={0.8} className="h-[40px] mt-5 items-center justify-center px-[24px] bg-white rounded-full">
                <Text
                  style={{ color: wishListMetaData?.color || '#000' }}
                  className="font-psemibold text-[18px] leading-[25px]"
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={icons.share}
              className="h-6 w-6 absolute right-4 top-4"
              resizeMode='contain'
            />
          </View>
          <View className="flex-1 px-5 py-4 bg-primary">
            <View>
              {
                wishList.map((item, key) => (
                  <TaskItem
                    key={key}
                    wishList={item}
                    index={key}
                    handleCheck={handleCheck}
                    onChangeText={(text) => {}}
                  />
                ))
              }
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  )
}

export default WishListScreen;
