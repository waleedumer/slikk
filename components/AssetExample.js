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
  Share
} from 'react-native';

export default function AssetExample() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi there, Visit this link and get 20% off on your first order. Create your             account now!',
        url: 'http://labdark.mediabloo.com/register',
        title: 'Slikk'
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
        <Image style={styles.logo} source={require('../assets/refferal.png')} />
      </View>
      <Text style={styles.heading3}>Refer Your Friend</Text>
      <Text style={styles.heading1}>Get 20% Off</Text>
      <Text style={styles.paragraph}>
        Share below link with your friend and earn points when they signup using
        refferal link/code.
      </Text>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          height: 50,
          borderRadius: 5,
          marginTop: 15,
          backgroundColor: 'white'
        }}>
        <View style={{ justifyContent: 'center' }}>
          <Icon name="clone" style={{ fontSize: 25, marginLeft: 10 }} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput style={styles.input} value={'ADS092'} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View
            style={{ color: 'black', backgroundColor: '#41FDFD', margin: 5 }}>
            <Button onPress={onShare} color="#41FDFD" title="Share" />
          </View>
        </View>
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
    width: 200,
    height: 200,
    backgroundColor: 'blue',
    borderRadius: 300,
    overflow: 'hidden',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  },
  input: {
    height: 20,
    margin: 12,
    width: '70%',
    float: 'left',
    flex: 1,
    fontSize: 22,
    marginLeft: 20
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
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: 100,
  },
});
