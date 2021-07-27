import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';
import Snackbarr from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      ref: null,
      password: null,
      confirmPassword: null,
      fullname: null,
      contact: null,
      postCode: null,
      address: null,
      btnText: 'Sign Up',
      token: null
    };
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

  loadLogin = () => {
    this.props.navigation.navigate('SignIn')
  };

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
        ref={this.state.ref}
        onPress={(data, details = null) => {
          console.log(data);
          this.setState({ address: data.description })
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
            color: 'black',
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 10,
            marginBottom: 20
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

  registerUser = () => {
    this.setState({ btnText: 'Registering...' })
    fetch('https://lab.mediabloo.com/api/v1/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.fullname,
        email: this.state.username,
        password: this.state.password
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.access_token) {
          this.setState({
            token: responseJson.access_token
          })
          AsyncStorage.setItem('token', JSON.stringify(responseJson.access_token));
          this.showSnackbar("Registered Successfully", '#279446')
          this.props.navigation.navigate('Home')
        }
        else {
          // responseJson.errors.forEach((item, index) => {
          //   console.log(item)
          // })
          var errors = '';
          for (var key in responseJson.errors) {
            errors += responseJson.errors[key] + ' ';
          }
          this.showSnackbar(errors, '#F26A6A')
        }
        this.setState({ btnText: 'Sign Up' })
      })
      .catch((error) => {
        this.setState({ btnText: 'Sign Up' })
        this.showSnackbar('Something Went Wrong', '#F26A6A')
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
          <ImageBackground source={require('../assets/bg.png')} style={styles.image}>
            <View style={styles.logoWrapper}>
              <ReactImage source={require('../assets/logo-nav.png')} style={styles.logo} />
            </View>

            <View style={styles.some}>
              <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.loginWrapper}>
                <View style={styles.headingWrapper}>
                  <Text style={styles.heading1}>Sign Up</Text>
                </View>
                <View style={styles.fieldsWrapper}>
                  <View style={styles.fieldWrapper}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Email*</Text>
                      <Icon name="envelope" size={16} style={styles.icon} />
                    </View>
                    <SafeAreaView style={styles.inputWrapper}>
                      <TextInput onChangeText={(text) => this.setState({ username: text })} style={styles.input} />
                    </SafeAreaView>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Password*</Text>
                      <Icon name="lock" size={16} style={styles.icon} />
                    </View>
                    <SafeAreaView style={styles.inputWrapper}>
                      <TextInput onChangeText={(text) => this.setState({ password: text })} textContentType="password" secureTextEntry={true} style={styles.input} />
                    </SafeAreaView>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Confirm Password*</Text>
                      <Icon name="lock" size={16} style={styles.icon} />
                    </View>
                    <SafeAreaView style={styles.inputWrapper}>
                      <TextInput onChangeText={(text) => this.setState({ confirmPassword: text })} textContentType="password" secureTextEntry={true} style={styles.input} />
                    </SafeAreaView>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Full Name*</Text>
                      <Icon name="user" size={16} style={styles.icon} />
                    </View>
                    <SafeAreaView style={styles.inputWrapper}>
                      <TextInput onChangeText={(text) => this.setState({ fullname: text })} style={styles.input} />
                    </SafeAreaView>
                  </View>

                  <View style={styles.fieldWrapper}>
                    <View style={styles.labelWrapper}>
                      <Text style={styles.label}>Phone Number*</Text>
                      <Icon name="phone" size={16} style={styles.icon} />
                    </View>
                    <SafeAreaView style={styles.inputWrapper}>
                      <TextInput keyboardType={"numeric"} onChangeText={(text) => this.setState({ contact: text })} style={styles.input} />
                    </SafeAreaView>
                  </View>

                  <View style={styles.fieldWrapperHalf}>
                    <View style={styles.halfFieldWrapper}>
                      <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Postcode*</Text>
                      </View>
                      <View style={styles.inputWrapffperPost}>
                        <View style={styles.fieldWrapper}>
                          <View style={{ position: 'absolute', width: '100%', zIndex: 35 }}>
                            {this.googlePlaces()}
                          </View>
                        </View>
                        {/* <TextInput onChangeText={(text) => this.setState({ postCode: text })} style={styles.input} /> */}
                      </View>
                    </View>
                  </View>

                  <View style={styles.fieldWrapperHalfAddress}>
                    <View style={styles.halfFieldWrapper}>
                      <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Address*</Text>
                      </View>
                      <View style={styles.inputWrapper}>
                        <View style={styles.fieldWrapper}>
                          <TextInput value={this.state.address} style={styles.input} />
                        </View>
                      </View>
                    </View>
                  </View>


                </View>

                <TouchableOpacity onPress={this.registerUser} style={styles.actionBtn}>
                  <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.btnText}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.signupWrapper}>
              <Text style={styles.whiteText}>Already have an account?</Text>
              <TouchableOpacity style={styles.signup} onPress={this.loadLogin}>
                <Text style={styles.primaryText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  fieldsWrapper: {
    width: '100%',
    height: '62%',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  fieldWrapper: {
    marginBottom: 10
  },

  fieldWrapperHalf: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 0
  },
  fieldWrapperHalfAddress: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 40
  },
  halfFieldWrapper: {
    width: '100%',
    marginBottom: 10
  },
  mainContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#1e2925',
    paddingBottom: 30
  },

  headingWrapper: {
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },

  heading1: {
    fontSize: 22,
    color: '#fff'
  },

  primaryText: {
    color: '#33feba'
  },

  signup: {
    paddingLeft: 10
  },

  whiteText: {
    color: 'white'
  },

  signupWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 30,
  },

  actionBtn: {
    marginTop: 30
  },

  logo: {
    width: '60%',
    height: 100,
    resizeMode: 'cover',

  },

  logoWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  some: {
    height: '67%'
  },

  loginWrapper: {
    backgroundColor: '#202020',
    width: '86%',
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    elevation: 7,
  },

  fieldsWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center'
  },

  inputWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 3,
  },

  inputWrapperPost: {
    height: 45,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 3,
  },

  forgotPasswordWrapper: {
    marginTop: 5,
  },

  forgotPassword: {
    textAlign: 'right',
    color: 'white',
    marginTop: 5
  },

  fieldWrapper: {
    marginBottom: 15,
  },

  icon: {
    resizeMode: 'contain',
    color: "#33feba",
    paddingRight: 5
  },

  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0
  },

  label: {
    color: '#33feba',
    fontSize: 18
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    marginRight: 10,
    color: 'white',
  },

  actionBtn: {
    marginHorizontal: 15,
    padding: 12,
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#33feba'
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    resizeMode: "contain",
    justifyContent: "center"
  },

});
