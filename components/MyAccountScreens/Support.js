import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Image, TextInput, Share, Linking } from 'react-native';
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';
const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'Hi there, Visit this link and get 20% off on your first order. Create your             account now!',
            url: 'http://labdark.mediabloo.com/register',
            title: 'Slikk'
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {

        }
    } catch (error) {
        alert(error.message);
    }
};
export default class Support extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNo: '3035650857',
            message: '',
            subject: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View style={{ marginTop: 13, marginLeft: Width(0) }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Account') }}>
                            <Icon name={"arrow-left"} color='white' size={Width(7)} style={{}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 13, flex: 1, marginRight: Width(7) }}>
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>Support</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flex: 1, height: '90%', alignItems: 'center' }}>
                    <View style={styles.inner}>
                        <Image style={styles.image} source={require('../../assets/agent.png')} />
                    </View>
                    <Text style={styles.heading3}>Support Center</Text>
                    <Text style={styles.paragraph}>We're here to help you!</Text>
                    <View
                        style={{
                            marginBottom: 10,
                            width: '100%',
                            flexDirection: 'row',
                            height: Height(7),
                            borderRadius: 3,
                            marginTop: 15,
                            backgroundColor: 'white',
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                border: 'none',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <TextInput onChangeText={(text) => { this.setState({ subject: text }) }} style={styles.input} placeholder={'Subject'} />
                        </View>
                    </View>

                    <View
                        style={{
                            marginBottom: 10,
                            width: '100%',
                            height: Height(20),
                            borderRadius: 3,
                            marginTop: 15,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                flex: 1,
                                border: 'none',
                            }}>
                            <TextInput onChangeText={(text) => { this.setState({ message: text }) }} multiline style={{ fontSize: 20, paddingHorizontal: 5 }} placeholder={'Details'} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={this.openWhatsApp} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#33feba', borderRadius: 3, height: Height(7), marginTop: 10, width: '100%' }}>
                        <Icon name="whatsapp" size={32} style={{ marginRight: 10 }} />
                        <Text style={{ color: 'black', fontSize: 20 }}>Submit on Whatsapp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    openWhatsApp = () => {
        let msg = this.state.message;
        let mobile = this.state.mobileNo;
        if (mobile) {
            if (msg) {
                let url =
                    "whatsapp://send?text=" +
                    this.state.subject + ':' + this.state.message +
                    "&phone=92" +
                    this.state.mobileNo;
                Linking.openURL(url)
                    .then(data => {
                        console.log("WhatsApp Opened successfully " + data);
                    })
                    .catch(() => {
                        alert("Make sure WhatsApp installed on your device");
                    });
            } else {
                alert("Please enter message to send");
            }
        } else {
            alert("Please enter mobile no");
        }
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#161616',
        height: '100%',
        paddingTop: 40
    },
    inner: {
        width: 130,
        height: 130,
        backgroundColor: '#343434',
        borderRadius: 300,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 90,
        width: 90,
    },
    input: {
        height: Height(50),
        flex: 1,
        fontSize: 18,
        paddingLeft: 5,

    },
    heading1: {
        margin: 12,
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
        color: '#239EB8',
    },
    heading2: {
        margin: 12,
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
    },
    heading3: {
        margin: 12,
        fontSize: 22,
        color: '#33feba',
        textAlign: 'center',
        marginBottom: 3,
    },
    paragraph: {
        margin: 12,
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
        marginTop: 3,
    },
});
