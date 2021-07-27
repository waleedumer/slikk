import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import Snackbarr from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: null,
      isSubmitting: false,
      token: null,
      login: 'Log In'
    };
  }

  loginUser = () => {
    this.setState({ login: 'Please Wait..' })
    var passwordValid = false;
    var emailValid = false;
    if (!this.isValidemail(this.state.email)) {
      this.showSnackbar("Email isn't valid!", '#F26A6A', 'white')
      emailValid = false;
      this.setState({ login: 'Log In' })
    }
    else {
      emailValid = true;
    }

    if (this.isEmptyString(this.state.password)) {
      this.showSnackbar("Password can't be empty!", '#F26A6A', 'white')
      passwordValid = false;
      this.setState({ login: 'Log In' })
    }
    else {
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      fetch('https://lab.mediabloo.com/api/v1/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (JSON.stringify(responseJson.access_token)) {
            this.setState({
              token: responseJson.access_token,
              isSubmitting: false,
            })
            AsyncStorage.setItem('token', JSON.stringify(this.state.token));
            this.setState({ login: 'Log In' })
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
            // this.props.navigation.navigate('Home')
          }
          else {
            this.showSnackbar("Email or Password is not correct", '#F26A6A', 'white')
            this.setState({ login: 'Log In' })
          }
        })
        .catch((error) => {
          this.showSnackbar('Error. Wrong Credentials', '#F26A6A', 'white')
          this.setState({ login: 'Log In' })
        });
    }

  };


  isValidemail(num) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(num);
  }

  isEmptyString(text) {
    if (text == "" || text == null)
      return true;

    return false;
  }

  loadSignup = () => {
    this.props.navigation.navigate('SignUp')
  };

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword')
  };

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

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
          <ImageBackground source={require('../assets/bg.png')} style={styles.image}>
            <View style={styles.logoWrapper}>
              <ReactImage source={require('../assets/logo-nav.png')} style={styles.logo} />
            </View>

            <View style={styles.loginWrapper}>
              <View style={styles.headingWrapper}>
                <Text style={styles.heading1}>Log In</Text>
              </View>
              <View style={styles.fieldsWrapper}>
                <View style={styles.fieldWrapper}>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Email*</Text>
                    <Icon name="envelope" size={19} style={styles.icon} />
                  </View>
                  <SafeAreaView style={styles.inputWrapper}>
                    <TextInput onChangeText={(text) => this.setState({ email: text })} style={styles.input} />
                  </SafeAreaView>
                </View>

                <View style={styles.fieldWrapper}>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Password*</Text>
                    <Icon name="lock" size={19} style={styles.icon} />
                  </View>
                  <SafeAreaView style={styles.inputWrapper}>
                    <TextInput onChangeText={(text) => this.setState({ password: text })} textContentType="password" secureTextEntry={true} style={styles.input} />
                  </SafeAreaView>
                  <TouchableOpacity onPress={this.forgotPassword} style={styles.forgotPasswordWrapper}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

              </View>
              <TouchableOpacity onPress={this.loginUser} style={styles.actionBtn}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.login}</Text>
              </TouchableOpacity>

              <View style={styles.signupWrapper}>
                <Text style={styles.whiteText}>Don't have an account yet?</Text>
                <TouchableOpacity style={styles.signup} onPress={this.loadSignup}>
                  <Text style={styles.primaryText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e2925',
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
    marginBottom: 40,
    marginTop: 20,
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

  loginWrapper: {
    backgroundColor: '#202020',
    width: '80%',
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

  forgotPasswordWrapper: {
    marginTop: 5,
  },

  forgotPassword: {
    textAlign: 'right',
    color: '#fff',
    marginTop: 5,
    opacity: 0.5
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
    height: 40
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
