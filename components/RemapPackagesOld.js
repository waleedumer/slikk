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
      carSizeModal: false,
      carPackageModal: false,
      carPackagesDetailModal: false,
      timingsModal: false,
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
      packages: [
        {
          id: 1,
          title: 'Mivi Valet',
          image: require('../assets/small.png'),
        },
        {
          id: 2,
          title: 'Mini Valet Plus',
          image: require('../assets/medium.png'),
        },
        {
          id: 3,
          title: 'Super Valet',
          image: require('../assets/large.png'),
        },
        {
          id: 4,
          title: 'Interior Clean',
          image: require('../assets/large.png'),
        },
        {
          id: 5,
          title: 'Exterior Clean',
          image: require('../assets/large.png'),
        },
      ],
      subServices: [
        {
          id: 1,
          title: 'Car Wash',
          image: require('../assets/carwash.png'),
        },
        {
          id: 2,
          title: 'Alloy Refurbishment',
          image: require('../assets/alloy.png'),
        },
        {
          id: 3,
          title: 'Calliper Respray',
          image: require('../assets/calliper.png'),
        },
        {
          id: 4,
          title: 'Coding/Diagnostic',
          image: require('../assets/diagnostic.png'),
        },
        {
          id: 5,
          title: 'Car Remap',
          image: require('../assets/remaps.png'),
        },
      ],
      packagesDetails: [
        {
          id: 1,
          title: 'Mini Valet',
          interior: {
            services: [
              'Pet Hair Removal (Interior)',
              'Door Swit Cleaned (Interior)',
            ],
            image: require('../assets/interior.png'),
          },
          exterior: {
            services: ['Rubbish Removed', 'Door Suts CLeared'],
            image: require('../assets/exterior.png'),
          },
          addons: [
            { title: 'Pet Hair Removal (Interior)', price: '30' },
            { title: 'Mould Removal (Interior)', price: '30' },
            { title: 'Pedals Cleaned (Interior)', price: '30' },
          ],
        },
      ],
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

  packageDetailModalVisible = (visible) => {
    this.setState({ carPackageModal: false });
    this.setState({ carPackagesDetailModal: visible });
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={{}}>{this.TopBar()}</View>
        <View style={{}}>{this.sizeModal()}</View>
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
          <Text style={styles.heading}>Car Wash</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size="32" color="#2CFDFD" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          <Image style={styles.image} source={require('../assets/wash.png')} />

          <View style={styles.halfWrapper}>
            <TouchableOpacity
              onPress={() => this.setModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.carSize}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.packageModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.packageName}</Text>
                <Icon name="chevron-right" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.date}</Text>
                <Icon name="calendar" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.timingsModalVisible(true)}
              style={styles.halfField}>
              <View style={styles.buttonLike}>
                <Text style={styles.btnText}>{this.state.time}</Text>
                <Icon name="clock" />
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
                    placeholder="SEM-897"></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.halfFieldBottom}>
              <View style={styles.fieldWrapper}>
                <Text style={styles.label}>Color</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholderTextColor="#666666"
                    style={styles.input}
                    placeholder="Black"></TextInput>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutBtnWrapper}>
            <View>
              <Text style={styles.btnTxt}>Checkout</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
              <Icon name="times" color="#2CFDFD" size="20" />
            </Pressable>
            <Text style={styles.packageModalText}>
              {this.state.packagesDetails[0].title}
            </Text>
            <ScrollView
              style={{ width: '100%', marginTop: 20, paddingRight: 10 }}>
              <FlatList
                data={this.state.packagesDetails}
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
                        padding: 0,
                        margin: 0,
                        marginTop: 0,
                        marginBottom: 10,
                        elevation: 4,
                      }}>
                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'white',
                            textAlign: 'left',
                            paddingLeft: 10,
                            paddingBottom: 5,
                          }}>
                          Interior
                        </Text>
                        <Image
                          source={this.state.packagesDetails[0].interior.image}
                        />
                        <FlatList
                          data={this.state.packagesDetails[0].interior.services}
                          keyExtractor={(item) => item}
                          showsVerticalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <View
                                style={{
                                  paddingLeft: 10,
                                  flexDirection: 'row',
                                }}>
                                <Icon
                                  name="check"
                                  color="white"
                                  style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: 'white' }}>{item}</Text>
                              </View>
                            );
                          }}
                        />
                      </View>

                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'white',
                            textAlign: 'left',
                            paddingLeft: 10,
                            paddingBottom: 5,
                          }}>
                          Exterior
                        </Text>
                        <Image
                          source={this.state.packagesDetails[0].exterior.image}
                        />
                        <FlatList
                          data={this.state.packagesDetails[0].exterior.services}
                          keyExtractor={(item) => item}
                          showsVerticalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <View
                                style={{
                                  paddingLeft: 10,
                                  flexDirection: 'row',
                                }}>
                                <Icon
                                  name="check"
                                  color="white"
                                  style={{ marginRight: 5 }}
                                />
                                <Text style={{ color: 'white' }}>{item}</Text>
                              </View>
                            );
                          }}
                        />
                      </View>
                      <View style={styles.addonsWrapper}>
                        <Text
                          style={{
                            color: '#2CFDFD',
                            fontSize: 20,
                            marginBottom: 15,
                          }}>
                          Addons
                        </Text>
                        <FlatList
                          data={this.state.packagesDetails[0].addons}
                          keyExtractor={(item) => item}
                          showsVerticalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <View style={styles.addonWrapper}>
                                <View style={styles.checkboxWrapper}>
                                  <Icon
                                    name="square-o"
                                    size="25"
                                    style={{ marginRight: 10 }}
                                    color="white"
                                  />
                                  <Text style={{ color: 'white' }}>
                                    {item.title}
                                  </Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                  <Text
                                    style={{
                                      color: 'black',
                                      textAlign: 'center',
                                    }}>
                                    £{item.price}
                                  </Text>
                                </View>
                              </View>
                            );
                          }}
                        />
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
              <Icon name="times" color="#2CFDFD" size="20" />
            </Pressable>
            <Text style={styles.modalText}>Select Package</Text>
            <ScrollView style={{ width: '70%' }}>
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
                          onPress={() => this.packageDetailModalVisible(true)}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              marginBottom: 15,
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
              <Icon name="times" color="#2CFDFD" size="20" />
            </Pressable>
            <Text style={styles.modalText}>Select Timings</Text>
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
                          onPress={() => this.packageDetailModalVisible(true)}>
                          <View
                            style={{
                              borderRadius: 10,
                              width: '100%',
                              backgroundColor: 'black',
                              paddingVertical: 15,
                              marginBottom: 15,
                              paddingHorizontal: 0,
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
              <Icon name="times" color="#2CFDFD" size="20" />
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
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  checkoutBtnWrapper: {
    backgroundColor: '#2CFDFD',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  priceWrapper: {
    width: '15%',
    backgroundColor: '#2CFDFD',
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
    color: '#2CFDFD',
  },
  packageModalText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
    color: '#2CFDFD',
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
    borderColor: '#2CFDFD',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 13,
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
    marginTop: 15,
    height: '100%',
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
