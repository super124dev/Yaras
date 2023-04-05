/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationSelector from './components/LocationSelector';
import CityList from './components/CityList';
import RestaurantList from './components/RestaurantList';
import CustomerPage from './components/CustomerPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "@react-native-material/core";
import VerifyEmail from './components/VerifyEmail';
import ErrorLocation from './components/ErrorLocation';
import AccountPage from './components/AccountPage';
import GroceryPage from './components/GroceryPage';
import CategoryFood from './components/CategoryFood';
import AboutRestaurant from './components/AboutRestaurant';
import PharmaPage from './components/PharmaPage';
import Detail from './components/Detail';
import ForRestaurant from './components/ForRestaurant';
import AdminPage from './components/AdminPage';
import 'react-native-gesture-handler';
import CartPage from './components/CartPage';
import PaymentSuccess from './components/PaymentSuccess';
import HomePage from './components/HomePage';
import RestaurantSetting from './components/RestaurantSetting';
import AboutGrocery from './components/AboutGrocery';
import GrocerySelect from './components/GrocerySelect';
import AboutPharma from './components/AboutPharma';
import GroceryCategory from './components/GroceryCategory';
import Tracking from './components/Tracking';
import PharmaCategory from './components/PharmaCategory';
import PharmaDetail from './components/PharmaDetail';
const Stack = createStackNavigator();

const LoadingPage = () => {
    const navigation = useNavigation();
    return(
    setTimeout(() => {
      navigation.navigate("CustomerPage");
    }, 2000),
    <View style={{flex: 1}}>
      <ImageBackground source={require("./components/assets/background.png")} resizeMode="cover" style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require("./components/assets/logo.png")} style={{width: 200, height: 100}} />
        <View style={styles.loadingStyle}><ActivityIndicator size="large" color='white'/></View>
      </ImageBackground>
    </View>
  )
}

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={LoadingPage} options={{headerShown: false}} />
      <Stack.Screen name="CustomerPage" component={CustomerPage} options={{headerShown: false}} />
      <Stack.Screen name="LocationSelector" component={LocationSelector} options={{headerShown: false}} />
      <Stack.Screen name="RestaurantList" component={RestaurantList} options={{headerShown: false}} />
      <Stack.Screen name="CityList" component={CityList} options={{headerShown: false}} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown: false}} />
      <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false}} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{headerShown: false}} />
      <Stack.Screen name="ErrorLocation" component={ErrorLocation} options={{headerShown: false}} />
      <Stack.Screen name="AccountPage" component={AccountPage} options={{headerShown: false}} />
      <Stack.Screen name="GroceryPage" component={GroceryPage} options={{headerShown: false}} />
      <Stack.Screen name="CategoryFood" component={CategoryFood} options={{headerShown: false}} />
      <Stack.Screen name="AboutRestaurant" component={AboutRestaurant} options={{headerShown: false}} />
      <Stack.Screen name="PharmaPage" component={PharmaPage} options={{headerShown: false}} />
      <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}} />
      <Stack.Screen name="ForRestaurant" component={ForRestaurant} options={{headerShown: false}} />
      <Stack.Screen name="AdminPage" component={AdminPage} options={{headerShown: false}} />
      <Stack.Screen name="CartPage" component={CartPage} options={{headerShown: false}} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{headerShown: false}} />
      <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}} />
      <Stack.Screen name="RestaurantSetting" component={RestaurantSetting} options={{headerShown: false}} />
      <Stack.Screen name="AboutGrocery" component={AboutGrocery} options={{headerShown: false}} />
      <Stack.Screen name="GrocerySelect" component={GrocerySelect} options={{headerShown: false}} />
      <Stack.Screen name="AboutPharma" component={AboutPharma} options={{headerShown: false}} />
      <Stack.Screen name="GroceryCategory" component={GroceryCategory} options={{headerShown: false}} />
      <Stack.Screen name="PharmaCategory" component={PharmaCategory} options={{headerShown: false}} />
      <Stack.Screen name="Tracking" component={Tracking} options={{headerShown: false}} />
      <Stack.Screen name="PharmaDetail" component={PharmaDetail} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default App;
