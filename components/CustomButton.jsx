import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
const CustomButton = ({ text, containerStyle, onPress, textStyle, isLoading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[48px] ${containerStyle}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton