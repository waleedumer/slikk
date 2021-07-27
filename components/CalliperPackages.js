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
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbarr from 'react-native-snackbar';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectColour: 'Select Colour',
      packageName: 'Select Package',
      date: null,
      time: 'Select time',
      decal: 'Select Decal',
      carSizeModal: false,
      quantity: 0,
      price: 0,
      total: 0,
      orderDetails: {
        id: 0,
        title: 'Alloy & Refurbishment',
        meta: [],
        address: { key: 'Address', value: null },
        postCode: { key: 'Post Code', value: null },
      },
      carPackageModal: false,
      carPackagesDetailModal: false,
      timingsModal: false,
      decalModal: false,
      carSizes: [
        {
          id: 1,
          title: 'Small (Hatchback)',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Medium (Coupes, Convertibles & Saloons)',
          image: require('../assets/medium.png'),
        },
        {
          id: 3,
          title: 'Large (Estates, SUVs & MPVs)',
          image: require('../assets/large.png'),
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
      decals: [
        {
          id: 1,
          title: 'S-Line',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Audi S',
          image: require('../assets/medium.png'),
        }
      ],
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
          title: 'Yellow',
          image: require('../assets/large.png'),
        },
        {
          id: 4,
          title: 'Green',
          image: require('../assets/large.png'),
        }
      ],
      subServices: [
        {
          id: 1,
          title: 'Car Wash',
          image: require('../assets/carwash.png'),
          navigate: 'CarPackages'
        },
        {
          id: 2,
          title: 'Alloy Refurbishment',
          image: require('../assets/alloy.png'),
          navigate: 'AlloyPackages'
        },
        {
          id: 3,
          title: 'Calliper Respray',
          image: require('../assets/calliper.png'),
          navigate: 'CalliperPackages'
        },
        {
          id: 4,
          title: 'Coding/Diagnostic',
          image: require('../assets/diagnostic.png'),
          navigate: 'CodingPackages'
        },
        {
          id: 5,
          title: 'Car Remap',
          image: require('../assets/remaps.png'),
          navigate: 'RemapPackages'
        },
      ],
      packagesDetails: [
        {
          id: 1,
          title: 'Select Package',
          interior: {
            title: 'Callipers',
            price: '£120',
            image: require('../assets/brake.png'),
          },
          exterior: {
            title: 'Callipers with decal',
            price: '£140',
            image: require('../assets/spray.png'),
          },
          addons: [
            {
              id: 1,
              title: 'Set of 4 Alloys',
              subtitle: '+ 4 Callipers 15"-18"',
              price: '£70',
            },
            {
              id: 2,
              title: 'Set of 4 Alloys',
              subtitle: '+ 4 Callipers 19"-22"',
              price: '£150',
            },
            {
              id: 3,
              title: 'Set of 4 Alloys',
              subtitle: '+ 4 Callipers 15"-18"',
              price: '£250',
            },
            {
              id: 4,
              title: 'Set of 4 Alloys',
              subtitle: '+ 4 Callipers 19"-22"',
              price: '£350',
            },
          ],
        },
      ],
      packagePricings: [],
      token: null,
    };
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

  setModalVisible = (visible) => {
    this.setState({ carSizeModal: visible });
  };

  packageModalVisible = (visible) => {
    this.setState({ carPackageModal: visible });
  };

  timingsModalVisible = (visible) => {
    this.setState({ timingsModal: visible });
  };

  decalModalVisible = (visible) => {
    this.setState({ decalModal: visible });
  };

  packageDetailModalVisible = (visible) => {
    this.setState({ carPackagesDetailModal: visible });
  };

  _storeData = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      return token
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  };

  getPackagePricings = () => {
    let token = this.state.token
    fetch('https://lab.mediabloo.com/api/v1/calliper-respray-pricings', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          packagePricings: responseJson.data,
        })
        console.log(responseJson.data)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  componentDidMount() {
    this._storeData().then(response => {
      this.setState({ token: JSON.parse(response) })
      this.getPackagePricings()
    });

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{}}>{this.TopBar()}</View>
        <View style={{}}>{this.sizeModal()}</View>
        <View style={{}}>{this.viewDecalModal()}</View>
        <View style={{}}>{this.packageModal()}</View>
        <View style={{}}>{this.packageDetailModal()}</View>
        <View style={{}}>{this.timeModal()}</View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.heading}>Calliper Respray</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#33feba" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          <Image
            style={styles.image}
            source={require('../assets/callipery.png')}
          />

          <View style={styles.halfWrapper}>
            <TouchableOpacity
              onPress={() => this.packageModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.selectColour}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.packageDetailModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.packageName}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.decalModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.decal}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
            <DatePicker
              style={styles.halfFieldDate}
              date={this.state.date}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={<Icon name="calendar" />}
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0
                },
                dateInput: {
                  marginLeft: 0,
                  border: 'none',
                  margin: 0,
                  height: 30,
                  borderColor: 'white',
                },
                placeholderText: {
                  color: 'black',
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date: date })
                // this.state.orderDetails.meta.push({ key: 'Date', value: date })
              }}
            />
            <TouchableOpacity
              onPress={() => this.timingsModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.time}</Text>
                <Icon name="clock-o" size={18} />
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

          <View style={styles.fieldsWrapper}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Make & Model</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholderTextColor="#666666"
                  style={styles.input}
                  onChangeText={(text) => {
                    this.setState({ makeModel: text })
                  }}
                  placeholder="Make & Model"></TextInput>
              </View>
            </View>
          </View>

          <View style={styles.halfWrapper}>
            <View style={styles.halfFieldBottom}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Car Reg.</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholderTextColor="#666666"
                    style={styles.input}
                    onChangeText={(text) => {
                      this.setState({ carReg: text })
                    }}
                    placeholder="SEM-897"></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.halfFieldBottom}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Colour</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholderTextColor="#666666"
                    style={styles.input}
                    onChangeText={(text) => {
                      this.setState({ carColor: text })
                    }}
                    placeholder="Black"></TextInput>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => {
            this.state.orderDetails.meta = []
            this.state.orderDetails.meta.push({ key: 'Colour', value: this.state.selectColour })
            this.state.orderDetails.meta.push({ key: 'Package', value: this.state.packageName })
            this.state.orderDetails.meta.push({ key: 'Decal', value: this.state.decal })
            this.state.orderDetails.meta.push({ key: 'Date', value: this.state.date })
            this.state.orderDetails.meta.push({ key: 'Time', value: this.state.time })


            this.state.orderDetails.meta.push({ key: 'Make & Model', value: this.state.makeModel })
            this.state.orderDetails.meta.push({ key: 'Car Reg.', value: this.state.carReg })
            this.state.orderDetails.meta.push({ key: 'Car Colour', value: this.state.carColor })

            this.state.orderDetails.meta.push({ key: 'Price', value: '£' + this.state.price })
            this.state.orderDetails.meta.push({ key: 'Total', value: parseFloat(this.state.price) })

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
              this.props.navigation.navigate('CheckoutCar', { orderDetails: this.state.orderDetails })
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
                  <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate(item.navigate)
                  }}>
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

  packageDetailModal() {
    const { carPackagesDetailModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={carPackagesDetailModal}
        onRequestClose={() => {
          this.setModalVisible(!carPackagesDetailModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.packagesDetailModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                this.packageDetailModalVisible(!carPackagesDetailModal)
              }>
              <Icon name="times" color="#33feba" size={20} />
            </Pressable>
            <Text style={styles.packageModalText}>
              Select Package
            </Text>
            <ScrollView
              style={{ width: '100%', marginTop: 20, paddingRight: 10 }}>
              <FlatList
                data={this.state.packagePricings}
                keyExtractor={(item) => item.id}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  if (!item.is_offer) {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          borderRadius: 15,
                          backgroundColor: 'none',
                          padding: 0,
                          margin: 0,
                          marginTop: 0,
                          marginBottom: 10,
                          elevation: 4,
                        }}>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                          <Image
                            source={this.state.packagesDetails[0].interior.image}
                          />
                          <TouchableOpacity onPress={() => {
                            this.setState({ packageName: item.option })
                            this.setState({ price: item.price })
                            this.state.orderDetails.meta.push({ Key: 'Package', Value: item.option + ' ' + item.price })
                            this.packageDetailModalVisible(false)
                          }}>
                            <View
                              style={{
                                padding: 10,
                                flexDirection: 'row',
                                width: '70%',
                                backgroundColor: '#33feba',
                                justifyContent: 'space-between',
                                borderRadius: 5,
                              }}>
                              <Text style={{ flex: 1, color: 'black' }}>
                                {item.option}
                              </Text>
                              <Text style={{ textAlign: 'right', color: 'black' }}>
                                £{item.price}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>


                      </View>
                    );
                  }
                }}
              />
              <View style={styles.addonsWrapper}>
                <Text
                  style={{
                    color: '#33feba',
                    fontSize: 20,
                    marginBottom: 15,
                  }}>
                  Special Offer
                        </Text>
                <FlatList
                  data={this.state.packagePricings}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    if (item.is_offer) {
                      return (
                        <TouchableOpacity onPress={() => {
                          this.setState({ packageName: item.option })
                          this.setState({ price: item.price })
                          this.state.orderDetails.meta.push({ Key: 'Special Offer', Value: item.option })
                          this.packageDetailModalVisible(false)
                        }}>
                          <View style={styles.addonWrapper}>
                            <View style={styles.checkboxOfferWrapper}>
                              <Text style={{ color: 'black' }}>
                                {item.option}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: 'black',
                                  textAlign: 'center',
                                }}>
                                £{item.price}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  packageModal() {
    const { carPackageModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={carPackageModal}
        onRequestClose={() => {
          this.setModalVisible(!carPackageModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.packageModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.packageModalVisible(!carPackageModal)}>
              <Icon name="times" color="#000" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Colour</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.colours}
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
                            this.setState({ selectColour: item.title })
                            this.state.orderDetails.meta.push({ key: 'Colour', value: item.title })
                            this.packageModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.title}
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

  timeModal() {
    const { timingsModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={timingsModal}
        onRequestClose={() => {
          this.timingsModalVisible(!timingsModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.packageModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.timingsModalVisible(!timingsModal)}>
              <Icon name="times" color="#000" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Timings</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.timings}
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
                            this.setState({ time: item.time })
                            this.state.orderDetails.meta.push({ key: 'Time', value: item.time })
                            this.timingsModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.time}
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

  sizeModal() {
    const { carSizeModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={carSizeModal}
        onRequestClose={() => {
          this.setModalVisible(!carSizeModal);
        }}>
        <View style={styles.centeredViewSize}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.setModalVisible(!carSizeModal)}>
              <Icon name="times" color="#33feba" size={20} />
            </Pressable>
            <Text style={styles.modalText}>Select Car Size</Text>
            <ScrollView style={styles.sizesScroller}>
              <FlatList
                data={this.state.carSizes}
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
                            this.props.navigation.navigate('CarPackages', {
                              _serviceID: item.id,
                              _serviceName: item.title,
                            });
                          }}>
                          <Image
                            style={{
                              width: '100%',
                              height: 185,
                              marginLeft: 0,
                              borderRadius: 10,
                              marginVertical: 0,
                              resizeMode: 'cover',
                              padding: 0,

                              backgroundColor: 'white',
                            }}
                            source={item.image}
                          />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 5 }}>
                          <Text
                            style={{
                              left: 5,
                              fontSize: 15,
                              textAlign: 'center',
                              color: 'white',
                              marginVertical: 10,
                              marginBottom: 20,
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
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }

  viewDecalModal() {
    const { decalModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={decalModal}
        onRequestClose={() => {
          this.setModalVisible(!decalModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.packageModalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.decalModalVisible(!decalModal)}>
              <Icon name="times" color="#000" size={20} />
            </Pressable>
            <Text style={styles.modalTextBlack}>Select Decal</Text>
            <ScrollView style={{ width: '70%' }}>
              <FlatList
                data={this.state.decals}
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
                            this.setState({ decal: item.title })
                            this.state.orderDetails.meta.push({ key: 'Decal', value: item.title })
                            this.decalModalVisible(false)
                          }}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              paddingHorizontal: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                textAlign: 'center',
                                color: 'white',
                              }}>
                              {item.title}
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
    backgroundColor: '#33feba',
    padding: 10,
    borderRadius: 5
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
    backgroundColor: 'black',
  },
  inputWrapper: {

    borderRadius: 10,
    borderColor: '#33feba',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 45,
    justifyContent: 'center'
  },
  input: {

    borderColor: 'red',
    color: 'white',
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
    width: '80%',
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
  halfFieldDate: {
    backgroundColor: 'white',
    width: '44%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    margin: 10,
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
  checkboxOfferWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '80%'
  },
});
