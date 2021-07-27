import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../services/User';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class ProfileView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, image: "https://img.icons8.com/color/70/000000/cottage.png", title: "Order" },
                { id: 2, image: "https://img.icons8.com/color/70/000000/administrator-male.png", title: "Like" },
                { id: 3, image: "https://img.icons8.com/color/70/000000/filled-like.png", title: "Comment" },
                { id: 4, image: "https://img.icons8.com/color/70/000000/facebook-like.png", title: "Download" },
                { id: 5, image: "https://img.icons8.com/color/70/000000/shutdown.png", title: "Edit" },
            ],
            userInfo: [],
            token: null
        };

    }

    _storeData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            this.setState({ token: token })
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    };

    getLoggedInUser(token) {
        fetch('https://lab.mediabloo.com/api/v1/me', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userInfo: responseJson.user,
                })
            })
            .catch((error) => {
                // myUtils.showSnackbar(error, errorColor)
            });
    };

    componentDidMount() {
        this._storeData().then(response => {
            this.getLoggedInUser(this.state.token)
        });

    }

    render() {
        const { userInfo } = this.state
        return (
            <View style={styles.container}>
                <StatusBar color="white" />
                <ScrollView style={{ paddingTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", marginBottom: 10 }}>
                        <View style={{ marginTop: 13, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}>
                                <Icon name={"arrow-left"} color='white' size={25} style={{}} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 13, flex: 1, marginRight: 20 }}>
                            <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>My Account</Text>
                        </View>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                            <View style={styles.infoWrapper}>
                                <Text style={styles.name}>{userInfo.name}</Text>
                                <Text style={styles.user}>{userInfo.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Update')}>
                            <View style={styles.box}>
                                <Icon name={"user"} color="#33feba" size={20} />
                                <Text style={styles.title}>Update Profile</Text>
                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Support') }}>
                            <View style={styles.box}>
                                <Icon name={"support"} color="#33feba" size={20} />
                                <Text style={styles.title}>Support</Text>
                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}></View>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                            <View style={styles.box}>
                                <Icon name={"info"} color="#33feba" size={20} />
                                <Text style={styles.title}>About Us</Text>

                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}></View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('FAQ') }}>
                            <View style={styles.box}>
                                <Icon name={"question-circle-o"} color="#33feba" size={20} />
                                <Text style={styles.title}>FAQ's</Text>

                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}></View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Refferal') }}>
                            <View style={styles.box}>
                                <Icon name={"users"} color="#33feba" size={20} />
                                <Text style={styles.title}>Refer a friend</Text>

                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}></View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Orders') }}>
                            <View style={styles.box}>
                                <Icon name={"list-ul"} color="#33feba" size={20} />
                                <Text style={styles.title}>Previous Orders</Text>

                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}></View>
                        <View style={styles.box}>
                            <View style={{ marginTop: 0, flexDirection: "row" }}>
                                <View
                                    style={{
                                        width: '98%',
                                        flexDirection: 'row',
                                        height: 50,
                                        borderRadius: 15,
                                        marginTop: 8,
                                        marginBottom: 8,
                                    }}>
                                    <View style={{ paddingLeft: 5, flex: 1, borderColor: 'white', borderRightWidth: 0, borderWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                        <Icon name={"map-pin"} color="#33feba" size={18} style={{ marginHorizontal: 5 }} />
                                        <TextInput style={styles.input} value={userInfo.address} />
                                    </View>

                                    <View style={{ borderColor: 'white', borderWidth: 1, borderLeftWidth: 0, justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                                        <View style={{ backgroundColor: '#33feba', margin: 5, borderRadius: 7 }}>
                                            <TouchableOpacity style={{ width: 120, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'black' }}>Set Address</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.borderline}>
                        </View>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <View style={styles.box}>
                                <Icon name={"power-off"} color="#33feba" size={20} />
                                <Text style={styles.title}>Logout</Text>
                                <Icon name={"angle-right"} color="#fff" size={25} style={{ left: -10 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderline}>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    logout() {
        AsyncStorage.removeItem('token')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        })
        // this.props.navigation.navigate('SignIn')
    }
}



const styles = StyleSheet.create({
    borderline: {
        margin: 0,
        flexDirection: 'row',
        borderColor: '#000',
        backgroundColor: '#fff',
        borderBottomWidth: 1,

    },
    container: {
        backgroundColor: "#171717",
        flex: 1,
    },
    header: {
        backgroundColor: "#171717",
        paddingVertical: 0,
        paddingHorizontal: 20,
    },
    headerContent: {
        marginLeft: 5,
        top: 10,
        flexDirection: "row",
        // alignItems: 'center',
    },
    name: {
        color: '#33feba',

        fontSize: 20,
        marginLeft: 5,
        marginTop: 10
    },
    user: {
        color: "#fff",
        fontSize: 14,
        marginLeft: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 63,
        marginBottom: 15,
    },
    icon: {
        width: 10,
        height: 40,
        marginLeft: 20
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        marginTop: 0,
        flex: 1
    },
    btn: {
        marginLeft: 'auto',
        width: 40,
        height: 40,
        color: '#33feba'
    },
    body: {
        backgroundColor: "#171717",
        padding: 5
    },
    box: {
        padding: 0,
        marginBottom: 0,
        marginTop: 0,

        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        marginLeft: 10,
        paddingHorizontal: 10
    },
    labelName: {
        color: "#fff", fontSize: 12, marginLeft: 10, left: -12, top: 10
    },
    txtInputView: {
        flexDirection: 'row',
        backgroundColor: "black",
        margin: 6,
        borderWidth: 1,
        borderColor: '#33feba',
        top: 6,
        width: 30,
        marginLeft: 0,
        marginTop: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    txtInputStyle: {
        flex: 1,
        height: 30,
        top: 1,
        color: "#fff",
        lineHeight: 34,
        paddingBottom: 3
    },

    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 5,
        color: 'white'
    },

});