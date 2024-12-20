//@ts-ignore
import SmsAndroid from 'react-native-get-sms-android';

async function fetchSms() {
    const filter = {
        box: 'inbox',
        indexFrom: 0,
    };

    // Wrap the callback in a Promise
    const smsListGlobal: any[] = await new Promise((resolve, reject) => {
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail: any) => {
                console.log('Failed to fetch SMS: ', fail);
                reject(fail); // Reject the Promise on failure
            },
            (count: number, smsList: string) => {
                resolve(JSON.parse(smsList)); // Resolve the Promise with the SMS list
            }
        );
    });

    return smsListGlobal;
}

export default fetchSms
