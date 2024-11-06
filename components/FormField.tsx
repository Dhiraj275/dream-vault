import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, TextInputProps } from 'react-native'
import { icons } from '../constants'

interface FormFieldProps extends TextInputProps {
    title: string;
    placeholder?: string;
    value: string;
    handleChangeText: (text: string) => void
    otherStyle?: String

}
const FormField = ({ title, placeholder, value, handleChangeText, otherStyle, ...textInputProps }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(title === "Password")
    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className="text-gray-100 text-base font-pmedium">{title}</Text>
            <View className={`border-2 border-black-200 focus:border-secondary w-full h-16 px-4 rounded-2xl bg-black-100 items-center justify-center flex-row`}>
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    onChangeText={handleChangeText}
                    placeholder={placeholder}
                    secureTextEntry={showPassword}
                    {...textInputProps}
                />
                {
                    title === "Password" &&
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            className="h-6 w-6"
                            resizeMode='contain'
                            source={showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default FormField