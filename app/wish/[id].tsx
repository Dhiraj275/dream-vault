import ProgressBar from '../../components/WishPage/ProgressBar'
import WishListAction from '../../components/WishPage/WishListAction'
import WishListWrap from '../../components/WishPage/WishListWrap'
import { database } from '../../firebase/firebase'
import GlobalContextProps from '../../interface/GlobalContextProps'
import WishList, { WishItem } from '../../interface/WishList'
import { GlobalContext } from '../../provider/GlobalProvider'
import pickImage from '../../utils/pickImage'
import updateWishList from '../../utils/updateWishList'
import { useGlobalSearchParams } from 'expo-router'
import { ref, remove, set } from 'firebase/database'
import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import ParallaxScrollView from "../../components/ParallaxScrollView"
import fetchWishList from "../../utils/fetchWishList"
import { icons } from '../../constants'
const WishListScreen = () => {
  const [wishList, setWishList] = useState<WishItem[]>([])
  const [filteredWishList, setFilteredWishList] = useState<WishItem[]>([])

  const [wishListMetaData, setWishListMetaData] = useState<WishList>(
    {
      title: "",
      localImageURI: "",
      color: "#28A745",
      list: [],
      items: {},
      id: "",
      ownerId: "",
      isVisible: true,
      isPrivate: true,
      date: 0
    }
  )
  const [open, setOpen] = useState(false)
  const [linkWishItemId, setLinkWishItemId] = useState<null | string | undefined>()
  const glob = useGlobalSearchParams();
  const context = useContext(GlobalContext) as GlobalContextProps
  const [editModeOn, setEditModeOn] = useState<boolean>(false)
  const [checkedFilterOn, setCheckedFilterOn] = useState<boolean>(false)
  const [isBackedUp, setIsBackedUp] = useState<boolean>(true)
  useEffect(() => {
    const fetchData = async () => {
      if (glob.id) {
        const data: WishList = await fetchWishList(glob.id as string);
        setWishList(data.list.sort((a, b) => (Number(b.checked) - Number(a.checked))))
        setFilteredWishList(data.list.sort((a, b) => (Number(b.checked) - Number(a.checked))))
        setWishListMetaData(data);
      } else {
        console.error("No ID found in global search parameters.");
      }
    };

    fetchData();
  }, []);
  const toggleCheckedFilter = () => {
    setCheckedFilterOn(!checkedFilterOn)
    if (checkedFilterOn) {
      setFilteredWishList([...wishList])
    } else {
      setFilteredWishList([...wishList].filter((value) => value.checked))
    }

  }
  const onChangeText = (index: number, text: string) => {
    var list = [...filteredWishList]
    list[index].title = text
    if (!list[index + 1]) {
      list[index + 1] = { title: "", checked: false, id: null }
    }
    setFilteredWishList(list)
    setIsBackedUp(false)
  }
  const handleCheck = (index: number) => {
    const list = [...filteredWishList]
    list[index].checked = !filteredWishList[index].checked
    setFilteredWishList(list)
    setIsBackedUp(false)
  }
  const deleteWishItem = async (id: String | null, index: number) => {
    if (id) {
      await remove(ref(database, `wishlists/${wishListMetaData.id}/items/${id}`))
      setFilteredWishList(filteredWishList.filter((item) => item.id !== id))
    }
    else {
      const wishListTemp = filteredWishList.filter((_, i) => i !== index);
      setFilteredWishList(wishListTemp);
    }
  }

  const toggleEditMode = () => {
    if (filteredWishList[filteredWishList.length - 1]?.title !== "" || !filteredWishList.length) {
      setFilteredWishList([...filteredWishList, { id: null, title: "", checked: false }])
    }
    setEditModeOn(!editModeOn)
  }
  const linkWishList = (id: string | null, index: number) => {
    setLinkWishItemId(id)
    setIsBackedUp(false)
    setOpen(true)
  }
  const attachWishList = (wishListId: string) => {
    return async () => {
      await set(ref(database, `wishlists/${wishListMetaData.id}/items/${linkWishItemId}/link`), wishListId)
      const rawWishList = [...wishList];
      let index = filteredWishList.findIndex((item) => item.id === linkWishItemId)
      rawWishList[index].link = wishListId
      setFilteredWishList(rawWishList)
      setOpen(false)
    }
  }
  return (
    <View className="flex-1 bg-primary relative">
      <ParallaxScrollView
        headerImage={
          <TouchableOpacity activeOpacity={editModeOn ? 0.8 : 1} onPress={
            () => {
              if (editModeOn) {
                pickImage(wishListMetaData, setWishListMetaData)
              }
            }
          } >
            <Image
              source={{ uri: wishListMetaData.localImageURI ? wishListMetaData.localImageURI : wishListMetaData?.coverImage?wishListMetaData?.coverImage:"https://firebasestorage.googleapis.com/v0/b/dream-vault.appspot.com/o/placeholders%2Floading.gif?alt=media&token=e2be0818-f22b-4a90-a840-dad68de5cdad" }}
              className="w-full h-[255px]"
              resizeMode='cover'
            />
          </TouchableOpacity>
        }
        headerBackgroundColor={{ dark: "#fff", light: "#fff" }}
      >
        <View className="-translate-y-6">
          <View style={{ backgroundColor: wishListMetaData.color }} className="px-6 relative pr-5 py-6 rounded-3xl">
            <View className="flex-row justify-between items-center ">
              <View className='flex-row justify-center'>
                <TextInput
                  placeholder={wishListMetaData?.title || "Title"} // Provide fallback
                  placeholderTextColor="#FFFFFF"
                  value={wishListMetaData?.title}
                  onChangeText={(text) => { setWishListMetaData({ ...wishListMetaData, title: text }); setIsBackedUp(false) }}
                  className="text-white font-pbold text-xl min-w-[100px] h-[35px]"
                />
                <Image
                  source={isBackedUp ? icons.cloudDone : icons.cloud}
                  className="h-[35px] w-6 ml-2"
                  resizeMode='contain'
                />
              </View>
              <WishListAction
                wishListMetaData={wishListMetaData}
                setWishListMetaData={setWishListMetaData}
                setIsBackedUp={setIsBackedUp}
              />
            </View>
            <ProgressBar totalWish={wishListMetaData.totalWish || 0} fulfilledWish={wishListMetaData.fulfilledWish || 0} />
            <View className="flex-row mt-2 gap-x-2">
              <TouchableOpacity
                onPress={() => { updateWishList(filteredWishList, wishListMetaData, context.setWishList, setIsBackedUp) }}
                activeOpacity={0.8} className="h-[40px] mt-5 items-center justify-center px-[24px] bg-white rounded-full"
              >
                <Text
                  style={{ color: wishListMetaData?.color || '#000' }}
                  className="font-psemibold text-[18px] leading-[25px]"
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleEditMode}
                activeOpacity={0.8} className="h-[40px] mt-5 items-center justify-center px-[24px] bg-white rounded-full"
              >
                <Text

                  style={{ color: wishListMetaData?.color || '#000' }}
                  className="font-psemibold text-[18px] leading-[25px]"
                >
                  Edit
                </Text>
              </TouchableOpacity>
            
            </View>

          </View>
          <View className="flex-row  mt-6 mx-4">
            <TouchableOpacity onPress={toggleCheckedFilter} activeOpacity={0.8} style={checkedFilterOn && { backgroundColor: "#fff", borderColor: "#fff" }} className='border-[3px] border-secondary-100 rounded-full px-4 h-[45px] justify-center'>
              <Text className='text-secondary font-pbold text-[18px] leading-[45px]' style={checkedFilterOn && { color: "#161622" }}>
                Checked
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 px-5 py-2 bg-primary">
            <View>
              {
                filteredWishList.map((item, key) => (
                  <TaskItem
                    key={key}
                    wishItem={item}
                    index={key}
                    editModeOn={editModeOn}
                    linkWishList={linkWishList}
                    handleCheck={handleCheck}
                    deleteWishItem={deleteWishItem}
                    onChangeText={onChangeText}
                  />
                ))
              }
            </View>
          </View>
        </View>
      </ParallaxScrollView >
      <WishListWrap
        open={open}
        setOpen={setOpen}
        attachWishList={attachWishList}
      />
    </View >
  )
}


export default WishListScreen;
