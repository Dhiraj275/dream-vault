import { router } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CheckBoxProps {
    checked: Boolean;
    index: number;
    label: string;
    onChange?: (index: number, id?: string | null,) => void;
    onChangeText?: (index: number, text: string) => void;
    className?: string;
    link: string | null | undefined,
    editModeOn: boolean | null,
    id?: string | null,
    placeholder?: string
}

const CheckBox = ({ checked = false, onChange = () => { }, className, label, onChangeText = () => { }, index, link, editModeOn, id, placeholder = "Wish" }: CheckBoxProps) => {
    return (
        <>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(index, id)} className={`flex-row ${className}`}>
                <View className='border-xl w-[35px] h-[35px] items-center justify-center  rounded-lg border-secondary border-[4px]'>
                    {
                        checked &&
                        <Text className='text-secondary text-l'>
                            ✔
                        </Text>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { link && router.push(`/wish/${link}`) }}
            >
                <View className='relative  ml-3'>
                    {checked && <View className='w-full top-[50%] -translate-y-1 h-[4px] absolute bg-secondary z-10'></View>}
                    <TextInput
                        style={{ color: checked ? "#D9D9D9" : "#fff", height: 40, minWidth: label == "" ? 65 : "auto", textDecorationLine: link ? "underline" : "none" }}
                        onChangeText={(t) => onChangeText(index, t)}
                        className={`font-psemibold w-auto text-2xl`}
                        editable={editModeOn ? editModeOn : false}
                        placeholder={placeholder} placeholderTextColor={"#fffc"}>{label}</TextInput>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default CheckBox