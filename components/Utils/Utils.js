import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import Snackbarr from 'react-native-snackbar';
import { CommonActions } from '@react-navigation/native';
import moment from "moment"


export default class Utils {

    checkFingerPrintAvailability() {
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => {
                console.log(">>>>>>>>", biometryType)
                return true
            })
            .catch(error => {
                if (error.biometric == undefined) {
                    console.log("FingerPrint is not Available in This device")
                    return false
                }
                if (error.biometric == "Biometrics") {
                    // show message 
                    console.log(error.name)
                }

            });
    }
    getMomentDate(date, type) {
        return (
            moment(date).format(type)
        )
    }



    showSnackbar(message, background, color) {
        Snackbarr.show({
            text: message,
            duration: Snackbarr.LENGTH_LONG,
            backgroundColor: background ? background : primaryColor,
            textColor: color ? color : 'white',
            action: {
                text: 'Ok',
                textColor: 'white',
            },
        });
    }

    showMessagePopup(title, message) {
        setTimeout(() => {
            Alert.alert(title, message,
                [{ text: "Okay", style: "cancel" }],
                { cancelable: true })
        }, 500)
    }

    isEmptyarray(array) {
        if (array == undefined || array == "" || array.length == 0) {
            return true
        } else {
            return false
        }
    }

    isEmptyString(str) {
        return (str == "" || !str)
    }

    renderEmptystate(FnText, image, onAction) {
        return (
            <View style={Empty.cover}>
                <Image
                    style={Empty.image}
                    resizeMode="stretch"
                    source={image ? image : require('../assets/alloy.png')}
                />
                <Text style={Empty.text}>{FnText}</Text>
                {onAction &&
                    <TouchableOpacity activeOpacity={0.9} style={[Buttonstyle.buttonContainer, { width: 200 }]} onPress={() => onAction()}>
                        <Text style={Buttonstyle.buttonText}>Retry</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    renderLoadingstate() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={primaryColor} />
            </View>
        )
    }
    getRandomcolor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var bgColor = "rgba(" + x + "," + y + "," + z + ",0.2)";
        return bgColor
    }

    isValidemail(num) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(num);
    }

    isOnlyNumbersWithDash(text, check) {
        var isvalid = true
        if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/.test(text)) { isvalid = false }
        else {
            if (text.includes(check)) { isvalid = false }
            if (text.includes(" ")) { isvalid = false }
            else { isvalid = true }
        }
        return isvalid
    }

    isOnlyNumbers(text) {
        var isvalid = true
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(text)) { isvalid = false }
        else {
            if (text.includes(" ")) { isvalid = false }
            else { isvalid = true }
        }
        return isvalid
    }

    isOnlyNumbersWithoutDot(text) {
        var isvalid = true
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(text)) { isvalid = false }
        else {
            if (text.includes(" ")) { isvalid = false }
            else { isvalid = true }
        }
        return isvalid
    }

    isOnlyNumbersWithDot(text) {
        var isvalid = true
        if (/[.]+/.test(text)) { isvalid = false }
        else {
            if (text.includes(" ")) { isvalid = false }
            else { isvalid = true }
        }
        return isvalid
    }



    isNonEmptyString(text) {
        var isvalid = true
        if (/^\s+$/.test(text)) {

            isvalid = false
        }
        return isvalid
    }

    isValidmobile(num) {
        var isvalid = false
        if (num != undefined && num != null && num != "" && !isNaN(num)) {
            if (num.startsWith("0") && num.length == 11) {
                isvalid = true
            }
        }
        return isvalid
    }



    hasSpecialChar(str) {
        var iChars = "~`!#$%^&*+=-@[]\\\';,/{}|\":<>?";
        for (var i = 0; i < str.length; i++) {
            if (iChars.indexOf(str.charAt(i)) > -1) {
                return true;
            }
        }
        return false;
    }

    resetAndGo(navigation, routeName) {
        if (navigation && !this.isEmptyString(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: routeName },
                    ],
                })
            );
        }
    }

    renderButton(text, onPress, txtStyle, bgStyle) {
        return (
            <TouchableOpacity
                style={[{ flex: 1 }, bgStyle && bgStyle]}
                onPress={() => onPress()}
                accessibilityRole="button"
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                    locations={[1, 0]}
                    style={[{ alignItems: "center", backgroundColor: primaryColor, borderRadius: 30, alignItems: "center" }]}
                    colors={[AppConfig.primaryColor, 'rgba(240,89,58,1)']}>
                    <Text style={[{ ...textFont, fontSize: 15, padding: 10, color: "#fff" }, txtStyle && txtStyle]}>
                        {text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    renderSecondaryButton(text, onPress, txtStyle, bgStyle) {
        return (
            <TouchableOpacity
                style={[{ flex: 1, backgroundColor: primaryColor, borderRadius: 30, alignItems: "center", justifyContent: "center" }, bgStyle && bgStyle]}
                onPress={() => onPress()}
                accessibilityRole="button"
            >
                <Text style={[{ ...textFont, fontSize: 15, padding: 10, color: "#fff" }, txtStyle && txtStyle]}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }

    hexToRgbA(hex, alpha) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        return ""
    }

    dateLLFormat(date) {
        return moment(date).format("ll")
    }

    getFileExt(path) {
        let ext = ""
        if (!this.isEmptyString(path)) {
            let dotIndx = path.lastIndexOf(".")
            ext = path.substring(dotIndx, path.length)
        }
        return ext
    }

    getSecAsTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        let hStr = h > 0 ? ((h < 10 ? '0' + h : h) + ':') : ""
        let mStr = ((m < 10 ? '0' + m : m) + ':')
        let sStr = ((s < 10 ? '0' + s : s))

        return (`${hStr}${mStr}${sStr}`);
    }

    parseDateTime(dateTime) {
        console.log("Zone", new Date().getTimezoneOffset())
    }

    isVideoType(type) {
        return (!this.isEmptyString(type) && type.startsWith("video"))
    }

    isImageType(type) {
        return (!this.isEmptyString(type) && type.startsWith("image"))
    }

}

