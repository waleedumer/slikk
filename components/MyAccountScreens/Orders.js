import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TouchableOpacity, FlatList, Text, ScrollView, View, StyleSheet, Image, TextInput, Share } from 'react-native';
import { FontSize, Height, Width, ScreenWidth, ScreenHeight } from '../Utils/Dimensions';
import OrderHistory from '../../services/Orders';

const ORDERSs = [
    {
        title: 'Car Wash',
        img: require('../../assets/carwash.png'),
        amount: '150.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
    {
        title: 'Custom Shoes',
        img: require('../../assets/sneakers1.png'),
        amount: '350.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
    {
        title: 'Dry Cleaning',
        img: require('../../assets/clothing-services.png'),
        amount: '140.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
    {
        title: 'LCD Repair',
        img: require('../../assets/smartphone.png'),
        amount: '60.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
    {
        title: 'Dry Cleaning',
        img: require('../../assets/fashion2.png'),
        amount: '570.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
    {
        title: 'LED Repair',
        img: require('../../assets/smartphone.png'),
        amount: '310.00',
        rating: '5',
        date: '2 May 2021',
        description: 'Lorem Ipsum is a dummy text for content'
    },
];

const Item = ({ title, img, desc, date, amount }) => (
    <View style={styles.item}>
        <View style={styles.orderImage}>
            <Icon name="shopping-cart" size={34} style={styles.image} />
        </View>
        <View style={styles.orderText}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.amount}>£{amount}</Text>
        </View>
    </View>
);
const renderItem = ({ item }) => (
    <Item title={item.service_name} img={item.img} desc={item.sub_service_name} date={item.date} amount={item.total} />
);

export default class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: null
        }
    }

    componentDidMount() {
        OrderHistory.getLoggedInUser()
            .then((response) => response.json())
            .then(result => {
                OrderHistory.getUserOrders(result.user.id)
                    .then((response) => response.json())
                    .then(result => {
                        this.setState({ orders: result.data })
                        console.log(this.state.orders)
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));

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
                        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff", }}>Previous Orders</Text>
                    </View>
                </View>
                <ScrollView style={styles.aboutcontainer}>
                    <FlatList
                        data={this.state.orders}
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
        flexDirection: 'row',
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    image: {
        width: 30,
        height: 30,
    },
    orderImage: {
        width: '22%',
        height: 70,
        marginRight: 10,
        backgroundColor: 'white',
        borderColor: '#33feba',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    amount: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: '#33feba',
        fontSize: 16
    },
    orderText: {
        flex: 1,
    },
    title: {
        color: '#33feba',
        fontSize: 20
    },
    desc: {
        color: 'white'
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
