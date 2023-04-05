import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, Image, StyleSheet, FlatList, ImageBackground} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const imageUrl = [{
    url: require("./assets/Grocery1.jpg")
},{
    url: require("./assets/Grocery2.jpg")
},{
    url: require("./assets/Grocery3.jpg")
},{
    url: require("./assets/Grocery4.png")
},{
    url: require("./assets/Grocery5.jpg")
},]

const width = Dimensions.get('window').width;
const GroceryPage = () => {
    const navigation = useNavigation();

    return(
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
            <Carousel
                width={width * 0.9}
                height={width / 2.5}
                autoPlay={true}
                style={{marginBottom: 20}}
                data={imageUrl}
                scrollAnimationDuration={1000}
                renderItem={({ item, index }:{item: any, index:number}) => (
                    <View style={{width: width * 0.9}}>
                        <ImageBackground source={item.url} style={{width: width * 0.9, height: width / 2.5}} imageStyle={{borderRadius: 10}}>
                        </ImageBackground>
                    </View>
                )}
            />
            <View style={{width: width, flex: 1}}>
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={categoryData}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.viewStyle} onPress={() => navigation.navigate("AboutGrocery")}>
                            <Text style={styles.Restaurantname}>{item.title}</Text>
                            <Image source={item.imageUrl} resizeMode='cover' style={{width: 50, height: 50, borderRadius: 10}} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    flatListStyle: {
        justifyContent: 'space-between',
    },
    viewStyle: {
        flex: 1,
        width: width * 0.45,
        marginLeft: width * 0.025,
        marginRight: width * 0.025,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d7d7d7',
        borderRadius: 7,
        gap: 15,
        marginBottom: 10,
        paddingLeft: 10
      },
    Restaurantname: {
        fontFamily: "Poppins_medium",
        maxWidth: width * 0.3,
        fontSize: 13,
        color: 'black'
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

export default GroceryPage;