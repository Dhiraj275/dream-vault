import CheckBox from '@/components/CheckBox';
import { WishItem } from '@/interface/WishList';
import fetchWishList from '@/utils/fetchWishList';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
const ChecklistTab = () => {
    const [dailyTaskTemplate, setDailyTaskTemplate] = useState<WishItem[]>()
    useEffect(() => {
        const loadData = async () => {
            setDailyTaskTemplate((await fetchWishList("-ODq2irtCWj469H3ZT8g")).list)
        }
        loadData()
    }, [])
    return (
        <View className='mt-4 px-2'>
            {
                dailyTaskTemplate?.map((item, index) => {
                    return (
                        <View key={index} className='flex-row mt-2'>
                            <CheckBox link={null} checked={item.checked} editModeOn={false} index={index} label={item.title} onChange={() => { }} />
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ChecklistTab