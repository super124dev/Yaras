import React, {useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const restaurantBuildings = [
    require("./assets/RestaurantBuilding1.jpg"),
    require("./assets/RestaurantBuilding2.jpg"),
    require("./assets/RestaurantBuilding3.jpg"),
    require("./assets/RestaurantBuilding4.jpg"),
    require("./assets/RestaurantBuilding5.jpg"),
    require("./assets/RestaurantBuilding6.jpg"),
    require("./assets/RestaurantBuilding7.jpg"),
    require("./assets/RestaurantBuilding8.jpg"),
]

const CategoryFood = ({route} : any) => {
    const {category} = route.params;
    const [restaurantList, setRestaurantList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getData = async () => {
            const data = await axios.post('http://10.0.2.2:5000/food/getFoodData', {
                Category: category
            })
            if(data.data.success === true) {
                setRestaurantList(data.data.msg);
            }
        }
        getData();
    }, [route]);
    return(
        <View style={{flex: 1,alignItems: 'center', padding: 5}}>
            {/* <Text style={{fontSize: 20, color: 'black'}}>Restaurants</Text> */}
            <Image source={require("./assets/restaurantHeaderMark.png")} style={{width: width * 0.6, height: 80, marginBottom: 5}} />

            <FlatList
                data={restaurantList}
                renderItem={({item}) => (
                    <View style={{alignItems: 'center', width: width}}>
                        <View style={styles.restaurantCardView} onTouchEnd={() => navigation.navigate("AboutRestaurant", {restaurantName: item.RestaurantName})}>
                            <Image style={{width: 50, height: 50, borderRadius: 10}} source={restaurantBuildings[Math.floor(Math.random() * 8) % 8]} />
                            <Text style={styles.Restaurantname}>{item.RestaurantName}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={{width: width * 0.9, alignItems: 'flex-end', marginTop: 5}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: width * 0.2}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("./assets/goback.png")} style={{width: 20, height: 20}} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    restaurantCardView: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#d7d7d7',
        borderRadius: 7,
        width: '90%',
        padding: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    Restaurantname: {
        fontFamily: "Arial",
        fontSize: 15,
        color: 'black',
        marginLeft: 20
    }
})

export default CategoryFood;