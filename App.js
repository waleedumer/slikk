import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform
} from 'react-native';
import Constants from 'expo-constants';

import SplashScreen from './components/SplashScreen';
import Introduction from './components/Introduction';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import HomeScreen from './components/HomeScreen';
import Account from './components/Account';
import SubCategory from './components/SubCategory';
import CarPackages from './components/CarPackages';
import AlloyPackages from './components/AlloyPackages';
import CalliperPackages from './components/CalliperPackages';
import CodingPackages from './components/CodingPackages';
import RemapPackages from './components/RemapPackages';
import ShoeCustomPackages from './components/ShoeCustomPackages';
import ShoeCleanPackages from './components/ShoeCleanPackages';
import ClothingLab from './components/ClothingLab';
import WashnFold from './components/WashnFold';
import WashDry from './components/WashDry';
import SeprateWash from './components/ClothingLab/SeprateWash';
import SubCategories from './components/ClothingLab/SubCategories';
import ClothingPricings from './components/ClothingLab/ClothingPricings';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DryCleaningBodyDetail from './components/ClothingLab/DryCleaningBodyDetail';
// import DryCleaningShirtsDetail from './components/ClothingLab/DryCleaningShirtsDetail';
// import HomeBedding from './components/ClothingLab/HomeBedding';
// import HomeBeddingDetail from './components/ClothingLab/HomeBeddingDetail';
// import IroningOnly from './components/ClothingLab/IroningOnly';
// import IroningOnlyDetail from './components/ClothingLab/IroningOnlyDetail';
// import ClothRepairing from './components/ClothingLab/ClothRepairing';
// import ClothReapiringDetail from './components/ClothingLab/ClothReapiringDetail';
import Checkout from './components/Checkout';
import CheckoutShoes from './components/CheckoutShoes';
import CheckoutCar from './components/CheckoutCar';

import Refferal from './components/MyAccountScreens/Refferal';
import Support from './components/MyAccountScreens/Support';
import About from './components/MyAccountScreens/About';
import Orders from './components/MyAccountScreens/Orders';
import FAQ from './components/MyAccountScreens/FAQ';
import Update from './components/MyAccountScreens/Update';

const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.statusBarHeight}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator headerTitle={"none"} initialRouteName="SplashScreen" header={this.header} headerMode={"none"}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Introduction" component={Introduction} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={SubCategory} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="CarPackages" component={CarPackages} />
          <Stack.Screen name="AlloyPackages" component={AlloyPackages} />
          <Stack.Screen name="CalliperPackages" component={CalliperPackages} />
          <Stack.Screen name="CodingPackages" component={CodingPackages} />
          <Stack.Screen name="RemapPackages" component={RemapPackages} />
          <Stack.Screen name="ShoeCustomPackages" component={ShoeCustomPackages} />
          <Stack.Screen name="ShoeCleanPackages" component={ShoeCleanPackages} />
          <Stack.Screen name="ClothingLab" component={ClothingLab} />
          <Stack.Screen name="WashnFold" component={WashnFold} />
          <Stack.Screen name="SeprateWash" component={SeprateWash} />
          <Stack.Screen name="WashDry" component={WashDry} />
          <Stack.Screen name="SubCategories" component={SubCategories} />
          <Stack.Screen name="ClothingPricings" component={ClothingPricings} />
          {/* <Stack.Screen name="DryCleaningDetail" component={DryCleaningDetail} />
          <Stack.Screen name="DryCleaningBodyDetail" component={DryCleaningBodyDetail} />
          <Stack.Screen name="DryCleaningShirtsDetail" component={DryCleaningShirtsDetail} />
          <Stack.Screen name="HomeBedding" component={HomeBedding} />
          <Stack.Screen name="HomeBeddingDetail" component={HomeBeddingDetail} />
          <Stack.Screen name="IroningOnly" component={IroningOnly} />
          <Stack.Screen name="IroningOnlyDetail" component={IroningOnlyDetail} />
          <Stack.Screen name="ClothRepairing" component={ClothRepairing} />
          <Stack.Screen name="ClothReapiringDetail" component={ClothReapiringDetail} /> */}
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="CheckoutShoes" component={CheckoutShoes} />
          <Stack.Screen name="CheckoutCar" component={CheckoutCar} />
          <Stack.Screen name="Refferal" component={Refferal} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="Update" component={Update} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

header: ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

  return (
    <MyHeader style={styles.headerStyle} />
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: '#161616',
  },
};


const styles = StyleSheet.create({
  statusBarHeight: {
    flex: 1,
  },
  headerStyle: {
    height: 20,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#161616',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading1: {
    margin: 12,
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#239EB8',
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
});
