import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, SafeAreaView, FlatList, Text, ScrollView, View, StyleSheet, Image, TextInput, Share } from 'react-native';
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbarr from 'react-native-snackbar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            token: null,
            check: 'hell'
        }
    }

    _storeData = async () => {
        try {
            let token = await AsyncStorage.getItem('token');
            this.setState({ token: token })
            return token
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
                console.log(responseJson.user)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    componentDidMount() {
        this._storeData().then(response => {
            // this.getLoggedInUser(this.state.token)
            this.getLoggedInUser(response)
        });

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

    googlePlaces = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Enter Postcode to get address"
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed="auto"
                fetchDetails={true}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                    console.log(data);
                    this.state.userInfo.address = data.description
                    // this.setState(userInfo)

                    this.state.userInfo.postal_code = data.structured_formatting.main_text
                    this.setState(this.state.userInfo)
                }}
                getDefaultValue={() => {
                    return '';
                }}
                query={{
                    key: 'AIzaSyDXMkw6PIHe8Ov_GNxRtc7GAQUfrvV6F1k',
                    language: 'en',
                    types: '(regions)',
                }}
                textInputProps={{ placeholderTextColor: 'white' }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: 'white',
                    },

                    textInput: {
                        backgroundColor: 'transparent',
                        padding: 0,

                        color: 'white',
                        marginLeft: 10,
                        marginTop: -1,
                        marginBottom: 0
                    },
                    poweredContainer: {
                        display: 'none'
                    },
                    container: {
                        color: 'white',
                        backgroundColor: 'white',
                        height: 20
                    }
                }}
                currentLocation={false}
                currentLocationLabel="Current location"
                nearbyPlacesAPI="GooglePlacesSearch"
                GoogleReverseGeocodingQuery={{
                }}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    types: 'food',
                }}
                filterReverseGeocodingByTypes={[
                    'locality',
                    'administrative_area_level_3',
                ]}
                debounce={200}
            />
        )
    }

    updateInfo = () => {
        const { token, userInfo } = this.state
        console.log(userInfo)
        console.log(userInfo.id)
        fetch('https://lab.mediabloo.com/api/v1/users/' + userInfo.id + '?' + new URLSearchParams(userInfo), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.showSnackbar("Record Updated Successfuly!", '#326c0f', 'white')
            })
            .catch((error) => {
                this.showSnackbar("Record isn't updated!", '#F26A6A', 'white')
                console.log(error)
            });
    }

    render() {
        const { userInfo } = this.state
        return (
            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 0, }}>
                    <View style={{ marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Account') }}>
                            <Icon name={"arrow-left"} color='white' size={Width(7)} style={{}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginRight: Width(7) }}>
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>Update Profile</Text>
                    </View>
                </View>


                <View style={styles.aboutcontainer}>
                    <View style={styles.profileWrapper}>
                        {/* <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} /> */}
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                            <View>

                            </View>
                            <View style={styles.fieldWrapper}>
                                <View style={styles.lablewrapper}>
                                    <Icon name="user" size={18} color="#33feba" />
                                    <Text style={styles.label}>Full Name</Text>
                                </View>
                                <View style={styles.inputsWrapper}>
                                    <TextInput style={styles.input} onChangeText={(text) => { this.state.userInfo.name = text; this.setState(userInfo) }} value={userInfo.name} />
                                </View>
                            </View>
                            <View style={styles.fieldWrapper}>
                                <View style={styles.lablewrapper}>
                                    <Icon name="envelope" size={18} color="#33feba" />
                                    <Text style={styles.label}>Email</Text>
                                </View>
                                <View style={styles.inputsWrapper}>
                                    <Text style={styles.inputEmail}>{userInfo.email}</Text>
                                </View>
                            </View>
                            <View style={styles.fieldWrapper}>
                                <View style={styles.lablewrapper}>
                                    <Icon name="phone" size={18} color="#33feba" />
                                    <Text style={styles.label}>Contact</Text>
                                </View>
                                <View style={styles.inputsWrapper}>
                                    <TextInput onChangeText={(text) => { userInfo.contact = text; this.setState({ userInfo }) }} style={styles.input} value={userInfo.contact} />
                                </View>
                            </View>
                            <View style={styles.fieldWrapper}>
                                <View style={styles.lablewrapper}>
                                    <Icon name="location-arrow" size={18} color="#33feba" />
                                    <Text style={styles.label}>Postcode</Text>
                                </View>
                                <View style={styles.inputsWrapper}>
                                    <TextInput onChangeText={(text) => { this.state.userInfo.postal_code = text; this.setState(userInfo) }} style={styles.input} value={userInfo.postal_code} />
                                </View>
                            </View>
                            <View style={styles.fieldTextWrapper}>
                                <View style={styles.lablewrapper}>
                                    <Icon name="map-pin" size={18} color="#33feba" />
                                    <Text style={styles.label}>Address</Text>
                                </View>
                                <View style={styles.inputsTextWrapper}>
                                    <TextInput onChangeText={(text) => { this.state.userInfo.address = text; this.setState(userInfo) }} multiline style={styles.inputTextarea} value={userInfo.address} />
                                </View>
                            </View>
                        </ScrollView>
                        {/* <View style={{ borderColor: '#33feba', margin: 10, height: 30, borderWidth: 1, borderRadius: 5, marginBottom: 30, paddingHorizontal: 10, paddingVertical: 7, flex: 1, width: '95%', position: 'relative', top: 0, zIndex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Icon name="map-pin" size={22} color="#33feba" />
                            
                        </View> */}

                    </View>
                    {/* <View style={{ height: "100%" }}>
                        {this.googlePlaces()}
                    </View> */}
                    <TouchableOpacity onPress={this.updateInfo} >
                        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#33feba', borderRadius: 3, height: Height(7), marginTop: 15, width: '100%' }}>
                            <Text style={{ fontSize: 20 }}>Update</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }


}

const styles = StyleSheet.create({
    profileWrapper: {
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#262626',
        borderRadius: 10,
        height: Height(73)
    },
    label: {
        fontSize: 16,
        color: '#33feba',
        marginLeft: 10
    },
    fieldWrapper: {
        width: '100%',
        marginBottom: 18
    },
    fieldTextWrapper: {
        width: '100%',
        marginBottom: 15,
        height: Height(20)
    },
    inputsWrapper: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        height: 40,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center'
    },
    inputsTextWrapper: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        height: 70,
        overflow: 'visible',
        width: '100%',
        borderRadius: 8,
        borderWidth: 1
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        marginBottom: 40,
        marginTop: -70
    },
    item: {
        width: '100%',
        borderColor: '#0B0B0B',
        backgroundColor: '#222222',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
    },
    image: {
        width: 60,
        height: 60,
    },
    orderImage: {
        width: '28%',
        height: 80,
        marginRight: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    amount: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: '#41FDFD',
        fontSize: 16
    },
    orderText: {
        flex: 1,
    },
    title: {
        color: '#41FDFD',
        fontSize: 20,
        marginBottom: 10,
    },
    desc: {
        color: 'white',
        fontSize: 18
    },
    date: {
        color: 'gray',
        marginTop: 5
    },
    icon: {
        color: 'yellow',
    },
    ratings: {
        position: 'absolute',
        flexWrap: 'wrap',
        top: 0,
        right: 0,
        flexDirection: 'row'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonInner: {
        height: 0,
        backgroundColor: 'white'
    },
    container: {
        padding: 24,
        backgroundColor: '#161616',
        paddingBottom: 30,
        height: Height(100),
        paddingTop: 20,
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 0
    },
    aboutcontainer: {
        backgroundColor: 'transparent',
        marginTop: 0,
        paddingBottom: 20,
        height: '100%',
        width: '85%',
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
        color: '#41FDFD',
        marginLeft: 5,
    },
    iconParagraph: {
        color: 'gray',
        marginLeft: 5,
        fontSize: 18
    },
    iconText: {
        marginLeft: 10
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
        color: 'white'
    },
    inputEmail: {
        fontSize: 15,
        paddingLeft: 5,
        color: 'gray',
        justifyContent: 'center'
    },
    inputTextarea: {
        height: 100,
        flex: 1,
        fontSize: 15,
        paddingLeft: 5,
        color: 'white'
    },
    heading1: {
        margin: 12,
        marginBottom: 0,
        fontSize: 40,
        color: 'white',

        color: '#41FDFD',
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
    lablewrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Height(1),
    },
});
