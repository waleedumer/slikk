import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image as SvgImage} from 'react-native-svg';

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeDetail: [
        {
          id: 1,
          title: 'Car Wash',
          created_at: '2021-01-27 17:42:45',
          updated_at: '2021-01-27 17:42:45',
          deleted_at: null,
          serviceid_id: 1,
          file_name: '6049a869dd435_car-service-(3).png',
          file_id: 38,
          navigate: 'CarPackages'
        },
        {
          id: 2,
          title: 'Wheel Refurbishment / Colour Change',
          created_at: '2021-01-27 17:42:54',
          updated_at: '2021-01-27 17:42:54',
          deleted_at: null,
          serviceid_id: 1,
          file_name: '6049a862b8877_tires.png',
          file_id: 37,
          navigate: 'AlloyPackages'
        },
        {
          id: 3,
          title: 'Calliper Respray',
          created_at: '2021-01-27 17:42:59',
          updated_at: '2021-01-27 17:42:59',
          deleted_at: null,
          serviceid_id: 1,
          file_name: '6049a85be22d7_tyre-(2).png',
          file_id: 36,
          navigate: 'CalliperPackages'
        },
        {
          id: 13,
          title: 'Coding / Diagnostic',
          created_at: '2021-02-25 10:18:36',
          updated_at: '2021-02-25 10:18:36',
          deleted_at: null,
          serviceid_id: 1,
          file_name: '6049a85260f39_permit.png',
          file_id: 35,
          navigate: 'CodingPackages'
        },
        {
          id: 14,
          title: 'Remap/Smart Repair',
          created_at: '2021-02-25 10:19:03',
          updated_at: '2021-05-08 10:06:24',
          deleted_at: null,
          serviceid_id: 1,
          file_name: '6049a849bfef5_maintenance-(1).png',
          file_id: 34,
          navigate: 'RemapPackages'
        },
      ],
      serviceImages: [
        require('../assets/wash.png'),
        require('../assets/wheel.png'),
        require('../assets/callipery.png'),
        require('../assets/coding.png'),
        require('../assets/remap.png'),
      ],

    };
  }

  handlePress(target, owner) { }

  handleChangeTextinput(name, value) { }

  loadLogin = () => { };

  gotoHome = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
          <Text style={styles.heading}>Car Lab</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={30} color="#33feba" />
          </TouchableOpacity>
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
                    backgroundColor: 'none',
                    flex: 1,
                    padding: 0,
                    top: 7,
                    margin: 10,
                    marginTop: 0,
                    marginBottom: 20,
                    elevation: 4,
                  }}>
                  <View >
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
                          resizeMode: 'cover',
                          padding: 0,
                          backgroundColor: 'white'
                        }}
                        source={this.state.serviceImages[index]}
                      />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 5 }}>
                      <Text
                        style={{
                          left: 5,
                          fontSize: 18,
                          color: '#33feba',
                          marginTop: 0,
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
      </View>
    );
  }
}

X012Login.propTypes = {};

X012Login.defaultProps = {};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    paddingTop: 20,
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
  headingWrapper: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginTop: 0,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 24,
  },
  headingcolored: {
    color: '#24D8D8',
    fontSize: 20,
  },
});
