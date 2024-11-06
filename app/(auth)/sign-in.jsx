import { Link, Redirect, router } from 'expo-router'
import React, { useContext, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { images } from '../../constants'
import { login } from '../../services/authService'
import { GlobalContext } from '../../provider/GlobalProvider'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    setIsLoading(true)
    try {
      const user = await login(formData.email, formData.password);
      if (user) router.push("/home")
    }
    catch (e) {
      switch (e) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. It should be at least 6 characters long.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.");
          break;
        default:
          setError("An unexpected error occurred. Please try again.");
          break;
      }
    }
    setIsLoading(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="justify-center px-4 h-[85vh] w-full">
          <Image
            source={images.logo}
            className="w-[180px] h-[64px]"
            resizeMode='contain'
          />
          <Text className="text-2xl font-semibold text-white font-psemibold mt-7">Login to DreamVault</Text>
          {
            error !== ""
            &&
            <View
              className="p-2 bg-yellow-500 rounded-sm mt-2 min-h-[35px]  justify-center"
            >
              <Text
                className="font-pmedium"
              >{error}</Text>
            </View>
          }
          <FormField autoCapitalize='none' onChangeText={(t) => { setFormData({ ...formData, email: t }) }} title={"Email"} keyboardType='email-address' otherStyle={"mt-4"} />
          <FormField autoCapitalize='none' onChangeText={(t) => { setFormData({ ...formData, password: t }) }} title={"Password"} otherStyle={"mt-4"} />
          <CustomButton
            isLoading={isLoading}
            containerStyle={"mt-5"}
            text="Sign In"
            onPress={handleLogin}
          />
          <View className="justify-center flex-row gap-2 mt-2 font-pregular">
            <Text className="text-gray-100 text-lg">Don't have an Account?</Text>
            <Link href={"/sign-up"} className='text-secondary text-lg'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn