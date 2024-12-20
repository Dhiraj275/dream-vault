import Backdrop from '../../components/common/Backdrop'
import GlobalContextProps from '../../interface/GlobalContextProps'
import { GlobalContext } from '../../provider/GlobalProvider'
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

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

    return (
        <Backdrop open={open} setOpen={setOpen}>
            <View>
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
            </View>
        </Backdrop>
    )
}
export default WishListWrap