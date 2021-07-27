import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, SafeAreaView, Text, ScrollView, View, StyleSheet, Image, TextInput, Share } from 'react-native';
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';

export default class About extends Component {

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
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>About Us</Text>
                    </View>
                </View>
                <ScrollView style={styles.aboutcontainer}>
                    <Text style={styles.heading1}>Slikk</Text>
                    <Text style={styles.paragraph}>

                        is a London-based, on-demand provider for a range of popular services.
                        From dry cleaning to customisation there are a range of services to suit
                        your lifestyle - all delivered to your doorstep.

                    </Text>
                    <View>
                        <View style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('../../assets/mission.png')} />
                            <Text style={styles.iconHeading}>Our Mission</Text>
                        </View>
                        <View style={styles.iconText}>
                            <Text style={styles.iconParagraph}>
                                Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                        </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('../../assets/plan.png')} />
                            <Text style={styles.iconHeading}>Our Plan</Text>
                        </View>
                        <View style={styles.iconText}>
                            <Text style={styles.iconParagraph}>
                                Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                         </Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('../../assets/vision.png')} />
                            <Text style={styles.iconHeading}>Our Vision</Text>
                        </View>
                        <View style={styles.iconText}>
                            <Text style={styles.iconParagraph}>
                                Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                        </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    update() {

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#161616',
        paddingBottom: 30,
        height: '100%',
        paddingTop: 40
    },
    aboutcontainer: {
        backgroundColor: 'transparent',
        marginTop: 20,
        paddingBottom: 20,
        height: '100%'
    },
    iconWrapper: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 25
    },
    quotes: {
        fontSize: 30,
        paddingRight: 10,
        paddingLeft: 10,
    },
    iconHeading: {
        fontSize: 35,
        color: '#33feba',
        marginLeft: 5,
    },
    iconParagraph: {
        color: 'white',
        marginLeft: 5,
        fontSize: 18
    },
    iconText: {
        marginLeft: 10
    },
    icon: {
        width: 40,
        height: 40
    },
    inner: {
        width: 100,
        height: 100,
        backgroundColor: '#343434',
        borderRadius: 300,
        overflow: 'hidden',

        justifyContent: 'flex-start',
    },
    bgimage: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '40%',
        width: '100%',
        opacity: 0.4,
    },
    bgsolid: {
        backgroundColor: '#014242',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '40%',
        width: '100%',
    },
    bggradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '40%',
        width: '100%',
        backgroundColor: 'linear-gradient(190deg, rgba(255,255,255,0) 0%, #161616 83%)',
    },
    input: {
        height: '88%',
        flex: 1,
        fontSize: 15,
        paddingLeft: 5,
    },
    heading1: {
        margin: 12,
        marginBottom: 0,
        fontSize: 40,
        color: 'white',

        color: '#33feba',
        zIndex: 1,
    },
    heading2: {
        margin: 12,
        fontSize: 28,
        color: 'white',

        zIndex: 1,
    },
    heading3: {
        margin: 12,
        fontSize: 22,
        color: 'white',

        marginBottom: 5,
        zIndex: 1,
    },
    paragraph: {
        margin: 12,
        fontSize: 22,
        color: 'white',
        marginTop: 0,
        zIndex: 1,

    },
});
