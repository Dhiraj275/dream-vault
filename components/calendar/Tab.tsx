import React from 'react'
import CheckBox from '../CheckBox'
import ChecklistTab from './ChecklistTab'
import TaskTab from './TaskTab'
import TransactionTab from './TransactionTab'
interface TabProps {
    selectedTab: string,
    selectedDate: string,
}
const Tab = ({ selectedTab, selectedDate }: TabProps) => {

    switch (selectedTab) {
        case "checklist":
            return (<ChecklistTab selectedDate={selectedDate} />)
            break;
        case "task":
            return (<TaskTab selectedDate={selectedDate} />)
            break;
        case "transaction":
            return (<TransactionTab selectedDate={selectedDate} />)
            break;
    }
}

export default Tab