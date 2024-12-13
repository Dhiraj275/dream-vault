import React from 'react'
import CheckBox from '../CheckBox'
import ChecklistTab from './ChecklistTab'
import TaskTab from './TaskTab'
import TransactionTab from './TransactionTab'
interface TabProps {
    selectedTab: string,
}
const Tab = ({ selectedTab }: TabProps) => {

    switch (selectedTab) {
        case "checklist":
            return (<ChecklistTab />)
            break;
        case "task":
            return (<TaskTab />)
            break;
        case "transaction":
            return (<TransactionTab />)
            break;
    }
}

export default Tab