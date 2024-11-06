import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import CustomButton from '../../components/CustomButton'
import { auth } from '../../firebase/firebase'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { GlobalContext } from '../../provider/GlobalProvider'

const Profile = () => {
  const { setUser } = useContext(GlobalContext)
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <CustomButton
        containerStyle={"mt-5 px-5"}
        text="Sign out"
        onPress={() => { signOut(auth); router.replace("/"); setUser(null) }}
      />
    </View>
  )
}

export default Profile