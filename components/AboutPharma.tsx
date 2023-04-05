import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, Image, StyleSheet, FlatList, ImageBackground} from 'react-native'
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Icon2 from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const categoryData = [
    {
        title: 'Baby & Mom',
        imageUrl: require("./assets/baby_mom.png")
    },{
        title: 'Vitamins & Supplements',
        imageUrl: require("./assets/vitamin.png")
    },{
        title: 'Eye Care',
        imageUrl: require("./assets/eyecare.png")
    },{
        title: 'First Aid',
        imageUrl: require("./assets/firstaid.png")
    },{
        title: 'Healthcare Devices',
        imageUrl: require("./assets/healthcaredevice.png")
    },{
        title: 'Herbal Healthcare',
        imageUrl: require("./assets/herbalhealthcare.png")
    },{
        title: 'Medicines',
        imageUrl: require("./assets/medicine.png")
    },{
        title: 'Otc & General Care',
        imageUrl: require("./assets/generalcare.png")
    },{
        title: 'Personal Care',
        imageUrl: require("./assets/cosmtetics.png")
    },{
        title: 'Pregnancy',
        imageUrl: require("./assets/pantry.png")
    },{
        title: 'Sexcual Wellness',
        imageUrl: require("./assets/cleaning.png")
    },{
        title: 'Skin Care',
        imageUrl: require("./assets/frozen.png")
    },{
        title: 'Surgical Aid',
        imageUrl: require("./assets/dried_fruit.png")
    },{
        title: 'Covid',
        imageUrl: require("./assets/snack.png")
    }
]
import GroceryDetail from './GroceryDetail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PharmaDetail from './PharmaDetail';

const width = Dimensions.get('window').width;
const AboutPharma = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])

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
                {categoryData.map((item, key) => <Tab.Screen key={key} name={item.title} component={PharmaDetail} initialParams={{groceryType: item.title}} /> )}
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

export default AboutPharma;