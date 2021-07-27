import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Share,
} from 'react-native';

export default function Support() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi there, Visit this link and get 20% off on your first order. Create your             account now!',
        url: 'http://labdark.mediabloo.com/register',
        title: 'Slikk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.aboutcontainer}>
      <View style={styles.bgsolid}></View>
      <Image style={styles.bgimage} source={require('../assets/london.jpg')} />
      <View style={styles.bggradient}></View>
      <Text style={styles.heading1}>Slikk</Text>
      <Text style={styles.paragraph}>
        <Icon name="quote-left" style={styles.quotes} />
        is a London-based, on-demand provider for a range of popular services.
        From dry cleaning to customisation there are a range of services to suit
        your lifestyle - all delivered to your doorstep.
        <Icon name="quote-right" style={styles.quotes} />
      </Text>
      <View>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../assets/mission.png')} />
          <Text style={styles.iconHeading}>Our Mission</Text>
        </View>
        <View style={styles.iconText}>

          <Text style={styles.iconParagraph}>
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../assets/plan.png')} />
          <Text style={styles.iconHeading}>Our Plan</Text>
        </View>
        <View style={styles.iconText}>

          <Text style={styles.iconParagraph}>
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../assets/vision.png')} />
          <Text style={styles.iconHeading}>Our Vision</Text>
        </View>
        <View style={styles.iconText}>

          <Text style={styles.iconParagraph}>
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutcontainer: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 25
  },
  quotes: {
    fontSize: 30,
    marginRight: 5,
    marginLeft: 5,
    fontStyle: 'italic'
  },
  iconHeading: {
    fontSize: 20,
    color: '#41FDFD',
    marginLeft: 5,
  },
  iconParagraph: {
    color: 'gray',
    marginLeft: 5,
  },
  iconText: {
    flex: 1,
    marginLeft: 10
  },
  icon: {
    width: 40,
    height: 40
  },
  inner: {
    width: 100,
    height: 100,
    backgroundColor: '#343434',
    borderRadius: 300,
    overflow: 'hidden',

    justifyContent: 'flex-start',
  },
  bgimage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '40%',
    width: '100%',
    opacity: 0.4,
  },
  bgsolid: {
    backgroundColor: '#014242',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '40%',
    width: '100%',
  },
  bggradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '40%',
    width: '100%',
    backgroundColor: 'linear-gradient(190deg, rgba(255,255,255,0) 0%, #161616 83%)',
  },
  input: {
    height: '88%',
    flex: 1,
    fontSize: 15,
    paddingLeft: 5,
  },
  heading1: {
    margin: 12,
    marginBottom: 0,
    fontSize: 30,
    color: 'white',

    color: '#41FDFD',
    zIndex: 1,
  },
  heading2: {
    margin: 12,
    fontSize: 28,
    color: 'white',

    zIndex: 1,
  },
  heading3: {
    margin: 12,
    fontSize: 22,
    color: 'white',

    marginBottom: 5,
    zIndex: 1,
  },
  paragraph: {
    margin: 12,
    fontSize: 16,
    color: 'white',


    marginTop: 0,
    zIndex: 1,
    fontStyle: 'italic'
  },
});
