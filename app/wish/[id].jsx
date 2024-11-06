import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import ParallaxScrollView from "../../components/ParallaxScrollView"
import { icons, images } from '../../constants'
var WishList = [
  { "title": "Mumbai", "checked": false },
  { "title": "Delhi", "checked": false },
  { "title": "Jaipur", "checked": false },
  { "title": "Goa", "checked": false },
  { "title": "Kolkata", "checked": false },
  { "title": "Bangalore", "checked": false },
  { "title": "Chennai", "checked": false },
  { "title": "Udaipur", "checked": false },
  { "title": "Agra", "checked": false },
  { "title": "Kerala (Munnar)", "checked": false },
  { "title": "Dubai", "checked": false },
  { "title": "Paris", "checked": false },
  { "title": "New York", "checked": false },
  { "title": "Tokyo", "checked": false },
  { "title": "Sydney", "checked": false },
  { "title": "London", "checked": false },
  { "title": "Rome", "checked": false },
  { "title": "Bangkok", "checked": false },
  { "title": "Cape Town", "checked": false },
  { "title": "Barcelona", "checked": false }
]

const Create = ({ title = "Travel", fulfilledWish = 0, totalWish = 0, color = "#28A745" }) => {
  const [wishList, setWishList] = useState(WishList)
  const handleCheck = (index) => {
    var list = [...wishList]
    list[index].checked = !wishList[index].checked
    setWishList(list)
  }
  return (
    <View className="flex-1 bg-primary">
      <ParallaxScrollView headerImage={
        <Image
          source={images.coverimg}
          className="w-full h-[255px]"
          resizeMode='cover'
        />
      }
        headerBackgroundColor={"#fff"}
      >
        <View className="-translate-y-6">
          <View className="px-6 relative pr-5 py-6 bg-[#28A745] rounded-3xl">
            <View className="flex-row items-center gap-2">
              <TextInput placeholder={title} placeholderTextColor={"#FFFFFF"} className="text-white font-pbold text-xl w-full h-[35px]">

              </TextInput>
            </View>
            {/* progress-bar */}
            <View className="relative mt-10">
              <View
                style={{ left: `${(fulfilledWish / totalWish) * 100}%` }}
                className="absolute bottom-[12px] -translate-x-[16px]"
              >
                <View className="items-center">
                  <Image
                    source={images.indicator}
                  />
                  <Text className="absolute  font-psemibold">
                    {fulfilledWish}
                  </Text>
                </View>
              </View>
              <View className="w-full h-2 bg-[#ffffffc2] rounded-full">
                <View style={{ width: totalWish > 0 ? `${(fulfilledWish / totalWish) * 100}%` : "0%" }} className="h-2 bg-error rounded-full">

                </View>
              </View>
            </View>
            <View className="flex-row mt-2">
              <TouchableOpacity activeOpacity={0.8} className="h-[40px] mt-5 items-center justify-center px-[24px] bg-white rounded-full">
                <Text
                  style={{ color: color }}
                  className={`font-psemibold text-[18px] leading-[25px]`}>{totalWish} Wishes</Text>
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
                    onChangeText={()=>{}}
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

export default Create