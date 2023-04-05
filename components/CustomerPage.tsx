import React, { useState, useEffect } from 'react';
import { View, Modal, Alert, Button, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';

import HomePage from './HomePage';
import CartPage from './CartPage';
import ErrorLocation from './ErrorLocation';
import AccountPage from './AccountPage';
import axios from 'axios';

const width = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
const CustomerPage = () => {
    const [orderProduct, setOrderProduct] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await axios.post('http://10.0.2.2:5000/addCart/getAllCart')
            if(data.data.success === true) {
                setOrderProduct(data.data.msg)
            }
        }
        getData();
    }, []);
    const navigation = useNavigation();
    return(
        <Tab.Navigator
            initialRouteName='HomePage'
            // barStyle={{backgroundColor: '#F1381D'}}
            // labeled={false}
            screenOptions={({route} : {route: any}) => ({
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#F1381D',
                tabBarInactiveBackgroundColor: '#F1381D',
                tabBarIcon: ({ focused, color, size }) => {
                    color = focused ? "white" : 'lightgrey';
                    size = focused ? 25 : 20;
                    if (route.name === 'HomePage') {
                        return <Icon2 name="home" size={size} color={color} />;
                    } else if (route.name === 'CartPage') {
                        return <Icon2 name="shopping-cart" size={size} color={color} />
                    } else if (route.name === 'AccountPage') {
                        return <Icon2 name="user" size={size} color={color} />
                    }
                },
            })}>
            <Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: {display:'none'}
                }}
            />
            <Tab.Screen
                name="CartPage"
                component={CartPage}
                options={{
                    tabBarBadge: orderProduct.length,
                    headerShown: false,
                    tabBarLabelStyle: {display:'none'}
                }}
            />
            <Tab.Screen
                name="AccountPage"
                component={AccountPage}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: {display:'none'}
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    
})

export default CustomerPage;