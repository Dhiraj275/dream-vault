import { images } from '../../constants'
import React from 'react'
import { Image, Text, View } from 'react-native'
interface ProgressBarProps {
    totalWish: number
    fulfilledWish: number

}
const ProgressBar = ({ totalWish, fulfilledWish }: ProgressBarProps) => {
    return (
        <View className="relative mt-10">
            <View
                style={{ left: `${(fulfilledWish || 0) / (totalWish || 1) * 100}%` }}
                className="absolute bottom-[12px] -translate-x-[16px]"
            >
                <View className="items-center">
                    <Image source={images.indicator} />
                    <Text className="absolute font-psemibold">
                        {fulfilledWish || 0}
                    </Text>
                </View>
            </View>
            <View className="w-full h-2 bg-[#ffffffc2] rounded-full">
                <View
                    style={{ width: totalWish ?? 0 ? `${(fulfilledWish || 0) / (totalWish || 1) * 100}%` : "0%" }}
                    className="h-2 bg-error rounded-full"
                />
            </View>
        </View>
    )
}

export default ProgressBar