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
import Clothing from '../../services/Clothing';
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
      title: this.props.route.params.title,
      categoryId: this.props.route.params.categoryId,
      carSizeModal: false,
      carPackageModal: false,
      carPackagesDetailModal: false,
      timingsModal: false,
      oldservices: [
        {
          image: require('../../assets/popular.png'),
          title: 'Popular',
          navigate: 'DryCleaningDetail',
          desc:
            'Everyday Laundry, a simple wash, fold & dry service. 24hr service available for £5.',
        },
        {
          image: require('../../assets/body.png'),
          title: 'Body',
          navigate: 'DryCleaningBodyDetail',
          desc:
            'This is for individual cleaning. Items are washed or dry cleaned, as appropriate, pressed & delivered on hangers by default. Folding can be requested additionally. ',
        },
        {
          image: require('../../assets/shirts.png'),
          title: 'Shirts',
          navigate: 'DryCleaningShirtsDetail',
          desc:
            'This is for individual cleaning apart from bedsets. A standard double bedset is upto 4 pillowcases, 1 bedsheet & 1 duvet cover.  ',
        },
        {
          image: require('../../assets/jacket.png'),
          title: 'Jacket',
          navigate: 'DryCleaningJacketsDetail',
          desc:
            'Priced by the piece. Items are pressed and put onto hanger by default - add to order notes if you require folding. Minimum 48 hrs turnaround.',
        },
        {
          image: require('../../assets/top.png'),
          title: 'Top',
          navigate: 'DryCleaningTopDetail',
          desc:
            'Repairs & Alterations to bring your items back to life Minimum 4 day turnaround.',
        },
        {
          image: require('../../assets/bottom.png'),
          title: 'Bottom',
          navigate: 'DryCleaningBottomDetail',
          desc:
            'Repairs & Alterations to bring your items back to life Minimum 4 day turnaround.',
        },
        {
          image: require('../../assets/hat.png'),
          title: 'Hat',
          navigate: 'DryCleaningHatsDetail',
          desc:
            'Repairs & Alterations to bring your items back to life Minimum 4 day turnaround.',
        },
      ],
      services: []
    };
  }

  gotoHome = () => {
    this.props.navigation.navigate('Home');
  };

  account = () => {
    // this.props.navigation.navigate('Account')
    alert('Account Page Not Implemeted Yet');
  };

  componentDidMount() {
    Clothing.getSubCategories(this.state.categoryId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ services: responseJson.data })
      })
  }


  render() {
    let url = 'https://lab.mediabloo.com';
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <Text style={styles.heading}>{this.state.title}</Text>
          <TouchableOpacity onPress={this.gotoHome} style={styles.accountIcon}>
            <Icon name="home" size={32} color="#33feba" />
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
              // console.log(item.id)
              return (
                <View style={styles.serviceMainWrapper}>
                  <TouchableOpacity onPress={() => {
                    console.log(item.id)
                    this.props.navigation.navigate('ClothingPricings', {
                      title: this.state.title,
                      subTitle: item.name,
                      subId: item.id
                    })
                  }}>
                    <View style={styles.serviceImageWrapper}>
                      <Image
                        style={styles.image}
                        source={{ uri: url + item.image.url }}
                      />
                      <Text style={styles.serviceTagWrapper}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
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
    bottom: 10,
    left: 0,
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
    paddingTop: 15,
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
    height: 220,
    resizeMode: 'cover',
  },
});
