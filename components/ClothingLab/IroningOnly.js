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
      services: [
        {
          image: require('../../assets/dci.png'),
          title: 'Most Popular',

        },
        {
          image: require('../../assets/body2.png'),
          title: 'Body',

        },
        {
          image: require('../../assets/pile.png'),
          title: 'Shirts',

        },
        {
          image: require('../../assets/stand.png'),
          title: 'Jackets',

        },
        {
          image: require('../../assets/polos.png'),
          title: 'Tops',

        },
        {
          image: require('../../assets/pants.png'),
          title: 'Bottom',

        },
        {
          image: require('../../assets/other.png'),
          title: 'Other',

        },
      ],
    };
  }

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  account = () => {
    // this.props.navigation.navigate('Account')
    alert('Account Page Not Implemeted Yet');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.heading}>Ironing Only</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#2CFDFD" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.servicesScroller}>
          <FlatList
            data={this.state.services}
            keyExtractor={(item) => item.id}
            numColumns={1}
            horizontal={false}
            style={styles.listWrapper}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.serviceMainWrapper}>
                  <View style={styles.serviceImageWrapper}>
                    <Image
                      style={styles.image}
                      source={item.image}
                    />
                    <Text style={styles.serviceTagWrapper}>{item.title}</Text>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  serviceMainWrapper: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10
  },
  listWrapper: {
    padding: 20
  },
  serviceImageWrapper: {},
  serviceTagWrapper: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  serviceTextWrapper: {
    padding: 10
  },
  checkoutBtnWrapper: {
    backgroundColor: '#2CFDFD',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  btnTxt: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
  },
  mainContainer: {
    justifyContent: 'flex-start',
    marginTop: 15,
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
  heading: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
});
