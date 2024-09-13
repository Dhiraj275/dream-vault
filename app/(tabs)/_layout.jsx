import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"
const TabIcon = ({ icon, color, focused, name }) => {
  return (
    <View className="flex items-center content-center">
      <Image
        source={icon}
        tintColor={color}
        resizeMode='contain'
        className="h-5 w-5"
      />
      <Text style={{ color: color }} className="text-xs mt-1">
        {name}
      </Text>
    </View>
  )
}

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          height: 74,
          borderTopColor: "#232533"
        },
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Home"}
              focused={focused}
              color={color}
              icon={icons.home}
            />
          )
        }}
      />
      <Tabs.Screen
        name='bookmark'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Bookmark"}
              focused={focused}
              color={color}
              icon={icons.bookmark}
            />
          )
        }}
      />
       <Tabs.Screen
        name='create'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Create"}
              focused={focused}
              color={color}
              icon={icons.plus}
            />
          )
        }}
      />
       <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Profile"}
              focused={focused}
              color={color}
              icon={icons.profile}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default RootLayout