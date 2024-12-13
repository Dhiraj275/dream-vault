import CheckBox from '@/components/CheckBox';
import { WishItem } from '@/interface/WishList';
import fetchWishList from '@/utils/fetchWishList';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
const TaskTab = () => {
    const [dailyTaskTemplate, setDailyTaskTemplate] = useState<WishItem[]>()
    useEffect(() => {
        const loadData = async () => {
            setDailyTaskTemplate((await fetchWishList("-ODq2irtCWj469H3ZT8g")).list)
        }
        loadData()
    }, [])
    return (
        <View className='mt-4 px-2'>
        </View>
    )
}

export default TaskTab