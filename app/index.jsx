
import { Image, View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

export default function Index() {
    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-primary">
            <ScrollView style={{ width: "100%" }}>
                <View className="justify-center items-center px-4 h-[85vh] w-full">

                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />
                    <View className="relative my-5">
                        <Text className="text-3xl text-white font-bold text-center">Explore Endless Possibilities with <Text className="text-secondary-200">Aora</Text></Text>
                        <Image
                            className="absolute w-[126px] h-[12px] -right-8 -bottom-1"
                            resizeMode='contain'
                            source={images.path}
                        />
                    </View>
                    <Text className="text-xs text-gray-100 mt-2 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
                    <CustomButton
                        onPress={()=>router.push("/sign-in")}
                        text={"Continue with Email"}
                        containerStyle={"mt-8 w-full"}
                    />
                </View>
            </ScrollView>
            <StatusBar
                backgroundColor='#161622'
                style='light'
            />
        </SafeAreaView>
    )
}