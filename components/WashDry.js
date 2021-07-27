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
      subServices: [
        {
          id: 1,
          title: 'Wash & Fold',
          image: require('../assets/washing.png'),
        },
        {
          id: 2,
          title: 'Dry Cleaning',
          image: require('../assets/ironing.png'),
        },
        {
          id: 3,
          title: 'Home & Bedding',
          image: require('../assets/bedding.png'),
        },
        {
          id: 4,
          title: 'Ironing',
          image: require('../assets/iron.png'),
        },
        {
          id: 5,
          title: 'Repairs',
          image: require('../assets/handcraft.png'),
        },
      ],
      services: [
        {
          image: require('../assets/mwtd.png'),
          title: 'All Colours Washed Together',
        },
      ],
      pricings: [
        {
          price: '£ 15.00',
          perItem: 'Each 5 kg',
          cartIndex: null,
          selected: false
        },
      ],
      about: ['Free collection and delivery.', '£25 minimum order.'],
      includes: ['All personal laundry that can be washed & tumble dried.'],
      dontInclude: [
        'Dry clean only items',
        'Items that cannot be tumble dried',
        'Duvets',
        'Bath mats',
        'Large items like bed spreads & mattress toppers',
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
          <Text style={styles.heading}>Mixed Wash & Tumble Dry</Text>
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
                    {item.selected == false ?
                      <View>
                        <TouchableOpacity onPress={() => {
                          item.selected = true
                          console.log(this.state.pricings)
                        }}>
                          <Icon style={styles.addIcon} name="plus" size={15} />
                        </TouchableOpacity>
                      </View>
                      :
                      <View>
                        <TouchableOpacity onPress={() => {
                          item.selected = false
                          console.log(this.state.pricings)
                        }}>
                          <Icon style={styles.addIcon} name="remove" size={15} />
                        </TouchableOpacity>
                      </View>
                    }
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
            Safe to Include
          </Text>
          <FlatList
            data={this.state.includes}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.includesWrapper}>
                  <Icon
                    name="check"
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
            Do not Include
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
    marginBottom: 20,
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
