import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
const slides = [
  {
    key: 1,
    heading: 'How Does it Work?',
    title: 'Step 1',
    text: 'Easy as 1,2,3! Just like you\'d order a takeaway or a bunch of clothes online.',
    image: require('../assets/step1.png'),
    steps: [
      {
        id: 1,
        title: 'Choose The Service You Want To Book',
        points: ['Car Wash & Customisation', 'Laundry & Clothing', 'Shoe Repair & Customisation', 'Smartpohone Repair']
      },
      {
        id: 2,
        title: 'Pick the Date, Time & Location',
        points: ['Date', 'Time', 'Location']
      },
      {
        id: 3,
        title: 'Confirm Bookin. Experience Service Delivery!',
        points: ['Confirm']
      }
    ],
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    heading: 'Exclusive Offers & Free Services',
    title: 'Title 2',
    text: 'Join the Slikk family by following our social media accounts. You can Win Prizes, Enjoy content, Talk to the Team & more!',
    image: require('../assets/step2.png'),
    steps: null,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    heading: 'Refer and Get Discount',
    title: 'Title 2',
    text: 'You can also get £10 Slikk credit for every person that joins and makes a booking using your refferal code. So, for every 10 users that join and book using your code they each get £10 - but you get £100 woth of free service straight to your door',
    image: require('../assets/step3.png'),
    steps: null,
    backgroundColor: '#febe29',
  },

];

export default class X012Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {

  }

  RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 50
        }}>
        <Image
          source={item.image}
          style={{ marginBottom: 40, width: 220, height: 220, borderRadius: 150, backgroundColor: 'white' }}
          resizeMode={"contain"}
        />
        <Text style={{ color: '#33feba', fontSize: 34, paddingHorizontal: 10, textAlign: "center", marginBottom: 30 }}>
          {item.heading}
        </Text>
        <Text style={{ color: 'white', paddingHorizontal: 24, textAlign: "center", fontSize: 17, marginVertical: 0 }}>
          {item.text}
        </Text>
        <View style={styles.stepsWrapper}>
          {item.steps != null && this.steps(item.steps)}
        </View>
      </View>
    );
  };

  steps = (steps) => {
    return (
      <FlatList
        data={steps}
        renderItem={this.renderSteps}
        keyExtractor={(item) => item.id}
      />
    )
  }

  renderSteps = ({ item }) => {
    return (
      <View style={styles.stepSingle}>
        <Icon name="check-circle" style={styles.checkIcon} color={"#33feba"} size={22} />
        <Text style={{ color: 'white', fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  };

  RenderNextButton = () => {
    return (
      <View style={{ paddingRight: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Next</Text>
      </View>
    );
  };

  RenderSkipButton = () => {
    return (
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Skip</Text>
      </View>
    );
  };

  RenderDoneButton = () => {
    return (
      <View>
        <TouchableOpacity style={{ width: '100%', borderRadius: 10, paddingRight: 10, textAlign: "center", alignItems: "center", justifyContent: "center" }}
          onPress={() => { this.props.navigation.navigate('SignIn') }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Finish</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this.RenderItem}
        showSkipButton={true}
        style={styles.container}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderSkipButton={this.RenderSkipButton}
        renderDoneButton={this.RenderDoneButton}
        renderNextButton={this.RenderNextButton}
      />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: '#1e2925',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 20
  },
  contain: {
    paddingHorizontal: 20
  },
  stepSingle: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  dotStyle: {
    borderColor: '#33feba',
    borderWidth: 1
  },
  activeDotStyle: {
    backgroundColor: '#33feba',
  },
  checkIcon: {
    marginRight: 10
  },
  stepsWrapper: {
    alignSelf: 'flex-start',
    paddingVertical: 30,
    paddingLeft: 35,
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
