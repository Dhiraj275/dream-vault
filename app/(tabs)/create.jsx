import * as DocumentPicker from 'expo-document-picker'
import { ref as databaseRef, push, set } from 'firebase/database'
import { ref, uploadBytes } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import ParallaxScrollView from "../../components/ParallaxScrollView"
import { icons, images } from '../../constants'
import { database, storage } from '../../firebase/firebase'
import { GlobalContext } from '../../provider/GlobalProvider'
const colors = ['#FF6F61', '#36A2EB', '#FFC107', '#28A745', '#F06292']
const Create = ({ title = "Travel", fulfilledWish = 0, totalWish = 0, color = "#28A745" }) => {
  const [wishList, setWishList] = useState([{
    title: "",
    checked: false,
  }])
  const context = useContext(GlobalContext)
  const [wish, setWish] = useState({
    title: "",
    localImageURI: null,
    color: "#28A745"
  })
  const handleCheck = (index) => {
    var list = [...wishList]
    list[index].checked = !wishList[index].checked
    setWishList(list)
  }
  const onChangeText = (index, text) => {
    var list = [...wishList]
    list[index].title = text
    if (!list[index + 1]) {
      list[index + 1] = { title: "", checked: false }
    }
    setWishList(list)
  }
  const pick = () => {
    DocumentPicker.getDocumentAsync({ type: 'image/*' }).then(async result => {
      setWish({ ...wish, localImageURI: result.assets[0].uri })
    })
  }

  const save = async () => {
    const date = Date.now();

    // Assuming the wish object has a localImageURI property for image upload
    const response = await fetch(wish.localImageURI);
    const blob = await response.blob();
    const coverStorageRef = ref(storage, `wish_covers/${context.user.uid}/${date}.png`);
    await uploadBytes(coverStorageRef, blob);

    const rawData = {
      ownerId: context.user.uid,
      title: wish.title,
      isPrivate: false,
      date: date,
      fileType: `png`
    };

    const wishlistRef = databaseRef(database, "/wishlists");

    // Push the rawData and get a unique key for the wishlist
    const pushResponse = await push(wishlistRef, rawData);

    // Add items to the wishlist using the generated key
    const wishlistItemsRef = databaseRef(database, `/wishlists/${pushResponse.key}/items`);
    const userWishlistRef = databaseRef(database, `users/${context.user.uid}/wishlists/${pushResponse.key}`);

    await set(userWishlistRef, { isVisible: true })
    for (let i in wishList) {
      await push(wishlistItemsRef, { ...wishList[i] });
    }

  };

  return (
    <View className="flex-1 bg-primary">
      <ParallaxScrollView headerImage={
        <TouchableOpacity activeOpacity={0.8} onPress={pick} >
          <Image
            source={wish.localImageURI ? { uri: wish.localImageURI } : images.coverimg}
            className="w-full h-[255px]"
            resizeMode='cover'
          />
        </TouchableOpacity>
      }
        headerBackgroundColor={"#fff"}
      >
        <View className="-translate-y-6">
          <View style={{ backgroundColor: wish.color }} className="px-6 relative pr-5 py-6 rounded-3xl">
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
            <View className="flex-row items-center justify-between mt-8">
              <TouchableOpacity onPress={save} activeOpacity={0.8} className="h-[40px]  items-center justify-center px-[24px] bg-white rounded-full">
                <Text
                  style={{ color: color }}
                  className={`font-psemibold text-[18px] leading-[25px]`}>Save</Text>
              </TouchableOpacity>
              <View className="flex-row gap-x-2">
                {
                  colors.map((color, key) => {
                    return (
                      <TouchableOpacity onPress={() => { setWish({ ...wish, color }) }} key={key} style={{
                        backgroundColor: color, borderWidth: color === wish.color ? 4 : 1

                      }} className="h-8 w-8 rounded-full border-white"></TouchableOpacity>
                    )
                  })
                }
              </View>
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
                    onChangeText={onChangeText}
                    wishList={item}
                    index={key}
                    handleCheck={handleCheck}
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