import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import CustomButton from '../../components/CustomButton'
import { auth } from '../../firebase/firebase'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { GlobalContext } from '../../provider/GlobalProvider'
import GlobalContextProps from "../../interface/GlobalContextProps"
import backupTransaction from "../../utils/transactions/backupTransaction"
const Profile = () => {
  const context = useContext(GlobalContext) as GlobalContextProps
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <CustomButton
        containerStyle={"mt-5 px-5"}
        text="Sign out"
        onPress={() => { signOut(auth); router.replace("/"); context.setUser(null) }}
      />
      {context.user?.uid &&
        <CustomButton
          containerStyle={"mt-5 px-5"}
          text="Backup Transaction"
          onPress={() => { backupTransaction(context.user?.uid || "") }}
        />
      }
    </View>
  )
}

export default Profile