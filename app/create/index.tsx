import ProgressBar from '@/components/WishPage/ProgressBar'
import GlobalContextProps from '@/interface/GlobalContextProps'
import WishList, { WishItem } from '@/interface/WishList'
import fetchUserWishlists from '@/utils/fetchUserWishlists'
import { ref as databaseRef, push, set } from 'firebase/database'
import { ref, uploadBytes } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { Alert, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import ParallaxScrollView from "../../components/ParallaxScrollView"
import { icons, images } from '../../constants'
import { database, storage } from '../../firebase/firebase'
import { GlobalContext } from '../../provider/GlobalProvider'
import pickImage from '../../utils/pickImage'
import { router } from 'expo-router'
const colors = ['#FF6F61', '#36A2EB', '#FFC107', '#28A745', '#F06292']
const Create = ({ title = "Travel", fulfilledWish = 0, totalWish = 0, color = "#28A745" }) => {
  const [wishList, setWishList] = useState<WishItem[]>([{
    title: "",
    checked: false,
    id: ""
  }])
  const context = useContext(GlobalContext) as GlobalContextProps;
  const [wish, setWish] = useState<WishList>({
    title: "",
    localImageURI: "",
    list: [],
    items: {},
    id: "",
    ownerId: "",
    isVisible: true,
    isPrivate: true,
    color: "#28A745",
    date: 0
  })
  const handleCheck = (index: number) => {
    var list = [...wishList]
    list[index].checked = !wishList[index].checked
    setWishList(list)
  }
  const onChangeText = (index: number, text: string) => {
    var list = [...wishList]
    list[index].title = text
    if (!list[index + 1]) {
      list[index + 1] = { title: "", checked: false, id: null }
    }
    setWishList(list)
  }
  const save = async () => {
    const date = Date.now();
    var fileName = null;
    if (wish.localImageURI !== "") {
      const response = await fetch(wish.localImageURI);
      const blob = await response.blob();
      const coverStorageRef = ref(storage, `wish_covers/${context.user?.uid}/${date}.png`);
      await uploadBytes(coverStorageRef, blob);
      fileName = `${date}.png`
    }

    const rawData = {
      ownerId: context.user?.uid,
      title: wish.title,
      isPrivate: true,
      date: date,
      lastUpdateDate: date,
      color: wish.color,
      isVisible: true,
      fileName,
    };

    const wishlistRef = databaseRef(database, "/wishlists");

    // Push the rawData and get a unique key for the wishlist
    const pushResponse = await push(wishlistRef, rawData);

    // Add items to the wishlist using the generated key
    const wishlistItemsRef = databaseRef(database, `/wishlists/${pushResponse.key}/items`);
    const userWishlistRef = databaseRef(database, `users/${context.user?.uid}/wishlists/${pushResponse.key}`);

    await set(userWishlistRef, { isVisible: true })
    var wishListHashmap = {}
    for (let i in wishList) {
      if (wishList[i].title === "") continue;
      wishListHashmap = {
        ...wishListHashmap,
        [Date.now() + i]: {
          ...wishList[i]
        }
      }
    }
    set(wishlistItemsRef, wishListHashmap).then(async () => {
      if (context.user?.uid) {
        context.setWishList(await fetchUserWishlists(context.user.uid))
        ToastAndroid.showWithGravity(
          'Wishlist created Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        Alert.alert("Wishlist created!", "Press OK to navigate to home",
          [
            {
              text: 'OK',
              onPress: () => router.navigate("/"),
              style: 'cancel',
            }]
        )
      }

    })
    if (context.user) {
      context.setWishList(await fetchUserWishlists(context.user.uid))
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <ParallaxScrollView headerImage={
        <TouchableOpacity activeOpacity={0.8} onPress={() => pickImage(wish, setWish)} >
          <Image
            source={wish.localImageURI ? { uri: wish.localImageURI } : images.coverimg}
            className="w-full h-[255px]"
            resizeMode='cover'
          />
        </TouchableOpacity>
      }
        headerBackgroundColor={{ dark: "#fff", light: "#fff" }}
      >
        <View className="-translate-y-6">
          <View style={{ backgroundColor: wish.color }} className="px-6 relative pr-5 py-6 rounded-3xl">
            <View className="flex-row items-center gap-2">
              <TextInput onChangeText={(text) => setWish({ ...wish, title: text })} placeholder={title} placeholderTextColor={"#FFFFFF"} className="text-white font-pbold text-xl w-full h-[35px]">

              </TextInput>
            </View>
            <ProgressBar totalWish={wish.totalWish || 0} fulfilledWish={wish.fulfilledWish || 0} />
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
                wishList.map((item: WishItem, key: number) => (
                  <TaskItem
                    linkWishList={() => { }}
                    key={key}
                    editModeOn={true}
                    onChangeText={onChangeText}
                    wishItem={item}
                    index={key}
                    handleCheck={handleCheck}
                    deleteWishItem={() => { }}
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