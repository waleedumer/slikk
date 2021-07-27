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
  FlatList,
  Share,
} from 'react-native';

export default function Support() {
  const FAQS = [
    {
      num: 1,
      question: 'How to use it?',
      answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
      num: 2,
      question: 'Cash On Services Available?',
      answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
      num: 3,
      question: 'Is there any subscription plan?',
      answer: 'Lorem Ipsum is a dummy text for content'
    },
    {
      num: 4,
      question: 'What are the delivery charges?',
      answer: 'Lorem Ipsum is a dummy text for content'
    },

  ];

  const Item = ({ question, answer, num }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{num}- {question}</Text>
      <Text style={styles.desc}>{answer}</Text>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <Item question={item.question} answer={item.answer} num={index + 1} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headeing}>FAQs</Text>

      <FlatList
        data={FAQS}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  headeing: {
    fontSize: 24,
    marginBottom: 20,
    color: '#33feba'
  },
  item: {
    width: '100%',
    borderColor: '#0B0B0B',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  orderImage: {
    width: '28%',
    height: 80,
    marginRight: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  amount: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#41FDFD',
    fontSize: 16
  },
  orderText: {
    flex: 1,
  },
  title: {
    color: '#33feba',
    fontSize: 16,
    marginBottom: 10,
  },
  desc: {
    color: 'white',
    fontSize: 16
  },
  date: {
    color: 'gray',
    marginTop: 5
  },
  icon: {
    color: 'yellow',
  },
  ratings: {
    position: 'absolute',
    flexWrap: 'wrap',
    top: 0,
    right: 0,
    flexDirection: 'row'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonInner: {
    height: 0,
    backgroundColor: 'white'
  },
  container: {
    padding: 24,

    paddingBottom: 30,
    paddingTop: 40
  },
  aboutcontainer: {
    backgroundColor: 'transparent',
    marginTop: 30,
    paddingBottom: 20,
    height: '100%'
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
    paddingRight: 10,
    paddingLeft: 10,
  },
  iconHeading: {
    fontSize: 35,
    color: '#33feba',
    marginLeft: 5,
  },
  iconParagraph: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 18
  },
  iconText: {
    marginLeft: 10
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
    fontSize: 40,
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
    fontSize: 22,
    color: 'white',
    marginTop: 0,
    zIndex: 1,

  },
});
