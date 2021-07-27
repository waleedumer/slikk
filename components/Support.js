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
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.image} source={require('../assets/support.png')} />
      </View>
      <Text style={styles.heading3}>Support Center</Text>
      <Text style={styles.paragraph}>We're here to help you!</Text>
      <View
        style={{
          marginBottom: 10,
          width: '100%',
          flexDirection: 'row',
          height: 35,
          borderRadius: 3,
          marginTop: 15,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput style={styles.input} placeholder={'Subject'} />
        </View>
      </View>

      <View
        style={{
          marginBottom: 10,
          width: '100%',
          flexDirection: 'row',
          height: 100,
          borderRadius: 3,
          marginTop: 15,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10
          }}>
          <TextInput multiline style={styles.input} placeholder={'Details'} />
        </View>
      </View>

      <View style={{ backgoundColor: '#33feba', height: 40, marginTop: 10, width: '100%' }}>
        <Button
          title="Submit" style={{ width: '100%' }}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  inner: {
    width: 100,
    height: 100,
    backgroundColor: '#343434',
    borderRadius: 300,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 60,
    width: 60,
  },
  input: {
    height: '88%',
    float: 'left',
    flex: 1,
    fontSize: 15,
    paddingLeft: 25,
  },
  heading1: {
    margin: 12,
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#41FDFD',
  },
  heading2: {
    margin: 12,
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading3: {
    margin: 12,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: 300,
    marginTop: 0,
  },
});
