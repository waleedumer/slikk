import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, SafeAreaView, Text, View, StyleSheet, Image, TextInput, Share } from 'react-native';

import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';
const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'Hi there, Visit this link and get 20% off on your first order. Create your account now! http://labdark.mediabloo.com/register',
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
export default class Refferal extends Component {

    constructor(props) {
        super(props);
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
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>Refer a Friend</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flex: 1, height: '90%', alignItems: 'center' }}>
                    <View style={styles.inner}>
                        <Image style={styles.logo} source={require('../../assets/refferal.png')} />
                    </View>
                    <Text style={styles.heading3}>Refer Your Friend</Text>
                    <Text style={styles.heading1}>Get 20% Off</Text>
                    <Text style={styles.paragraph}>
                        Share below link with your friend and earn points when they signup using
                        refferal link/code.
                </Text>
                    <View
                        style={{
                            width: '90%',
                            flexDirection: 'row',
                            height: 50,
                            borderRadius: 15,
                            marginTop: 25,
                        }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                            <Icon name="clone" style={{ fontSize: 25, marginLeft: 10 }} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white', border: 'none' }}>
                            <TextInput style={styles.input} value={'ADS092'} />
                        </View>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                            <View
                                style={{ backgroundColor: '#33feba', margin: 5, borderRadius: 5 }}>
                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }} onPress={onShare}>
                                    <Text style={{ paddingHorizontal: 10, fontSize: 16, color: 'black' }}>SHARE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'black',
        height: Height(100),
        paddingTop: 40
    },
    inner: {
        width: 170,
        height: 170,
        borderRadius: 300,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        height: 150,
        width: 150,
    },
    input: {
        height: '100%',
        // margin: 12,
        width: '70%',
        flex: 1,
        fontSize: 22,
        marginLeft: 20,
    },
    heading1: {
        margin: 12,
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
        color: '#33feba',
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
        color: 'white',
        textAlign: 'center',
    },
    paragraph: {
        margin: 12,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});
