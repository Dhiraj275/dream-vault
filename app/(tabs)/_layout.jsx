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
        name='calendar'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Calendar"}
              focused={focused}
              color={color}
              icon={icons.calendarIcon}
            />
          )
        }}
      />
      <Tabs.Screen
        name='transactions'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Transactions"}
              focused={focused}
              color={color}
              icon={icons.transactionsIcon}
            />
          )
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name={"Friends"}
              focused={focused}
              color={color}
              icon={icons.friends}
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