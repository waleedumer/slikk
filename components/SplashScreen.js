import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this._storeData().then(response => {
      if (response) {
        this.setState({ isLoggedIn: true })
      }
      setTimeout(() => {
        if (this.state.isLoggedIn)
          this.props.navigation.navigate('Home')
        else
          this.props.navigation.navigate('Introduction')
      }, 3000);
    });
  }

  _storeData = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      return token
    } catch (error) {
      // Error saving data
      console.log(error)
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../assets/bg.png')} style={styles.image}>
          <Image source={require('../assets/logo-nav.png')} style={styles.logo} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#1e2925',
    paddingBottom: 0,
    paddingTop: 0
  },
  logo: {
    width: '70%',
    height: 100
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    resizeMode: "contain",
    justifyContent: "center"
  }
});
