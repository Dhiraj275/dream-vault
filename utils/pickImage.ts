
import WishList from '../../interface/WishList'
import * as DocumentPicker from 'expo-document-picker'
const pickImage = (wish: WishList, setWish: (wish: WishList) => void) => {
    DocumentPicker.getDocumentAsync({ type: 'image/*' }).then(async result => {
        if (result.assets && result.assets[0]) {
            setWish({ ...wish, localImageURI: result.assets[0].uri });
        } else {
            console.warn("No image selected or an error occurred");
        }
    })
}

export default pickImage