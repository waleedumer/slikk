import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, FlatList, Text, ScrollView, View, StyleSheet, Image, TextInput, Share } from 'react-native';
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAQS = [
    {
        num: 1,
        question: 'How to use it?',
        answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
        num: 2,
        question: 'Cash On Services Available?',
        answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
        num: 3,
        question: 'Is there any subscription plan?',
        answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
        num: 4,
        question: 'What are the delivery charges?',
        answer: 'Lorem Ipsum is a dummy text for content'
    },

];

const Item = ({ question, answer, num }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{num}- {question}</Text>
        <Text style={styles.desc}>{answer}</Text>
    </View>
);
const renderItem = ({ item, index }) => (
    <Item question={item.question} answer={item.answer} num={index + 1} />
);

export default class FAQ extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faqs: [],
            token: null
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

    getFAQs(token) {
        fetch('https://lab.mediabloo.com/api/v1/faqs', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(token),
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    faqs: responseJson.data,
                })
                console.log(responseJson.data)
            })
            .catch((error) => {
                console.log(error)
            });
    };

    componentDidMount() {
        this._storeData().then(response => {
            // this.getLoggedInUser(this.state.token)
            this.getFAQs(response)
        });

    }


    render() {
        const { faqs } = this.state
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View style={{ marginTop: 13, marginLeft: Width(0) }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Account') }}>
                            <Icon name={"arrow-left"} color='white' size={Width(7)} style={{}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 13, flex: 1, marginRight: Width(7) }}>
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>FAQ's</Text>
                    </View>
                </View>
                <ScrollView style={styles.aboutcontainer}>
                    <FlatList
                        data={faqs}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        color: '#33feba',
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
        height: '100%',
        paddingTop: 40
    },
    aboutcontainer: {
        backgroundColor: 'transparent',
        marginTop: 30,
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
});
