import React from 'react'
import { Image, Text, View } from 'react-native'
import { images } from '../../constants'

const NoTransactionFound = () => {
    return (
        <View className='items-center h-[400px] justify-center'>
            <Image 
                source={images.noTransaction}
                className='w-[200px] h-[200px]'
            />
            <Text className='text-white font-pbold text-[20px]'>No Transaction Found</Text>
        </View>
    )
}

export default NoTransactionFound