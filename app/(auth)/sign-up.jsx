import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { signUp } from "../../services/authService"
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSignUp = async () => {
    setIsLoading(true)
    setError("")
    try {
      const user = await signUp(formData.username, formData.email, formData.password);
      if (user) router.push("/home")
    }
    catch (e) {
      switch (e) {
        case "auth/username-already-in-use":
          setError("The username is already in use");
          break;
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/invalid-email":
          setError("The email address is not valid.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. It should be at least 6 characters long.");
          break;
        case "auth/operation-not-allowed":
          setError("Email/password accounts are not enabled. Please contact support.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.");
          break;
        case "auth/invalid-credential":
          setError("Invalid credential. Please check your email and password.");
          break;
        case "auth/invalid-verification-code":
          setError("Invalid verification code. Please try again.");
          break;
        case "auth/invalid-verification-id":
          setError("Invalid verification ID. Please request a new verification code.");
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
          <Text className="text-2xl font-semibold text-white font-psemibold mt-7">Sign Up to DreamVault</Text>
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
          <FormField autoCapitalize="none" onChangeText={(t) => setFormData({ ...formData, username: t })} title={"Username"} otherStyle={"mt-4"} />
          <FormField autoCapitalize="none" onChangeText={(t) => setFormData({ ...formData, email: t })} title={"Email"} keyboardType='email-address' otherStyle={"mt-4"} />
          <FormField autoCapitalize="none" onChangeText={(t) => setFormData({ ...formData, password: t })} title={"Password"} otherStyle={"mt-4"} />
          <CustomButton
            containerStyle={"mt-5"}
            text="Sign Up"
            onPress={handleSignUp}
            isLoading={isLoading}
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

export default SignUp