import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

interface BackdropProps {
    children: React.ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const Backdrop = ({ children, open, setOpen }: BackdropProps) => {
    if (open) {
        return (
            <View style={styles.popup}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => setOpen(false)} style={styles.backdrop}></TouchableOpacity>
                <View style={styles.dialog}>
                    {children}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    popup: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
    },
    backdrop: {
        width: WIDTH,
        height: HEIGHT,
        top: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "#00000099",
        zIndex: 999,
    },
    dialog: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#212121",
        borderRadius: 10,
        zIndex: 999,
        width: WIDTH - 50
    }
})
export default Backdrop