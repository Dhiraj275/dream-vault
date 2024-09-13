import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const Signin = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center px-4 h-[85vh] w-full">
          <Image
            source={images.logo}
            className="h-[35px] w-[115px]"
            resizeMode='contain'
          />
          <Text className="text-2xl font-semibold text-white font-psemibold mt-7">Sign Up to Aora</Text>
          <FormField title={"Username"} keyboardType='email' otherStyle={"mt-4"} />
          <FormField title={"Email"} otherStyle={"mt-4"} />
          <FormField title={"Password"} otherStyle={"mt-4"} />
          <CustomButton
            containerStyle={"mt-5"}
            text="Sign In"
          />
          <View className="justify-center flex-row gap-2 mt-2 font-pregular">
            <Text className="text-gray-100 text-lg">Have an Account already?</Text>
            <Link href={"/sign-in"} className='text-secondary text-lg'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin