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
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Image as ReactImage } from 'react-native';
import Svg, { Defs, Pattern } from 'react-native-svg';
import { Path as SvgPath } from 'react-native-svg';
import { Text as SvgText } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    AsyncStorage.setItem('CartItems', '');
    super(props);
    this.state = {
      challengeDetail: [
        {
          id: 1,
          title: 'Cars',
          created_at: '2021-01-26 06:43:19',
          updated_at: '2021-01-26 06:43:19',
          deleted_at: null,
          navigate: 'Detail'
        },
        {
          id: 2,
          title: 'Clothes',
          created_at: '2021-01-26 06:43:30',
          updated_at: '2021-01-26 06:43:30',
          deleted_at: null,
          navigate: 'ClothingLab'
        },
        {
          id: 3,
          title: 'Shoes',
          created_at: '2021-01-26 06:43:36',
          updated_at: '2021-01-26 06:43:36',
          deleted_at: null,
          navigate: 'ShoeCustomPackages'
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
    };
  }

  handlePress(target, owner) { }

  handleChangeTextinput(name, value) { }

  subCategory = (screen) => {
    this.props.navigation.navigate(screen)
  };

  account = () => {
    this.props.navigation.navigate('Account')
    // alert('Account Page Not Implemeted Yet')
  }

  render() {

    return (
      <View style={styles.mainContainer}>
        <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
          <TouchableOpacity onPress={this.account} style={styles.accountIcon}>
            <Icon name="user" size={25} color="#33feba" />
          </TouchableOpacity>
        </View>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>Book Range of Services to </Text>
          <Text style={styles.headingcolored}>Your Doorstep</Text>
        </View>
        <View style={styles.servicesScroller}>
          <FlatList
            data={this.state.challengeDetail}
            keyExtractor={(item) => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    borderRadius: 15,
                    flex: 0.5,
                    padding: 10,
                    top: 7,
                    margin: 10,
                    marginTop: 0,
                    marginBottom: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 13.97,
                    elevation: 4,
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(item.navigate, {
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
                          marginVertical: 10,
                          padding: 20,
                        }}
                        source={this.state.serviceImages[index]}
                      />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 5 }}>
                      <Text
                        style={{
                          left: 5,
                          fontSize: 22,
                          color: '#33feba',
                          marginTop: -8,
                        }}
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          left: -7,
                          fontSize: 14,
                          color: '#fff',
                          marginTop: 3,
                          marginHorizontal: 15,
                        }}>
                        {this.state.servicesDesc[index]}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: 'black',
    paddingBottom: 10,
    paddingTop: 20
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderColor: '#33feba',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 5,
    marginRight: 5
  },
  servicesScroller: {
    marginBottom: 120
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
  headingcolored: {
    color: '#33feba',
    fontSize: 20,
  },
});
