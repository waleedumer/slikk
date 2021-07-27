import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Picker,
  Image,
  Modal,
  CheckBox,
  ScrollView,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carSize: 'Select Size',
      packageName: 'Select Package',
      date: 'Select date',
      time: 'Select time',
      subServices: [
        {
          id: 1,
          title: 'Wash & Fold',
          image: require('../../assets/washing.png'),
        },
        {
          id: 2,
          title: 'Dry Cleaning',
          image: require('../../assets/ironing.png'),
        },
        {
          id: 3,
          title: 'Home & Bedding',
          image: require('../../assets/bedding.png'),
        },
        {
          id: 4,
          title: 'Ironing',
          image: require('../../assets/iron.png'),
        },
        {
          id: 5,
          title: 'Repairs',
          image: require('../../assets/handcraft.png'),
        },
      ],
      services: [
        {
          image: require('../../assets/shirts.png'),
          title: 'Shirts',
        },
      ],
      pricings: [
        {
          price: '£ 15.00',
          perItem: 'Shirt (Folded)',
        },
        {
          price: '£ 15.00',
          perItem: 'Shirt (Dinner)',
        },
        {
          price: '£ 15.00',
          perItem: 'Polo Shirt (Folded)',
        },
        {
          price: '£ 15.00',
          perItem: 'Polo Shirt (Hung)',
        },
        {
          price: '£ 15.00',
          perItem: 'Blouse (hung)',
        },
        {
          price: '£ 15.00',
          perItem: 'Suit 3pc',
        },
        {
          price: '£ 15.00',
          perItem: 'Shirt (hung)',
        },
        {
          price: '£ 15.00',
          perItem: '5 Shirt Deal',
        },
      ],
      about: ['Free collection and delivery.', '£25 minimum order.'],
      includes: ['All personal laundry that can be washed & tumble dried.'],
      dontInclude: [
        'Delicate items such silk, wool & cashmere are £1-3 more depending on the garment.',
        'All prices above are From prices, a garment may be upcharged if it is stained badly & require a longer process to clean',
        'Designer items will be upcharged as more time & care is taken on the item to clean properly'
      ],
    };
  }

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  account = () => {
    alert('Account Page Not Implemeted Yet');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{}}>{this.TopBar()}</View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.heading}>Dry Cleaning / Iron</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#2CFDFD" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          <FlatList
            data={this.state.services}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapperTop}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.serviceMainWrapper}>
                  <View style={styles.serviceImageWrapper}>
                    <Image style={styles.image} source={item.image} />
                    <Text style={styles.serviceTagWrapper}>{item.title}</Text>
                  </View>
                </View>
              );
            }}
          />
          <FlatList
            data={this.state.pricings}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.pricingWrapper}>
                  <Text style={styles.priceText}>{item.perItem}</Text>
                  <Text style={styles.price}>{item.price}</Text>
                  <View style={styles.addIconWrapper}>
                    <Icon style={styles.addIcon} name="plus" size={15} />
                  </View>
                </View>
              );
            }}
          />
          <Text
            style={{ fontSize: 20, color: '#2CFDFD', paddingHorizontal: 20 }}>
            About our Service
          </Text>
          <FlatList
            data={this.state.about}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.includesWrapper}>
                  <Icon
                    name="chevron-right"
                    style={styles.icon}
                    color="white"
                    size={14}
                  />
                  <Text style={styles.includeText}>{item}</Text>
                </View>
              );
            }}
          />


          <Text
            style={{ fontSize: 20, color: '#2CFDFD', paddingHorizontal: 20 }}>
            Important Notice
          </Text>
          <FlatList
            data={this.state.dontInclude}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.includesWrapper}>
                  <Icon
                    name="times"
                    style={styles.icon}
                    color="white"
                    size={14}
                  />
                  <Text style={styles.includeText}>{item}</Text>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.checkoutBtnWrapper}>
            <View>
              <Text style={styles.btnTxt}>Checkout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  TopBar() {
    return (
      <View style={{ backgroundColor: '#fff', marginBottom: 20 }}>
        <FlatList
          data={this.state.subServices}
          keyExtractor={(item) => item.id}
          numColumns={1}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                key={index.toString()}
                style={{
                  borderRadius: 15,
                  padding: 0,
                  marginHorizontal: 10,
                  marginVertical: 5,
                  marginTop: 0,
                }}>
                <View
                  style={{
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => { }}>
                    <Image
                      source={item.image}
                      style={{
                        marginTop: 10,
                        textAlign: 'center',
                        height: 40,
                        width: 60,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ top: 10 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'black',
                        textAlign: 'center',
                      }}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  pricingWrapper: {
    flexDirection: 'row',
    backgroundColor: '#2CFDFD',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30
  },
  priceText: {
    flex: 1,
    fontSize: 16,

  },
  price: {
    marginRight: 20,
    fontSize: 16,
  },
  addIconWrapper: {
    backgroundColor: 'white',
    height: 22,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  serviceMainWrapper: {
    backgroundColor: 'white',
    marginBottom: 0,
    borderRadius: 10,
  },
  includeText: {
    color: 'white',
    marginLeft: 10,
  },
  includesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  listWrapper: {
    padding: 20,
  },
  listWrapperTop: {
    padding: 20,
    paddingBottom: 0
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
  serviceImageWrapper: {},
  serviceTagWrapper: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    color: '#00969D',
  },
  serviceTextWrapper: {
    padding: 10,
  },
  checkoutBtnWrapper: {
    backgroundColor: '#2CFDFD',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  mainContainer: {
    justifyContent: 'flex-start',
    marginTop: 15,
    height: '100%',
    flex: 1,
    backgroundColor: 'black'
  },
  accountIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  servicesScroller: {
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    fontSize: 20,
  },
});
