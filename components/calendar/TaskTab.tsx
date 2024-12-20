import { database } from '../../firebase/firebase';
import ChecklistItem from '../../interface/Checklist';
import { ref, set } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import CheckBox from '../../components/CheckBox';
import GlobalContextProps from '../../interface/GlobalContextProps';
import { GlobalContext } from '../../provider/GlobalProvider';
import fetchCheckList from '../../utils/calendar/fetchChecklist';
import CreateNewChecklist from './CreateNewChecklist';
import { images } from '../../constants';
import CustomButton from '../CustomButton';
import { router } from 'expo-router';
import TaskItem from '../common/TaskItem';
import { WishItem } from '../../interface/WishList';
const ChecklistTab = ({ selectedDate }: { selectedDate: string }) => {
    const [dailyTaskList, setDailyTaskList] = useState<WishItem[]>([
        { title: "", checked: false, id: null }
    ])
    const { user } = useContext(GlobalContext) as GlobalContextProps
    useEffect(() => {
        const loadData = async () => {
            if (user?.uid) {
                // setDailyTaskList([...await fetchCheckList(user?.uid), { title: "", checked: false, id: null }])
            }
        }
        loadData()
    }, [])
    const handleCheck = (index: number, id?: string | null,) => {
        if (dailyTaskList?.length) {
            const copy = [...dailyTaskList];
        }
    }
    const onChangeText = (index: number, text: string) => {
        var list = [...dailyTaskList]
        list[index].title = text
        if (!list[index + 1]) {
            list[index + 1] = { title: "", checked: false, id: null }
        }
        setDailyTaskList(list)
    }
    const deleteWishItem = async (id: String | null, index: number) => {
        const wishListTemp = dailyTaskList.filter((_, i) => i !== index);
        setDailyTaskList(wishListTemp);
    }
    if (!dailyTaskList) {
        return <ActivityIndicator size={'large'} className='mt-5' color={"#fff"} />
    }
    else {
        return (
            <View className='mt-4 px-2'>
                {
                    dailyTaskList?.map((item, index) => {
                        return (
                            <View key={index} className='flex-row mt-2'>
                                <TaskItem
                                    linkWishList={() => { }}
                                    key={index}
                                    editModeOn={true}
                                    onChangeText={onChangeText}
                                    wishItem={item}
                                    index={index}
                                    handleCheck={() => { }}
                                    deleteWishItem={deleteWishItem}
                                    placeholder='Task'
                                    showLinkIcon={false}
                                />
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

export default ChecklistTab