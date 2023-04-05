import React, { useState, useEffect } from 'react';
import { View, Modal, Alert, Button, Text, StyleSheet, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';

import HomePage from './HomePage';
import CartPage from './CartPage';
import ErrorLocation from './ErrorLocation';
import FoodPage from './AccountPage';
import AboutRestaurant from './AboutRestaurant';

import axios from 'axios';

const width = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();
const RestaurantSetting = ({route} : any) => {
    const navigation = useNavigation();
    const {restaurantName} = route.params;
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
    return(
        <Tab.Navigator 
            screenOptions={({route} : {route: any}) => ({
                tabBarIcon: ({ focused, color, size}) => {
                    color = focused ? "#F1381D" : 'gray';
                    size = focused ? 25 : 20;
                    if (route.name === 'AboutRestaurant') {
                        return <Icon2 name="home" size={size} color={color} />;
                    } else if (route.name === 'CartPage') {
                        return <Icon2 name="shopping-cart" size={size} color={color} />
                    } else if (route.name === 'FoodPage') {
                        return <Icon2 name="user" size={size} color={color} />
                    }
                },
            })}>
            <Tab.Screen
                name="AboutRestaurant"
                component={AboutRestaurant}
                initialParams={{restaurantName: restaurantName}}
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
                name="FoodPage"
                component={FoodPage}
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

export default RestaurantSetting;