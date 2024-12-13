import Tab from '@/components/calendar/Tab';
import CheckBox from '@/components/CheckBox';
import TaskItem from '@/components/common/TaskItem';
import CustomButton from '@/components/CustomButton';
import WishList, { WishItem } from '@/interface/WishList';
import fetchWishList from '@/utils/fetchWishList';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
const today = new Date().toISOString().split('T')[0];
const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTab, setSelectedTab] = useState("checklist")
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString); // Updates the selected date
  };

  return (
    <SafeAreaView className='flex-1 bg-primary'>
      <Calendar
        onDayPress={handleDayPress} // Callback when a day is pressed
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#FF9C01',
          },
        }}
        theme={{
          calendarBackground: '#161622', // Background for the entire calendar
          todayBackgroundColor: '#FFF', // Background for today's date
          todayTextColor: "#161622",
          todayButtonFontFamily: "Poppins-Bold",
          dotColor: '#fff', // Color for dots under days with events
          selectedDayBackgroundColor: '#FF9C01', // Background for selected day
          selectedDayTextColor: '#161622', // Text color for selected day
          dayTextColor: '#ffffff', // Default text color for days
          textDisabledColor: '#666666', // Text color for disabled days
          monthTextColor: '#FF9C01', // Month and year text color
          arrowColor: '#FF9C01', // Color for navigation arrows
          textSectionTitleColor: '#FF9C01', // Color for day headers (e.g., Mon, Tue)
          textDayFontFamily: 'Poppins-Regular', // Font family for day text
          textMonthFontFamily: 'Poppins-Bold', // Font family for month text
          textDayHeaderFontFamily: 'Poppins-Medium', // Font family for day headers
          textDayFontSize: 18, // Font size for day numbers
          textMonthFontSize: 18, // Font size for the month title
          textDayHeaderFontSize: 16, // Font size for day headers
          indicatorColor: '#FF9C01', // Color for activity indicators
        }}
      />
      <Text className='font-pbold mt-2 text-[20px] text-center text-secondary'>{selectedDate.split("-").reverse().join(" / ")}</Text>
      <View className="flex-row px-2 gap-x-2 mt-2">
        <TouchableOpacity onPress={() => {setSelectedTab("checklist")}} activeOpacity={0.8} style={selectedTab==="checklist" && { backgroundColor: "#fff", borderColor: "#fff" }} className='border-[3px] border-secondary-100 rounded-[4px] px-4 h-[35px] justify-center'>
          <Text className='text-secondary font-pbold text-[16px] leading-[32px]' style={selectedTab==="checklist" && { color: "#161622" }}>
            Checklist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelectedTab("task")}} activeOpacity={0.8} style={selectedTab==="task" && { backgroundColor: "#fff", borderColor: "#fff" }} className='border-[3px] border-secondary-100 rounded-[4px] px-4 h-[35px] justify-center'>
          <Text className='text-secondary font-pbold text-[16px] leading-[32px]' style={selectedTab==="task" && { color: "#161622" }}>
            Task
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelectedTab("transaction")}} activeOpacity={0.8} style={selectedTab==="transaction" && { backgroundColor: "#fff", borderColor: "#fff" }} className='border-[3px] border-secondary-100 rounded-[4px] px-4 h-[35px] justify-center'>
          <Text className='text-secondary font-pbold text-[16px] leading-[32px]' style={selectedTab==="transaction" && { color: "#161622" }}>
            Transaction
          </Text>
        </TouchableOpacity>
      </View>
     <Tab selectedTab={selectedTab}/>
    </SafeAreaView>
  )
}

export default Calender