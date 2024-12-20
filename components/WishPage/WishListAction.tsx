import { icons } from '../../constants'
import { database } from '../../firebase/firebase'
import GlobalContextProps from '../../interface/GlobalContextProps'
import WishList from '../../interface/WishList'
import { GlobalContext } from '../../provider/GlobalProvider'
import { ref, remove } from 'firebase/database'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View, Share } from 'react-native'
import { useNavigation } from "expo-router"
import fetchUserWishlists from '../../utils/fetchUserWishlists'
interface ShareWishListInterface {
    wishListMetaData: WishList,
    setWishListMetaData: Dispatch<SetStateAction<WishList>>
}

const WishListAction = ({ wishListMetaData, setWishListMetaData }: ShareWishListInterface) => {
    const context = useContext(GlobalContext) as GlobalContextProps
    const navigation = useNavigation()
    const [open, setOpen] = useState<boolean>(false)
    const togglePrivacy = () => {
        setWishListMetaData({
            ...wishListMetaData,
            isPrivate: !wishListMetaData.isPrivate,
        })
        setOpen(!open)
    }
    const deleteWishList = () => {
        Alert.alert("Are you sure?", "This will permanently delete this wishlist.",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        remove(ref(database, `users/${context.user?.uid}/wishlists/${wishListMetaData.id}`)).then(
                           async () => {
                                if (context.user?.uid) {
                                    context.setWishList(await fetchUserWishlists(context.user?.uid))
                                }
                                Alert.alert("Wishlist deleted successfully", "Navigate to home",
                                    [
                                        {
                                            text: 'Okay',
                                            onPress: () => navigation.goBack(),
                                            style: 'default',
                                        },
                                    ]
                                );
                            }
                        )
                    }
                },
            ]
        )
    }
    const shareWishlist = () => {
        if (wishListMetaData.isPrivate) {
            Alert.alert("This wishlist is private", "Do you want to make this wishlist public?",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes', onPress: async () => {
                            context.setWishList(await fetchUserWishlists(wishListMetaData.ownerId))
                            Alert.alert("This wishlist is now Public", "Press Continue to share it with your friends",
                                [
                                    {
                                        text: 'Continue',
                                        onPress: () => Share.share({ message: `Check out my ${wishListMetaData.title} on DreamVault. http://192.168.129.46:3000/wish/${wishListMetaData.id}`, url: `http://192.168.129.46:3000/wish/${wishListMetaData.id}` }),
                                        style: 'default',
                                    },
                                ]
                            );
                        }
                    },
                ]
            )
        }
        else {
            Share.share({ message: `Check out my ${wishListMetaData.title} on DreamVault. http://192.168.129.46:3000/wish/${wishListMetaData.id}`, url: `http://192.168.129.46:3000/wish/${wishListMetaData.id}` })
        }
    }
    return (
        <View>
            <View className="relative z-20">
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setOpen(!open)}
                >
                    <Image
                        source={icons.menu}
                        className="h-6 w-6"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                {
                    open &&
                    <View className='bg-white top-10 right-0 absolute z-20 py-2 w-[150px] rounded-lg'>
                        <TouchableOpacity
                            onPress={togglePrivacy}
                            className='px-2 py-[5px]'>
                            <Text className='font-psemibold text-[16px]'>
                                Make it {wishListMetaData.isPrivate ? "Public" : "Private"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={shareWishlist}
                            className='px-2 py-[5px]'>
                            <Text className='font-psemibold text-[16px]'>
                                Share
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteWishList}
                            className='px-2 py-[5px]'>
                            <Text className='font-psemibold text-[16px]'>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View >
    )
}

export default WishListAction