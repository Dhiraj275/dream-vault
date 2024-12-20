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
const ChecklistTab = ({ selectedDate }: { selectedDate: string }) => {
    const [dailyTaskTemplate, setDailyTaskTemplate] = useState<ChecklistItem[] | null>([])
    const { user } = useContext(GlobalContext) as GlobalContextProps
    const [editModeOn, setEditModeOn] = useState<boolean>(false)
    useEffect(() => {
        const loadData = async () => {
            if (user?.uid) {
                setDailyTaskTemplate(await fetchCheckList(user?.uid))
            }
        }
        loadData()
    }, [])
    const handleCheck = (index: number, id?: string | null,) => {
        if (dailyTaskTemplate?.length) {
            const copy = [...dailyTaskTemplate];

            if (copy[index].checkedDates.includes(selectedDate)) {
                const copy = [...dailyTaskTemplate];
                var deletedArr = copy[index].checkedDates.filter((item) => item !== selectedDate)
                copy[index].checkedDates = deletedArr;
                setDailyTaskTemplate(copy)
                if (id) {
                    const checklistItemRef = ref(database, `users/${user?.uid}/checklist/${id}/checkedDates`);
                    set(checklistItemRef, copy[index].checkedDates)
                }

            }
            else {
                copy[index].checkedDates.push(selectedDate)
                setDailyTaskTemplate(copy)
                if (id) {
                    const checklistItemRef = ref(database, `users/${user?.uid}/checklist/${id}/checkedDates`);
                    set(checklistItemRef, copy[index].checkedDates)
                }
            }

        }
    }
    if (!dailyTaskTemplate) {
        return <ActivityIndicator size={'large'} className='mt-5' color={"#fff"} />
    }
    else if (editModeOn) {
        return (<View className='mt-4 px-2'>
            <CreateNewChecklist setEditMode={setEditModeOn} />
        </View>)
    }
    else {
        return (
            <View className='mt-4 px-2'>
                <View className="flex-row mb-4">

                    <CustomButton onPress={()=>setEditModeOn(true)} textStyle='text-sm' containerStyle='px-4 bg-white min-h-[35px] rounded-md mt-4' text='Edit' />
                </View>
                {
                    dailyTaskTemplate.length ?
                        dailyTaskTemplate?.map((item, index) => {
                            return (
                                <View key={index} className='flex-row mt-2'>
                                    <CheckBox link={null}
                                        checked={item.checkedDates ? item.checkedDates.includes(selectedDate) : false}
                                        id={item.id}
                                        editModeOn={false} index={index} label={item.title} onChange={handleCheck} />
                                </View>
                            )
                        })
                        :
                        <View className='items-center h-[240px] justify-center'>
                            <Image
                                source={images.noWishlist}
                                className='w-[150px] h-[150px]'
                                resizeMode="contain"
                            />
                            <Text className='text-white font-pbold text-[16px]'>No Checklist Found</Text>
                            <CustomButton
                                textStyle='text-xs' containerStyle='px-2 min-h-[35px] rounded-md mt-2'
                                onPress={() => setEditModeOn(true)} text="Create" />
                        </View>
                }
            </View>
        )
    }
}

export default ChecklistTab