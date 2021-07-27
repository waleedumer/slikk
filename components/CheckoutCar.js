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
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbarr from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clothing from '../services/Clothing';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderDetails: this.props.route.params.orderDetails,
      userInfo: null,
      tok: null,
      userInfo: [],
      confirmationModal: false,
      total: 4,
      orderBtnTxt: 'Place Order',
      challengeDetail: [
        {
          id: 1,
          title: 'Car Lab',
          created_at: '2021-01-26 06:43:19',
          updated_at: '2021-01-26 06:43:19',
          deleted_at: null,
        },
        {
          id: 2,
          title: 'Clothing Lab',
          created_at: '2021-01-26 06:43:30',
          updated_at: '2021-01-26 06:43:30',
          deleted_at: null,
        },
        {
          id: 3,
          title: 'Shoes Lab',
          created_at: '2021-01-26 06:43:36',
          updated_at: '2021-01-26 06:43:36',
          deleted_at: null,
        },
      ],
      serviceImages: [
        require('../assets/cars.png'),
        require('../assets/clothing.png'),
        require('../assets/shoes.png'),
        require('../assets/elec.png'),
      ],
      servicesDesc: [
        'Looking for quality car wash service in Lahore that is easy on your pocket and your conscience? We are your go-to place for that!',
        'We offer the best online laundry service in UK and help you get rid of those extra pile of dirty clothes and deliver you fresh clothes.',
        'Shoe repair service, provided by our world champion cobbler and his team to bring your shoes back to life. ',
      ],
      stripe: {
        name: null,
        cardNumber: null,
        expiration: null,
        cvv: null
      }
    };
    this.getToken()

  }

  handlePress(target, owner) { }

  handleChangeTextinput(name, value) { }

  subCategory = () => {
    this.props.navigation.navigate('Detail')
  };

  account = () => {
    this.props.navigation.navigate('Account')

  }

  componentDidMount() {
    Clothing.getLoggedInUser()
      .then((response) => response.json())
      .then(result => {
        this.setState({ userInfo: result.user })
        console.log(this.state.userInfo.id)
      })
      .catch(error => console.log('error', error));
  }

  getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      fetch('https://lab.mediabloo.com/api/v1/me', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(token),
          'Content-Type': 'application/json'
        },
        body: null
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ userInfo: responseJson })
          console.log(this.state.orderDetails)
        })
        .catch((error) => {

        });
    }
    catch (error) {
      alert(error)
    }
  }

  getUserToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      this.setState({ tok: token })
      return token
    }
    catch (error) {
      alert(error)
    }
  }

  placeOrder = async () => {
    const { stripe } = this.state
    let errors = false;

    if (stripe.name == null)
      errors = true;
    if (stripe.cardNumber == null)
      errors = true;
    if (stripe.expiration == null)
      errors = true;
    if (stripe.cvv == null)
      errors = true;

    if (errors) {
      this.showSnackbar('Payment details cannot by empty!', '#c42828', 'white')
    }
    else {
      let token = await AsyncStorage.getItem('token');
      this.setState({ orderBtnTxt: 'Placing Order....' })
      let formdata = {
        "user_id": this.state.userInfo.id,
        "service_id": 1,
        "sub_service_id": 3,
        "sub_service_name": "Car Service",
        "service_name": this.state.orderDetails.title,
        "status": "Active",
        "total": this.getTotal()
      }
      fetch('https://lab.mediabloo.com/api/v1/active-orders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.state.orderDetails.orderid = responseJson.data.id
          this.setState(this.state.orderDetails)
          // var formdata = new FormData();
          // formdata.append("order_id", responseJson.data.id);
          // formdata.append("meta", this.state.orderDetails.meta);
          fetch('https://lab.mediabloo.com/api/v1/order-meta', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + JSON.parse(token),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.orderDetails)
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              this.setState({ orderBtnTxt: 'Place Order' })
              this.confirmModal(true)
              // this.props.navigation.navigate('Home')
            })
            .catch((error) => {

            });
          // this.props.navigation.navigate('Home')
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  getTotal() {
    let total = 0.00;
    this.state.orderDetails.meta.forEach((item, index) => {
      if (item.key == "Total")
        total = item.value
    })
    return total.toFixed(2);
  }

  render() {
    // console.log(this.state.orderDetails)
    const { stripe } = this.state
    let totalt = 0
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.servicesScroller}>
          <View style={styles.mainContainer}>
            <View style={{}}>{this.confirmationModal()}</View>
            <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
              <TouchableOpacity onPress={this.account} style={styles.accountIcon}>
                <Icon name="user" size={26} color="#33feba" />
              </TouchableOpacity>
            </View>
            <View style={styles.headingWrapper}>
              <Text style={styles.heading}>Card Details</Text>
            </View>
            <View style={styles.paymentWrapper}>
              <View style={styles.singlePayment}>
                <Image style={styles.paymmentIcon} source={require('../assets/paypal.png')} />
              </View>
              <View style={styles.singlePayment}>
                <Image style={styles.paymmentIcon} source={require('../assets/americanexpress.png')} />
              </View>
              <View style={styles.singlePayment}>
                <Image style={styles.paymmentIcon} source={require('../assets/mastercard.png')} />
              </View>
              <View style={styles.singlePayment}>
                <Image style={styles.paymmentIcon} source={require('../assets/visa.png')} />
              </View>
            </View>
            <View style={styles.fieldWeapper}>
              <View style={styles.singleField}>
                <Text style={styles.label}>Name on Card</Text>
                <TextInput onChangeText={(text) => {
                  this.state.stripe.name = text;
                  this.setState(stripe)
                }} style={styles.input} placeholder="Mr. Jhon" />
              </View>
              <View style={styles.singleField}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput onChangeText={(text) => {
                  this.state.stripe.cardNumber = text;
                  this.setState(stripe)
                }} keyboardType="numeric" maxLength={16} style={styles.input} />
              </View>
            </View>
            <View style={styles.halfFieldWeapper}>
              <View style={styles.singleHalfField}>
                <Text style={styles.label}>Expiration Date</Text>
                <TextInput onChangeText={(text) => {
                  this.state.stripe.expiration = text;
                  this.setState(stripe)

                }} style={styles.input} maxLength={5} value={this.state.stripe.expiration} placeholder="mm/yy" />
              </View>
              <View style={styles.singleHalfField}>
                <Text style={styles.label}>CVV</Text>
                <TextInput onChangeText={(text) => {
                  this.state.stripe.cvv = text;
                  this.setState(stripe)
                }} keyboardType="number-pad" maxLength={4} style={styles.input} placeholder="123" />
              </View>
            </View>
            <View style={styles.horizontalLine}></View>

            <View style={styles.orderWrapper}>
              <Text style={styles.itemTitle}>{this.state.orderDetails.title}</Text>
              <FlatList
                data={this.state.orderDetails.meta}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  // this.state.total += parseInt(item.id)

                  if (item.key != 'Total') {
                    return (
                      <View
                        style={{
                          backgroundColor: 'none',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: 0,
                          top: 7,
                          margin: 0,
                          marginTop: 0,
                          borderBottomWidth: 1,
                          borderColor: '#a9a9a9',
                          paddingBottom: 3,
                          marginBottom: 10,
                          marginHorizontal: 10
                        }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>{item.key}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: 'white', fontSize: 16 }}>{item.value}</Text>
                        </View>
                      </View>
                    );
                  }
                }}
              />


              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginHorizontal: 10, marginVertical: 5, marginBottom: 0, marginTop: 5, color: '#33feba', fontSize: 20 }}>Total</Text>
                <Text style={{ marginHorizontal: 10, marginVertical: 5, marginTop: 5, color: '#fff', fontSize: 16 }}>£{this.getTotal()}</Text>
              </View>

              <Text style={{ marginHorizontal: 10, marginVertical: 5, marginBottom: 0, marginTop: 15, color: '#33feba', fontSize: 20 }}>{this.state.orderDetails.address.key}</Text>
              <Text style={{ marginHorizontal: 10, marginVertical: 5, marginTop: 0, color: '#fff', fontSize: 16 }}>{this.state.orderDetails.address.value}</Text>

              <Text style={{ marginHorizontal: 10, marginVertical: 5, marginBottom: 0, marginTop: 15, color: '#33feba', fontSize: 20 }}>{this.state.orderDetails.postCode.key}</Text>
              <Text style={{ marginHorizontal: 10, marginVertical: 5, marginTop: 0, color: '#fff', fontSize: 16 }}>{this.state.orderDetails.postCode.value}</Text>
            </View>

            <TouchableOpacity onPress={() => { this.placeOrder() }} style={styles.btnTxt}>
              <View style={styles.checkoutBtnWrapper}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>£{this.getTotal()}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{this.state.orderBtnTxt}</Text>
                  <Icon name="arrow-right" size={18} style={{ marginLeft: 20 }} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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

  confirmModal = (visible) => {
    this.setState({ confirmationModal: visible });
  };

  confirmationModal() {
    const { confirmationModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModal}
        onRequestClose={() => {
          this.confirmModal(!confirmationModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon name="check-circle" color="#fff" size={80} style={styles.confirmIcon} />
            <Text style={styles.packageModalText}>
              Your Order Placed Successfuly!
            </Text>
            <View
              style={{ width: '100%', }}>
              <TouchableOpacity onPress={() => {
                this.confirmModal(false);
                this.props.navigation.navigate('Home')
              }} style={styles.btnTxt}>
                <View style={styles.confrimBtnWrapper}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  orderWrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15
  },
  itemTitle: {
    fontSize: 20,
    color: '#33feba',
    marginLeft: 10
  },
  mainContainer: {
    justifyContent: 'flex-start',
    paddingTop: 15,
    height: '100%',
    flex: 1,
    backgroundColor: 'black'
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#707070',
    marginHorizontal: 40,
    marginVertical: 20
  },
  label: {
    color: 'white',
    fontSize: 20
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#33feba',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    color: '#33feba',
    fontSize: 16
  },
  singleHalfField: {
    width: '45%'
  },
  fieldWeapper: {
    paddingHorizontal: 20
  },
  halfFieldWeapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  singleField: {
    marginBottom: 10
  },
  checkoutBtnWrapper: {
    backgroundColor: '#33feba',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  confrimBtnWrapper: {
    backgroundColor: '#33feba',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 0,
    width: 200
  },
  btnTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  paymentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30
  },
  singlePayment: {
    width: '23%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    resizeMode: 'cover',
    height: 58,
    borderRadius: 5
  },
  paymmentIcon: {
    width: '92%',
    resizeMode: 'cover',
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5,
  },
  servicesScroller: {
    paddingBottom: 100,

  },
  headingWrapper: {
    textAlign: 'left',
    color: 'white',
    fontSize: 24,
    marginTop: 10,
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 30
  },
  heading: {
    color: 'white',
    fontSize: 20,
  },
  headingcolored: {
    color: '#24D8D8',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#000000bf',
    height: 50,
  },
  packagesDetailModalView: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  packageModalText: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#33feba',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    borderColor: '#33feba',
    borderWidth: 1,
    padding: 20,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

