import { processColor, StyleSheet } from 'react-native';
import AppConfig from './AppConfig';
import { FontSize, Height, Width } from './Dimensions';

const primaryColor = AppConfig.primaryColor
const secondryColor = AppConfig.secondryColor
const primaryColorLite = AppConfig.primaryColorLite
const fontColor = AppConfig.fontColor
const errorColor = AppConfig.errorColor


const defaultFont = AppConfig.regularFonts
const mediumFont = AppConfig.mediumFonts
const boldFont = AppConfig.boldFonts
const buttonFont = AppConfig.buttonFont

const textFont = { fontFamily: defaultFont }
const mediumTextFont = { fontFamily: mediumFont }
const boldTextFont = { fontFamily: boldFont }

const textDefault = {
    color: secondryColor
}
const Headingstyle = StyleSheet.create({
    h2: {
        ...mediumTextFont,
        fontSize: 24
    },
})
const Buttonstyle = StyleSheet.create({
    buttonContainer: {
        backgroundColor: primaryColor,
        paddingVertical: Height(1.3),
        paddingHorizontal: Width(2),
        marginVertical: Height(3),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: Width(100)
    },
    buttonText: {
        color: 'white',
        ...textFont,
        fontSize: FontSize(14)
    },
})
const outLineBtn = StyleSheet.create({
    buttonContainer: {
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 30,
        alignItems: "center",
        marginVertical: 10,
        justifyContent: 'center'
    },
    buttonText: {
        ...mediumTextFont,
    },
})
const Empty = StyleSheet.create({
    coverfill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        backgroundColor: 'white'
    },

    cover: {
        flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center'
    },
    image: {
        height: Width(50),
        width: Width(50)
    },
    text: {
        ...textFont,
        fontSize: FontSize(12)
    }
})
const formDefault = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        marginBottom: 10,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 0,
        color: '#000',
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    inputLoc: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        fontFamily: defaultFont
    },
    icon: {
        position: 'relative',
        top: -2.883,
        paddingBottom: 3,
        paddingRight: 10,
        right: -4
    },
    inputsection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    bottomset: {
        position: "absolute", left: 0, right: 0, bottom: 10, paddingRight: 0, paddingLeft: 30, backgroundColor: '#FEFEFE'
    },
})
const graphColors = [
    processColor("#2ebfc9"),
    processColor("#32b8c2"),
    processColor("#3cbfc9"),
    processColor("#46c5cf"),
    processColor("#51d1db"),
    processColor("#66d5de"),
    processColor("#72d8e0"),
    processColor("#7dd4db"),
    processColor("#94dde3"),
    processColor("#9ed7db"),
    processColor("#aee2e6"),
    processColor("#bce7eb"),
    processColor("#ccedf0"),
    processColor("#dff3f5"),
]
export {
    Buttonstyle, Empty, textFont, formDefault, outLineBtn, primaryColor, secondryColor, defaultFont, textDefault, Headingstyle,
    mediumTextFont, buttonFont, boldTextFont, primaryColorLite, fontColor, errorColor, graphColors
}
