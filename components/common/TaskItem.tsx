import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import CheckBox from '../CheckBox'
import WishList, { WishItem } from '@/interface/WishList'
import { icons } from '@/constants'
interface TaskItemProps {
  wishItem: WishItem,
  handleCheck: (index: number) => void,
  index: number,
  onChangeText: (index: number, text: string) => void,
  deleteWishItem: (id: string | null, index: number) => void,
  editModeOn: boolean | null,
  linkWishList: (id: string | null, index: number) => void,
}
const TaskItem = ({ wishItem, handleCheck, index, onChangeText, editModeOn, deleteWishItem, linkWishList }: TaskItemProps) => {

  return (
    <View className="my-1 flex-row items-center">
      <CheckBox
        link={wishItem.link}
        label={wishItem.title}
        onChangeText={onChangeText}
        index={index}
        checked={wishItem.checked}
        onChange={() => handleCheck(index)}
        editModeOn={editModeOn}
      />
      {
        editModeOn &&
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { deleteWishItem(wishItem.id, index) }}
          >
            <Image
              source={icons.deleteIcon}
              className='w-[25px] h-[25px] ml-2'
              resizeMode='contain'
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { linkWishList(wishItem.id, index) }}
          >
            <Image
              source={icons.linkIcon}
              className='w-[25px] h-[25px] ml-2'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </>
      }

    </View >
  )
}

export default TaskItem