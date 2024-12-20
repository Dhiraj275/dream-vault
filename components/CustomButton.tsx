import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from "nativewind"

interface ButtonProps {
  text: string;
  containerStyle?: string;
  onPress: () => void;
  textStyle?: string;
  isLoading?: boolean;
}
const CustomButton = ({ text, containerStyle, onPress, textStyle, isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[48px] ${containerStyle} ${isLoading && "bg-[#ffbf0088]"}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-[18px] leading-[26px] ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton