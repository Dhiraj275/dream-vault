import Backdrop from '../../components/common/Backdrop'
import GlobalContextProps from '../../interface/GlobalContextProps'
import { GlobalContext } from '../../provider/GlobalProvider'
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import CustomButton from '../CustomButton'
import { router } from 'expo-router'

const WishListWrap = (
    { open,
        setOpen,
        attachWishList,
    }
        :
        {
            open: boolean,
            setOpen: Dispatch<SetStateAction<boolean>>,
            attachWishList: (wishListId: string) => () => Promise<void>
        }
) => {
    const context = useContext(GlobalContext) as GlobalContextProps
    if (context.wishList) {
        return (
            <Backdrop open={open} setOpen={setOpen}>
                <CustomButton onPress={() => {router.push("/create")}} text='Create' />
                <ScrollView style={{ height: 500 }}>
                    {
                        context.wishList.map((item, index) => (
                            <TouchableOpacity
                                onPress={attachWishList(item.id)}
                                activeOpacity={0.8}
                                key={index}
                                className='flex-row rounded-lg w-full items-center my-2'
                                style={{ backgroundColor: item.color }}
                            >
                                <Image
                                    source={{ uri: item.coverImage }}
                                    resizeMode='cover'
                                    className='w-[60px] h-[60px] rounded-lg'
                                />
                                <Text
                                    className="text-white font-psemibold text-[20px] ml-2"
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </Backdrop>
        )
    }
}
export default WishListWrap