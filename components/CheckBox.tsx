import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CheckBoxProps {
    checked: Boolean;
    onChange: (index: number) => void;
    onChangeText: (index: number, text: string) => void;
    className?: string;
    label: string;
    index: number;
}

const CheckBox = ({ checked = false, onChange, className, label, onChangeText, index }: CheckBoxProps) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(index)} className={`flex-row ${className}`}>
            <View className='border-xl w-[35px] h-[35px] items-center justify-center  rounded-lg border-secondary border-[4px]'>
                {
                    checked &&
                    <Text className='text-secondary text-l'>
                        ✔
                    </Text>}
            </View>
            <View className='relative  ml-3'>
                {checked && <View className='w-full top-[50%] -translate-y-1 h-[4px] absolute bg-secondary z-10'></View>}
                <TextInput
                    style={{ color: checked ? "#D9D9D9" : "#fff", height: 40 }}
                    onChangeText={(t) => onChangeText(index, t)}
                    className="font-psemibold w-auto min-w-[65px] text-2xl" placeholder='Wish' placeholderTextColor={"#fffc"}>{label}</TextInput>
            </View>
        </TouchableOpacity>
    )
}

export default CheckBox