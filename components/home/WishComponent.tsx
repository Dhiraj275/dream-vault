import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { icons, images } from '../../constants'
import { confirmPasswordReset } from 'firebase/auth';
import { router } from 'expo-router';


interface WishComponentProps {
    uri: string;
    title: string;
    totalWish: number;
    fulfilledWish: number;
    isPrivate: boolean;
    color: string;
    id: string
    isVisible: boolean
}

const WishComponent = ({ uri,
    title,
    totalWish,
    fulfilledWish,
    isVisible,
    id,
    isPrivate,
    color,
}: WishComponentProps) => {
    if (isVisible) {
        return (
            <View className="p-4">
                <View
                    style={{ backgroundColor: color }}
                    className={`rounded-[20px] flex-row relative`}
                >
                    <Image
                        source={
                            { uri: uri }
                        }
                        resizeMode='cover'
                        className="h-full w-[120px] rounded-l-[20px]"
                    />
                    <View className="px-2 pr-5 py-4 flex-1">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-white font-pbold text-xl">
                                {title}
                            </Text>
                            <Image
                                resizeMode='contain'
                                source={isPrivate ? icons.lock : icons.friends}
                                className="h-5 w-5"
                            />
                        </View>
                        {/* progress-bar */}
                        <View className="relative mt-10">
                            <View
                                style={{ left: `${((fulfilledWish / totalWish) * 100)}%` }}
                                className="absolute bottom-[12px] -translate-x-[16px]"
                            >
                                {fulfilledWish > 0 && <View className="items-center">
                                    <Image
                                        source={images.indicator}
                                    />
                                    <Text className="absolute  font-psemibold">
                                        {fulfilledWish}
                                    </Text>
                                </View>}
                            </View>
                            <View className="w-full h-2 bg-[#ffffffc2] rounded-full">
                                <View style={{ width: `${(fulfilledWish / totalWish) * 100}%` }} className="h-2 bg-error rounded-full">

                                </View>
                            </View>
                        </View>
                        <View className="flex-row mt-2">
                            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push(`/wish/${id}`)} className="h-[30px] mt-2 items-center justify-center px-[20px] bg-white rounded-full">
                                <Text
                                    style={{ color: color }}
                                    className={`font-bold`}>{totalWish} Wishes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={icons.share}
                        className="h-6 w-6 absolute right-4 top-4"
                        resizeMode='contain'
                    />
                </View>
            </View>
        )
    }
}

export default WishComponent