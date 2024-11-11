import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from '../CheckBox'
import WishList, { WishItem } from '@/interface/WishList'
interface TaskItemProps {
  wishList: WishItem,
  handleCheck: (index: number) => void,
  index: number,
  onChangeText: (index: number, text: string) => void,
}
const TaskItem = ({ wishList, handleCheck, index, onChangeText }: TaskItemProps) => {

  return (
    <View className="my-1">
      <CheckBox label={wishList.title} onChangeText={onChangeText} index={index} checked={wishList.checked} onChange={() => handleCheck(index)} />
    </View>
  )
}

export default TaskItem