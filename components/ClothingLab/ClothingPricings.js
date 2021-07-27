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
import Clothing from '../../services/Clothing';
import HTML from "react-native-render-html";
import Snackbarr from 'react-native-snackbar';
import FAQs from '../FAQsWidget';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.route.subId)
    this.state = {
      carSize: 'Select Size',
      packageName: 'Select Package',
      date: 'Select date',
      time: 'Select time',
      added: false,
      userInfo: [],
      orderDetails: {
        id: 0,
        title: null,
        subTitle: null,
        meta: [],
        address: { key: 'Address', value: null },
        postCode: { key: 'Post Code', value: null },
      },
      singlePricings: [],
      title: this.props.route.params.title,
      subTitle: this.props.route.params.subTitle,
      subCatId: this.props.route.params.subId,
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
      services: null,
      pricings: [],
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

  componentDidMount() {
    Clothing.getSubCategory(this.state.subCatId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ services: responseJson.data })
        Clothing.getPricings(this.state.subCatId)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ pricings: responseJson.data })
            responseJson.data.forEach((item, index) => {
              this.state.pricings[index].quantity = 0
              this.setState(this.state.pricings)
            })
          })
      })
    Clothing.getLoggedInUser()
      .then((response) => response.json())
      .then(result => {
        this.setState({ userInfo: result.user })
      })
      .catch(error => console.log('error', error));
  }

  render() {
    let url = 'https://lab.mediabloo.com';
    const { services } = this.state
    return (
      <View style={styles.mainContainer}>
        <View style={{}}>{this.TopBar()}</View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 20
          }}>
          <Text style={styles.heading}>{this.state.subTitle}</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#33feba" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          {services != null &&
            <View style={styles.serviceMainWrapper}>
              <View style={styles.serviceImageWrapper}>
                <Image style={styles.image} source={{ uri: url + services.image.url }} />
                <Text style={styles.serviceTagWrapper}>{services.name}</Text>
              </View>
            </View>
          }
          <FlatList
            data={this.state.pricings}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            extraData={this.state.added}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              item.deleted_at = 0;
              return (
                <View style={this.state.pricings[index].quantity > 0 ? styles.pricingWrapperActive : styles.pricingWrapper}>
                  <Text style={this.state.pricings[index].quantity > 0 ? styles.priceTextActive : styles.priceText}>{item.title}</Text>
                  <Text style={this.state.pricings[index].quantity > 0 ? styles.priceActive : styles.price}>£{item.price}</Text>
                  {this.state.pricings[index].quantity > 0 &&
                    <TouchableOpacity style={styles.addIconWrapper} onPress={() => {
                      this.state.pricings[index].quantity = item.quantity - 1;
                      this.setState({ added: item.quantity })
                    }}>
                      <Icon style={styles.addIcon} name="minus" size={15} />
                    </TouchableOpacity>
                  }
                  <Text style={{ marginHorizontal: 20 }}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.addIconWrapper} onPress={() => {
                    this.state.pricings[index].quantity = item.quantity + 1;
                    this.setState({ added: item.quantity })
                  }}>
                    <Icon style={styles.addIcon} name="plus" size={15} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <Text
            style={{ fontSize: 20, color: '#33feba', paddingHorizontal: 20 }}>
            About our Service
          </Text>
          <HTML tagsStyles={{ p: { color: 'white', marginVertical: 10, marginLeft: 30 }, li: { color: 'white' }, ul: { marginLeft: 0, marginTop: 10 } }} contentWidth={100} source={{ html: this.state.services != null && this.state.services.about }} />

          <Text
            style={{ fontSize: 20, color: '#33feba', paddingHorizontal: 20 }}>
            Save to Include
          </Text>
          <HTML tagsStyles={{ p: { color: 'white', marginVertical: 10, marginLeft: 30 }, li: { color: 'white' }, ul: { marginLeft: 0, marginTop: 10 } }} contentWidth={100} source={{ html: this.state.services != null && this.state.services.save_to_include }} />

          <Text
            style={{ fontSize: 20, color: '#33feba', paddingHorizontal: 20 }}>
            Don't Include
          </Text>
          <HTML tagsStyles={{ p: { color: 'white', marginVertical: 10, marginLeft: 30 }, li: { color: 'white' }, ul: { marginLeft: 0, marginTop: 10 } }} contentWidth={100} source={{ html: this.state.services != null && this.state.services.do_not_include }} />
          <FAQs />
          <TouchableOpacity style={styles.checkoutBtnWrapper} onPress={() => {
            console.log(this.state.userInfo)
            this.state.orderDetails.meta = []
            this.state.orderDetails.title = this.state.title
            this.state.orderDetails.subTitle = this.state.subTitle
            this.state.orderDetails.address.value = this.state.userInfo.address
            this.state.orderDetails.postCode.value = this.state.userInfo.postal_code
            let errors = false;

            this.state.pricings.forEach((item, index) => {
              if (item.quantity > 0)
                this.state.orderDetails.meta.push({ key: item.title, value: item.price, quantity: item.quantity })
            })

            if (this.state.orderDetails.meta.length == 0) {
              this.showSnackbar('Select atleast one item!', '#c42828', 'white')
            }
            else {
              this.props.navigation.navigate('Checkout', { orderDetails: this.state.orderDetails })
            }
          }}>
            <View>
              <Text style={styles.btnTxt}>Checkout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
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
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClothingLab') }}>
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
    backgroundColor: '#000',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: '#33feba',
    borderWidth: 2,
  },
  pricingWrapperActive: {
    flexDirection: 'row',
    backgroundColor: '#33feba',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: '#33feba',
    borderWidth: 2,
  },
  priceText: {
    flex: 1,
    fontSize: 16,
    color: 'white'
  },
  priceTextActive: {
    flex: 1,
    fontSize: 16,
    color: 'black'
  },
  price: {
    marginRight: 20,
    fontSize: 16,
    color: 'white'
  },
  priceActive: {
    marginRight: 20,
    fontSize: 16,
    color: 'black'
  },
  checked: {
    marginRight: 10
  },
  addIconWrapper: {
    backgroundColor: 'white',
    height: 26,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  serviceMainWrapper: {
    backgroundColor: 'white',
    marginBottom: 0,
    borderRadius: 10,
    marginHorizontal: 10
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
    padding: 0,
    marginBottom: 30,
    marginTop: 20
  },
  listWrapperTop: {
    padding: 20,
    paddingBottom: 0
  },
  image: {
    resizeMode: 'cover',
    height: 190,
    width: '100%',
  },
  serviceImageWrapper: {
  },
  serviceTagWrapper: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    color: '#00969D',
  },
  serviceTextWrapper: {
    padding: 10,
  },
  checkoutBtnWrapper: {
    backgroundColor: '#33feba',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 40,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  mainContainer: {
    justifyContent: 'flex-start',
    paddingTop: 0,
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
    paddingHorizontal: 15
  },
  heading: {
    color: 'white',
    fontSize: 20,
  },
});
