export default interface ChecklistItem {
    title: string; // Example property, adjust as per your data structure
    checked: boolean;
    id: string | null
    checkedDates: string[],
  }
  