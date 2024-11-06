import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from '../CheckBox'

const TaskItem = ({ wishList, handleCheck, index, onChangeText }) => {
  return (
    <View className="my-1">
      <CheckBox label={wishList.title}  onChangeText={onChangeText} index={index} checked={wishList.checked} onChange={()=>handleCheck(index)} />
    </View>
  )
}

export default TaskItem