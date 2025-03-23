import { ref as databaseRef, set } from 'firebase/database'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import TaskItem from '../../components/common/TaskItem'
import { database } from '../../firebase/firebase'
import GlobalContextProps from '../../interface/GlobalContextProps'
import { WishItem } from '../../interface/WishList'
import { GlobalContext } from '../../provider/GlobalProvider'
import fetchUserWishlists from '../../utils/fetchUserWishlists'
import CustomButton from '../CustomButton'
import fetchCheckList from '../../utils/calendar/fetchChecklist'
import ChecklistItem from '../../interface/Checklist'
const CreateNewChecklist = ({ setEditMode, loadDataParent }: { setEditMode: Dispatch<SetStateAction<boolean>>, loadDataParent: ()=>void }) => {
    const [wishList, setWishList] = useState<ChecklistItem[]>([])
    const { user } = useContext(GlobalContext) as GlobalContextProps
    const context = useContext(GlobalContext) as GlobalContextProps;
    const loadData = async () => {
        if (user?.uid) {
            setWishList([...await fetchCheckList(user?.uid), { title: "", checked: false, id: null, checkedDates: [] }])
        }
    }
    useEffect(() => {
        loadData()
    }, [])

    const onChangeText = (index: number, text: string) => {
        var list = [...wishList]
        list[index].title = text
        if (!list[index + 1]) {
            list[index + 1] = { title: "", checked: false, id: null, checkedDates: [] }
        }
        setWishList(list)
    }
    const save = async () => {
        const wishlistRef = databaseRef(database, `users/${context.user?.uid}/checklist`);
        // Add items to the wishlist using the generated key
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
        set(wishlistRef, wishListHashmap).then(async () => {
            if (context.user?.uid) {
                context.setWishList(await fetchUserWishlists(context.user.uid))
                ToastAndroid.showWithGravity(
                    'Checklist updated Successfully',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }

        })
        loadDataParent()
        setEditMode(false)
    };
    const deleteWishItem = async (id: String | null, index: number) => {
        const wishListTemp = wishList.filter((_, i) => i !== index);
        setWishList(wishListTemp);
    }
    return (

        <View>
            <View className="flex-row mb-4">

                <CustomButton onPress={save} textStyle='text-sm' containerStyle='px-4 bg-white min-h-[35px] rounded-md mt-4' text='Save' />
            </View>
            {
                wishList.map((item: WishItem, key: number) => (
                    <TaskItem
                        linkWishList={() => { }}
                        key={key}
                        editModeOn={true}
                        onChangeText={onChangeText}
                        wishItem={item}
                        index={key}
                        handleCheck={() => { }}
                        deleteWishItem={deleteWishItem}
                        placeholder='Task'
                        showLinkIcon={false}
                    />
                ))
            }
        </View>

    )
}

export default CreateNewChecklist