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
  KeyboardAvoidingView,
  Picker,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';
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

  handlePress(target, owner) {
    if (this.props.onPress) {
      let name;
      let id;
      let index = -1;
      if (target.search('::') > -1) {
        const varCount = target.split('::').length;
        if (varCount === 2) {
          name = target.split('::')[0];
          id = target.split('::')[1];
        } else if (varCount === 3) {
          name = target.split('::')[0];
          index = parseInt(target.split('::')[1]);
          id = target.split('::')[2];
        }
      } else {
        name = target;
      }
      this.props.onPress({
        type: 'button',
        name: name,
        index: index,
        id: id,
        owner: owner,
      });
    }
  }

  handleChangeTextinput(name, value) {
    let id;
    let index = -1;
    if (name.search('::') > -1) {
      const varCount = name.split('::').length;
      if (varCount === 2) {
        name = name.split('::')[0];
        id = name.split('::')[1];
      } else if (varCount === 3) {
        name = name.split('::')[0];
        index = name.split('::')[1];
        id = name.split('::')[2];
      }
    } else {
      name = name;
    }
    let state = this.state;
    state[name.split('::').join('')] = value;
    this.setState(state, () => {
      if (this.props.onChange) {
        this.props.onChange({
          type: 'textinput',
          name: name,
          value: value,
          index: index,
          id: id,
        });
      }
    });
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
            this.props.navigation.navigate('Home')
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
      <View
        style={styles.x012Login}>

        <Svg
          style={styles.x012Login_subtraction5}
          preserveAspectRatio="none"
          viewBox="0 0 384.9674987792969 870.8294677734375"
          fill="#33FEBA">
          <SvgPath d="M 7.878169536590576 870.8294677734375 L 7.877189636230469 870.8294677734375 L 0.0001088400531443767 870.8294677734375 L 0 180.9219818115234 C 68.01239776611328 178.6456909179688 127.0288619995117 167.7184906005859 175.4111022949219 148.4427947998047 C 214.1149444580078 133.0231018066406 246.1380615234375 112.256217956543 270.5908203125 86.71907806396484 C 280.1973876953125 76.68575286865234 288.6432495117188 65.88393402099609 295.6938781738281 54.6136474609375 C 301.33349609375 45.60082626342773 306.1000366210938 36.26506805419922 309.861083984375 26.8659725189209 C 313.2069396972656 18.50411605834961 315.1175231933594 11.64577674865723 316.1311645507812 7.364879608154297 C 317.1815795898438 2.93008279800415 317.5116882324219 0.2892968654632568 317.5458679199219 0.002829841338098049 L 384.9668273925781 0 L 384.9674987792969 711.6575317382812 C 384.9175109863281 711.6502685546875 378.5845642089844 710.701171875 367.7693481445312 709.76953125 C 357.8025512695312 708.9107666015625 341.8495483398438 707.8871459960938 322.4502258300781 707.8871459960938 C 234.0568237304688 707.8871459960938 75.53455352783203 728.7830200195312 6.99819803237915 868.7286987304688 C 7.108016967773438 868.6188354492188 7.209347724914551 868.5637817382812 7.297724723815918 868.5637817382812 C 7.630013942718506 868.5637817382812 7.825382232666016 869.3258056640625 7.878169536590576 870.8284912109375 L 7.878169536590576 870.8294677734375 Z M 0.002721001161262393 180.7235717773438 L 0.00185028079431504 180.7235717773438 L 0.0001088400531443767 180.7235717773438 L 0 11.11964416503906 C 0.1720761358737946 49.47814559936523 0.6748083233833313 175.0723571777344 0.002829841338098049 180.7227172851562 L 0.002721001161262393 180.7235717773438 Z" />
        </Svg>

        <ReactImage source={require('../assets/logo-nav.png')} style={styles.x012Login_slikkLogo4} />

        <Text style={styles.x012Login_email243edfda}>Email*</Text>
        <ReactImage source={require('../assets/rectangle28.png')} style={styles.x012Login_rectangle28} />

        <View style={styles.loginRec}></View>
        <Text style={styles.leftLogin}>Login</Text>
        <TouchableOpacity style={styles.x012Login_login09a3157b} onPress={this.loadSignup}>
          <Text style={styles.x012Login_signUp}>Sign up</Text>
        </TouchableOpacity>

        <View source={require('../assets/group8.png')} style={styles.x012Login_group8}>
          <Icon name="caret-left" size={80} style={styles.polygon} />
          <View style={styles.x012Login_mainHeading}>
            <Text style={styles.x012Login_mainHeading_login7a308dfa}>Log In</Text>
          </View>
          <View style={styles.fieldsWrapper}>
            <View style={styles.fieldWrapper}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Email*</Text>
                <Icon name="envelope" size={16} style={styles.icon} />
              </View>
              <SafeAreaView style={styles.x012Login_rectangle30}>
                <TextInput onChangeText={(text) => this.setState({ email: text })} style={styles.input} />
              </SafeAreaView>
            </View>

            <View style={styles.fieldWrapper}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Password*</Text>
                <Icon name="lock" size={16} style={styles.icon} />
              </View>
              <SafeAreaView style={styles.x012Login_rectangle30}>
                <TextInput onChangeText={(text) => this.setState({ password: text })} textContentType="password" secureTextEntry={true} style={styles.input} />
              </SafeAreaView>
            </View>

          </View>
        </View>
        <TouchableOpacity onPress={this.loginUser} style={styles.x012Login_rectangle23}>
          <Text style={{ fontSize: 16 }}>{this.state.login}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({

  fieldsWrapper: {
    width: '100%',
    paddingHorizontal: 15,
    height: '62%',
    justifyContent: 'center'
  },
  fieldWrapper: {
    marginBottom: 20
  },

  fieldWrapperHalf: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  halfFieldWrapper: {
    width: '45%'
  },
  icon: {
    width: 25,
    height: 15,
    resizeMode: 'contain',
    color: "#33feba"
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  label: {
    color: '#33feba'
  },
  x012Login: {
    opacity: 1,
    position: 'relative',
    backgroundColor: 'black',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  x012Login_rectangle31: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    height: 826,
    left: 0,
    top: -7,
  },
  x012Login_subtraction5: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.1607843137254902,
    shadowOffset: {
      width: -2,
      height: -4,
    },
    shadowRadius: 13,
    width: '100%',
    height: '110%',
    left: -1.98,
    top: -12.91,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    height: 100,
    marginRight: 10,
    color: 'white'
  },
  x012Login_email243edfda: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 17,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    lineHeight: 63,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 55,
    height: 66,
    left: 158,
    top: 294.5,
  },
  x012Login_group8: {
    opacity: 1,
    position: 'absolute',
    resizeMode: 'cover',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    width: '70%',
    height: '75%',
    right: 2,
    backgroundColor: '#171717',
    top: 105,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  x012Login_group8_rectangle18: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(36, 216, 216, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.1607843137254902,
    shadowOffset: {
      width: -2,
      height: -1,
    },
    shadowRadius: 22,
    width: 274,
    height: 580,
    left: 32,
    top: 0,
  },
  x012Login_group8_polygon1: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.1607843137254902,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    width: 39,
    height: 33,
    left: -3,
    top: 190,
  },
  x012Login_rectangle28: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    width: 74,
    height: 39,
    left: -2,
    top: 267,
  },
  loginRec: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 20,
    width: 74,
    height: 39,
    left: -2,
    top: 265,
  },
  x012Login_login09a3157b: {
    opacity: 1,
    position: 'absolute',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    fontWeight: '700',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 61,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,

    width: 74,
    height: 41,
    left: 0,
    top: 325,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftLogin: {
    color: 'white',
    top: 275,
    left: 10
  },
  x012Login_mainHeading: {
    opacity: 1,
    backgroundColor: 'red',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,

    left: 10,
    top: -70,
  },
  x012Login_mainHeading_login7a308dfa: {
    opacity: 1,
    position: 'absolute',
    color: '#33feba',
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'Helvetica',
    textAlign: 'left',

    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 112,

    left: 0,
    top: 0,
  },
  x012Login_signUp: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 67,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 65,
    height: 77,
    left: 8,
    top: -12,
  },
  x012Login_email27b9ad58: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 67,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 65,
    height: 77,
    left: 139,
    top: 253.5,
  },
  x012Login_password: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 67,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 94,
    height: 77,
    left: 139,
    top: 359.5,
  },
  x012Login_forgetYourPassword: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 67,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 150,
    height: 79,
    left: 139,
    top: 448.5,
  },
  x012Login_rectangle29: {
    opacity: 0.5403140187263489,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: '60%',
    height: 46,
    left: 139,
    top: 305,
    justifyContent: 'center',
  },
  x012Login_rectangle30: {
    opacity: 0.5400170087814331,
    // position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    width: '100%',
    height: 35,
    // left: 139,
    // top: 412,
    justifyContent: 'center',
  },
  x012Login_rectangle23: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    borderBottomLeftRadius: 23,
    borderBottomRightRadius: 23,
    shadowColor: 'rgb(0,  0,  0)',
    shadowOpacity: 0.1607843137254902,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: '50%',
    height: 45,
    left: '40%',
    top: "86%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  x012Login_login: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',

    textAlign: 'left',
    lineHeight: 59,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 59,
    left: 227,
    top: 620,
  },
  x012Login_email: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    width: 19.68,
    height: 14.05,
    left: 353.71,
    top: 281.37,
  },
  x012Login_email_group3: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 18.37,
    height: 7.52,
    left: 0.7,
    top: 0,
  },
  x012Login_email_group3_group2: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 18.37,
    height: 7.52,
    left: 0,
    top: 0,
  },
  x012Login_email_group3_group2_path23: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 18.37,
    height: 7.52,
    left: 0,
    top: 0,
  },
  x012Login_email_group5: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.68,
    height: 12.81,
    left: 0,
    top: 1.24,
  },
  x012Login_email_group5_group4: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.68,
    height: 12.81,
    left: 0,
    top: 0,
  },
  x012Login_email_group5_group4_path24: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.68,
    height: 12.81,
    left: 0,
    top: 0,
  },
  x012Login_key: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    width: 16.16,
    height: 16.24,
    left: 357.05,
    top: 387.11,
  },
  x012Login_key_path25: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 1.32,
    height: 1.32,
    left: 11.88,
    top: 2.96,
  },
  x012Login_key_path26: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 16.16,
    height: 16.24,
    left: 0,
    top: 0,
  },
  x012Login_slikkLogo4: {
    opacity: 1,
    position: 'absolute',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 220,
    height: 66,
    left: 5,
    top: 15,
  },
  polygon: {
    left: -25,
    top: 138,
    color: '#171717'
  }
});
