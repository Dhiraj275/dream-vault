import { Redirect, router, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from '../constants';
import { GlobalContext } from '../provider/GlobalProvider';
SplashScreen.preventAutoHideAsync();

export default function Index() {
    const { user, isLoading } = useContext(GlobalContext);
    // Check if we are still loading the user data
    SplashScreen.hideAsync();
    if (isLoading) {
        return <View className="flex-1 items-center justify-center bg-primary">
            <ActivityIndicator />
        </View>
    }
    // If user is authenticated, redirect to the appropriate screen
    if (user) {
        return <Redirect href="/home" />;
    }

    // If user is not authenticated, show the sign-in screen
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-primary">
            <ScrollView style={{ width: "100%" }}>
                <View className="justify-center items-center px-4 h-[85vh] w-full">
                    <Image
                        source={images.logo}
                        className="w-[280px] h-[84px] mb-4"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.thumbnail}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain"
                    />
                    <View className="relative my-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Explore Endless Possibilities with{" "}
                            <Text className="text-secondary-200">DreamVault</Text>
                        </Text>
                        <Image
                            className="absolute w-[126px] h-[12px] right-2 -bottom-1"
                            resizeMode="contain"
                            source={images.path}
                        />
                    </View>
                    <Text className="text-xs text-gray-100 mt-2 text-center">
                        Where creativity meets innovation: embark on a journey of limitless exploration with DreamVault
                    </Text>
                    <CustomButton
                        onPress={() => router.push("/sign-in")}
                        text={"Continue with Email"}
                        containerStyle={"mt-8 w-full"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
