import React from 'react'
import {Dimensions, View, Text, StyleSheet} from 'react-native'
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Icon2 from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import GroceryDetail from './GroceryDetail';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Tab = createMaterialTopTabNavigator();

const categoryData = [
    {
        title: 'Fruits & Vegetables',
        imageUrl: require("./assets/fruit.png")
    },{
        title: 'Chicken & Meat',
        imageUrl: require("./assets/chicken.png")
    },{
        title: 'Diary',
        imageUrl: require("./assets/dairy.png")
    },{
        title: 'Cooking Essentials',
        imageUrl: require("./assets/oil.png")
    },{
        title: 'Breakfast',
        imageUrl: require("./assets/breakfast.png")
    },{
        title: 'Sahar',
        imageUrl: require("./assets/sahar.png")
    },{
        title: 'Personal Care',
        imageUrl: require("./assets/personal_care.png")
    },{
        title: 'Baby Care',
        imageUrl: require("./assets/baby_care.png")
    },{
        title: 'Cosmetics',
        imageUrl: require("./assets/cosmtetics.png")
    },{
        title: 'Pantry',
        imageUrl: require("./assets/pantry.png")
    },{
        title: 'Cleaning',
        imageUrl: require("./assets/cleaning.png")
    },{
        title: 'Frozen',
        imageUrl: require("./assets/frozen.png")
    },{
        title: 'Dry & Dried Fruit',
        imageUrl: require("./assets/dried_fruit.png")
    },{
        title: 'Snacks',
        imageUrl: require("./assets/snack.png")
    },{
        title: 'Beverages',
        imageUrl: require("./assets/beverages.png")
    },{
        title: 'Health & Wellness',
        imageUrl: require("./assets/health_wellness.png")
    },{
        title: 'Kitchen',
        imageUrl: require("./assets/kitchen.png")
    },{
        title: 'Ice Cream & Desserts',
        imageUrl: require("./assets/icecream.png")
    },{
        title: 'Baking',
        imageUrl: require("./assets/baking.png")
    },{
        title: 'Pet Care',
        imageUrl: require("./assets/petcare.png")
    },{
        title: 'Tobacco & Nicotine',
        imageUrl: require("./assets/tobacco.png")
    },{
        title: 'Household',
        imageUrl: require("./assets/household.png")
    },{
        title: 'Sports',
        imageUrl: require("./assets/sport.png")
    },{
        title: 'Office & School',
        imageUrl: require("./assets/school.png")
    },
]

const width = Dimensions.get('window').width;
const AboutGrocery = () => {
    const navigation = useNavigation();
    return(
        <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, width: '100%'}}>
                    <View onTouchEnd={() => navigation.goBack()}>
                        <Icon2 name="arrow-left" size={20} color="black" />
                    </View>
                    <View style={styles.flexDirector}>
                        <Icon2 name="map-pin" size={20} color="black" />
                        <Text style={styles.TextStyle}>House</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("CartPage")}>
                        <Icon2 name="shopping-bag" size={20} color="#F1381D" />
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator 
                screenOptions={{
                    tabBarScrollEnabled: true,
                    tabBarItemStyle: { padding: 0, borderColor: '#ff6f2e', width: 'auto', marginLeft: 5, marginRight: 5 },
                    tabBarActiveTintColor: '#ff6f2e',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: {fontFamily: 'poppins_medium', fontSize: 15},
                    tabBarStyle: { backgroundColor: '#f2f2f2', borderColor: '#ff6f2e' },
                    tabBarIndicatorStyle: {backgroundColor: '#ff6f2e'},
                    tabBarPressColor: 'transparent'
                }}>
                {categoryData.map((item, index) => <Tab.Screen key={index} name={item.title} component={GroceryDetail} initialParams={{groceryType: item.title}} /> )}
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10
    },
    flexDirector: {
        flexDirection: 'row',
        gap: 5
    },
    TextStyle: {
        fontFamily: 'poppins_medium',
        color: 'black'
    },
})

export default AboutGrocery;