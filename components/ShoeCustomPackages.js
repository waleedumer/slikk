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
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbarr from 'react-native-snackbar';
import Shoes from '../services/Shoes';
import FAQs from '../components/FAQsWidget';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

const url = 'https://lab.mediabloo.com';
export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDesign: 'Select Design',
      selectColour: 'Select Colour',
      faqs: [
        {
          question: 'I am having a question?',
          answer: 'This is the answer'
        },
        {
          question: 'I am having a question?',
          answer: 'This is the answer'
        },
      ],
      selectType: 'Select Type',
      selectSize: 'Select Size',
      selectDelivery: 'Select Delivery Service',
      carSizeModal: false,
      designModal: false,
      typesModal: false,
      sizeModal: false,
      deliveryModal: false,
      openDropdown: false,
      orderDetails: {
        id: 0,
        title: 'Custom Shoes',
        meta: [],
        address: { key: 'Address', value: null },
        postCode: { key: 'Post Code', value: null }
      },
      colorValue: 'null',
      colorItems: [
        { label: 'White', value: 'White' },
        { label: 'Black', value: 'Black' }
      ],
      openTypeDropdown: false,
      typeValue: null,
      typeItems: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' }
      ],
      quantity: 1,
      total: 0,
      price: 0,
      deliveryFee: 0,
      openSizeDropdown: false,
      sizeValue: null,
      sizeItems: [],
      openDeliveryDropdown: false,
      deliveryValue: null,
      deliveryItems: [
        { label: 'Free Delivery       14-21 Days', value: 'Free Delivery', price: 0 },
        { label: 'Fast Track         10 Days £10', value: 'Fast Track', price: 10 },
        { label: 'VIP Delivery        7 Days £15', value: 'VIP Delivery', price: 15 },
      ],
      carPackagesDetailModal: false,
      colorsModal: false,
      colours: [
        {
          id: 1,
          title: 'Red',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Orange',
          image: require('../assets/medium.png'),
        },
        {
          id: 3,
          title: 'Green',
          image: require('../assets/large.png'),
        },
        {
          id: 4,
          title: 'Black',
          image: require('../assets/large.png'),
        },
      ],
      shoeTypes: [
        {
          id: 1,
          title: 'Low',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Medium',
          image: require('../assets/medium.png'),
        },

      ],
      shoeSizes: [
        {
          id: 1,
          title: 'Low',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Medium',
          image: require('../assets/medium.png'),
        },

      ],

      timings: [
        {
          id: 1,
          time: '08:00 am - 10:00 am',
        },
        {
          id: 2,
          time: '10:00 am - 12:00 pm',
        },
        {
          id: 3,
          time: '12:00 pm - 02:00 pm',
        },
        {
          id: 4,
          time: '02:00 pm - 04:00 pm',
        },
        {
          id: 5,
          time: '04:00 pm - 06:00 pm',
        },
      ],
      packages: [],
      subServices: [
        {
          id: 1,
          title: 'Custom Shoes',
          image: require('../assets/scustom.png'),
          navigate: 'ShoeCustomPackages'
        },
        {
          id: 2,
          title: 'Sneaker Clean',
          image: require('../assets/sclear.png'),
          navigate: 'ShoeCleanPackages'
        },
      ],

      token: null
    };
    this.setValue = this.setValue.bind(this);
  }

  handlePress(target, owner) { }

  handleChangeTextinput(name, value) { }

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  account = () => {
    // this.props.navigation.navigate('Account')
    alert('Account Page Not Implemeted Yet');
  };

  _storeData = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      this.setState({ token: token })
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  };

  getPrices(token) {
    fetch('https://lab.mediabloo.com/api/v1/custom-shoe-packages', {
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
          sizeItems: responseJson.data,
        })
      })
      .catch((error) => {
        // myUtils.showSnackbar(error, errorColor)
      });
  };

  componentDidMount() {
    this._storeData().then(response => {
      this.getPrices(this.state.token)
    });

    Shoes.getShoeDesigns()
      .then((response) => response.json())
      .then(response => {
        this.setState({ packages: response.data })
        console.log(this.state.packages)
      })

  }

  designModalVisible = (visible) => {
    this.setState({ designModal: visible });
  };

  colorsModalVisible = (visible) => {
    this.setState({ colorsModal: visible });
  };

  typesModalVisible = (visible) => {
    this.setState({ typesModal: visible });
  };

  sizeModalVisible = (visible) => {
    this.setState({ sizeModal: visible });
  };

  deliveryModalVisible = (visible) => {
    this.setState({ deliveryModal: visible });
  };


  // Colors Dropdown Functions
  setOpen = (openDropdown) => {
    this.setState({
      openDropdown
    });
  }

  setValue = (callback) => {
    console.log('callback')
    this.setState(state => ({
      colorValue: callback(state.colorValue)
    }));
  }

  setItems = (callback) => {
    console.log('callback')
    this.setState(state => ({
      colorItems: callback(state.colorItems)
    }));
  }
  // Type Dropdown Functions
  setTypeOpen = (openTypeDropdown) => {
    this.setState({
      openTypeDropdown
    });
  }

  setTypeValue = (callback) => {
    this.setState(state => ({
      typeValue: callback(state.typeValue)
    }));
  }

  setTypeItems = (callback) => {
    this.setState(state => ({
      typeItems: callback(state.typeItems)
    }));
  }

  // Size Dropdown Functions
  setSizeOpen = (openSizeDropdown) => {
    this.setState({
      openSizeDropdown
    });
  }

  setSizeValue = (callback) => {
    this.setState(state => ({
      colorValue: callback(state.sizeValue)
    }));
  }

  setSizeItems = (callback) => {
    this.setState(state => ({
      colorItems: callback(state.sizeItems)
    }));
  }

  // Delivery Dropdown Functions
  setDeliveryOpen = (openDeliveryDropdown) => {
    this.setState({
      openDeliveryDropdown
    });
  }

  setDeliveryValue = (callback) => {
    this.setState(state => ({
      deliveryValue: callback(state.deliveryValue)
    }));
  }

  setDeliveryItems = (callback) => {
    this.setState(state => ({
      deliveryItems: callback(state.deliveryItems)
    }));
  }

  render() {
    const { openDropdown, colorValue, colorItems } = this.state;
    const { openTypeDropdown, typeValue, typeItems } = this.state;
    const { openSizeDropdown, sizeValue, sizeItems } = this.state;
    const { openDeliveryDropdown, deliveryValue, deliveryItems } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={{}}>{this.TopBar()}</View>
        <View style={{}}>{this.designModal()}</View>
        <View style={{}}>{this.colorModal()}</View>
        <View style={{}}>{this.typesModal()}</View>
        <View style={{}}>{this.sizesModal()}</View>
        <View style={{}}>{this.deliveryModal()}</View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.heading}>Custom Shoes</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#33feba" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          <Image style={styles.image} source={require('../assets/shoemain.png')} />

          <View style={styles.halfWrapper}>
            <TouchableOpacity
              onPress={() => this.designModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectDesign}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.colorsModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectColour}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.typesModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectType}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.sizeModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectSize}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>

            <View style={styles.halfFieldWrapper}>
              <Text style={styles.label}>Quantity</Text>
              <View style={styles.inputWrapperHalf}>
                <TextInput keyboardType="numeric"
                  placeholderTextColor="#666666"
                  style={styles.inputHalf}
                  onChangeText={(text) => {
                    this.setState({ quantity: text })
                  }}
                  value={this.state.quantity}
                  placeholder="Quantity"></TextInput>
              </View>
            </View>

          </View>

          <View style={styles.fullWrapper}>
            <TouchableOpacity
              onPress={() => this.deliveryModalVisible(true)}
              style={styles.fullFieldPrimary}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectDelivery}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldsWrapper}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholderTextColor="#666666"
                  style={styles.input}
                  onChangeText={(text) => {
                    this.state.orderDetails.address.value = text
                  }}
                  placeholder="Home Address"></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.fieldsWrapper}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Post Code</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholderTextColor="#666666"
                  style={styles.input}
                  onChangeText={(text) => {
                    this.state.orderDetails.postCode.value = text
                  }}
                  placeholder="Post Code"></TextInput>
              </View>
            </View>
          </View>
          <FAQs />
          <TouchableOpacity onPress={() => {
            this.state.orderDetails.meta = []
            this.state.orderDetails.meta.push({ key: 'Design', value: this.state.selectDesign })
            this.state.orderDetails.meta.push({ key: 'Colour', value: this.state.selectColour })
            this.state.orderDetails.meta.push({ key: 'Type', value: this.state.selectType })
            this.state.orderDetails.meta.push({ key: 'Size', value: this.state.selectSize })
            this.state.orderDetails.meta.push({ key: 'Delivery', value: this.state.selectDelivery })

            this.state.orderDetails.meta.push({ key: 'Price', value: '£' + this.state.price })
            this.state.orderDetails.meta.push({ key: 'Quantity', value: this.state.quantity + ' x ' + '£' + this.state.price })
            this.state.orderDetails.meta.push({ key: 'Delivery Fee', value: '£' + this.state.deliveryFee })
            this.state.orderDetails.meta.push({ key: 'Total', value: parseFloat(this.state.deliveryFee) + parseInt(this.state.quantity) * parseFloat(this.state.price) })

            let errors = false;
            let errorMessage = '';
            if (this.state.orderDetails.address.value == null) {
              errors = true
              errorMessage += 'Address Required.\n'
            }
            if (this.state.orderDetails.postCode.value == null) {
              errors = true
              errorMessage += 'PostCode Required.\n'
            }

            this.state.orderDetails.meta.forEach((item, index) => {
              if (item.value == null) {
                errors = true
                errorMessage += item.key + ' Required.\n'
              }
            })

            if (errors) {
              this.showSnackbar(errorMessage, '#c42828', 'white')
            }
            else {
              this.props.navigation.navigate('CheckoutShoes', { orderDetails: this.state.orderDetails })
              // console.log(this.state.orderDetails)
            }

          }} style={styles.checkoutBtnWrapper}>

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
                style={{
                  marginBottom: 20,
                  alignItems: 'center',
                  marginHorizontal: 65,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate(item.navigate) }}>
                  <Image
                    source={item.image}
                    style={{
                      marginTop: 10,
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

            );
          }}
        />
      </View>
    );
  }

  designModal() {
    const { designModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={designModal}
        onRequestClose={() => {
          this.setModalVisible(!designModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.packageModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.designModalVisible(!designModal)}>
              <Icon name="times" color="#33feba" size={20} />
            </Pressable>
            <Text style={styles.modalText}>Select Design</Text>
            <ScrollView style={{ width: '100%' }}>
              <FlatList
                data={this.state.packages}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        borderRadius: 15,
                        backgroundColor: 'none',
                        flex: 0.5,
                        padding: 0,
                        top: 7,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            Shoes.getDesignPackages(item.id)
                              .then((response) => response.json())
                              .then(responseJson => {
                                this.setState({ sizeItems: responseJson.data })
                              })
                            this.state.orderDetails.meta.push({ key: 'Design', value: item.name })
                            this.setState({ selectDesign: item.name })
                            console.log(this.state.orderDetails)
                            this.designModalVisible(false)
                          }
                          }>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              marginBottom: 5,
                              paddingHorizontal: 0,

                            }}>
                            <Image style={{ resizeMode: 'cover', width: '100%', height: 170, borderRadius: 5, marginBottom: 10 }} source={{ uri: url + item.image.url }} />
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  colorModal() {
    const { colorsModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorsModal}
        onRequestClose={() => {
          this.colorsModalVisible(!colorsModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.colorsModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.colorsModalVisible(!colorsModal)}>
              <Icon name="times" color="black" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Colour</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.colorItems}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        borderRadius: 15,
                        backgroundColor: 'none',
                        flex: 0.5,
                        padding: 0,
                        top: 7,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ selectColour: item.label })
                            this.state.orderDetails.meta.push({ key: 'Color', value: item.label })
                            this.colorsModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,

                              paddingHorizontal: 0,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  typesModal() {
    const { typesModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={typesModal}
        onRequestClose={() => {
          this.typesModalVisible(!typesModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.colorsModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.typesModalVisible(!typesModal)}>
              <Icon name="times" color="black" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Type</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.typeItems}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        borderRadius: 15,
                        backgroundColor: 'none',
                        flex: 0.5,
                        padding: 0,
                        top: 7,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ selectType: item.label })
                            this.state.orderDetails.meta.push({ key: 'Type', value: item.label })
                            this.typesModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,

                              paddingHorizontal: 0,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  sizesModal() {
    const { sizeModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={sizeModal}
        onRequestClose={() => {
          this.sizeModalVisible(!sizeModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.colorsModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.sizeModalVisible(!sizeModal)}>
              <Icon name="times" color="black" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Size</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.sizeItems}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        borderRadius: 15,
                        backgroundColor: 'none',
                        flex: 0.5,
                        padding: 0,
                        top: 7,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ selectSize: item.min_size + '  £' + item.price })
                            this.setState({ price: item.price })
                            this.state.orderDetails.meta.push({ key: 'Size', value: item.label })
                            this.sizeModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'left',
                                color: 'white',
                              }}>
                              Size: {item.min_size}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'left',
                                color: 'white',
                              }}>
                              £{item.price}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  deliveryModal() {
    const { deliveryModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deliveryModal}
        onRequestClose={() => {
          this.deliveryModalVisible(!deliveryModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.colorsModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.deliveryModalVisible(!deliveryModal)}>
              <Icon name="times" color="#000" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Delivery Service</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.deliveryItems}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        borderRadius: 15,
                        backgroundColor: 'none',
                        flex: 0.5,
                        padding: 0,
                        top: 7,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ selectDelivery: item.label })
                            this.state.orderDetails.meta.push({ key: 'Delivery Service', value: item.label })
                            this.setState({ deliveryFee: item.price })
                            this.deliveryModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,

                              paddingHorizontal: 0,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.label}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  checkoutBtnWrapper: {
    backgroundColor: '#33feba',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  priceWrapper: {
    width: '15%',
    backgroundColor: '#33feba',
    paddingVertical: 3,
    borderRadius: 5,
  },
  addonsWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  addonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonClose: {
    position: 'absolute',
    top: 10,
    right: 13,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  modalText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: '#33feba',
  },
  modalTextBlack: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: '#000',
  },
  packageModalText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
    color: '#33feba',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingTop: 30,
    backgroundColor: 'black',
  },
  inputWrapper: {
    borderRadius: 10,
    borderColor: '#33feba',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  inputWrapperHalf: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  input: {
    borderColor: 'red',
    color: 'white',
    height: 45,
    justifyContent: 'center'
  },
  inputHalf: {
    backgroundColor: 'white',
    color: 'black',
    height: 40,
    justifyContent: 'center'
  },
  fieldsWrapper: {
    marginVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  halfWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
    zIndex: 4000
  },
  fullWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    zIndex: 1000
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
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
  packageModalView: {
    margin: 20,
    width: '95%',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
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
  colorsModalView: {
    margin: 20,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  packagesDetailModalView: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'black',
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
  halfField: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  halfFieldWrapper: {
    backgroundColor: 'transparent',
    width: '44%',
    borderRadius: 10,
    padding: 5,
    margin: 10,
    marginTop: 0
  },
  halfFieldDropdownz2: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 10,
    margin: 10,
    zIndex: 2000
  },
  halfFieldDropdownz3: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 10,
    margin: 10,
    zIndex: 100
  },
  halfFieldDropdownz: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 10,
    margin: 10,
    zIndex: 3000
  },
  fullField: {
    backgroundColor: '#33feba',
    width: '95%',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    marginTop: 0
  },
  fullFieldPrimary: {
    backgroundColor: '#33feba',
    width: '100%',
    borderRadius: 10,
    padding: 15,
    margin: 0,
    marginTop: 0
  },
  halfFieldBottom: {
    width: '48%',
    borderRadius: 10,
    padding: 10,
  },
  buttonLike: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'flex-start',
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
    marginBottom: 50,
  },
  sizesScroller: {
    marginBottom: 100,
  },
  headingWrapper: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    marginVertical: 10,
  },
  headingcolored: {
    color: '#24D8D8',
    fontSize: 20,
  },
});
