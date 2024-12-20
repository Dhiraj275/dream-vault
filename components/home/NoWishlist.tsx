import { images } from "../../constants"
import { Image, Text, View } from "react-native"
import CustomButton from "../CustomButton"
import { router } from "expo-router"

const NoWishlistFound = () => {
    return (
        <View className='items-center h-[600px] flex-1 justify-center'>
            <Image
                source={images.noWishlist}
                className='w-[200px] h-[200px]'
                resizeMode="contain"
            />
            <Text className='text-white font-pbold text-[20px]'>No Wishlist Found</Text>
            <CustomButton onPress={() => router.push("/create")} containerStyle="w-[200px]" text="Create New" />
        </View>
    )
}
export default NoWishlistFound