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

const imageUrl = [{
    url: require("./assets/Pharma1.jpg")
},{
    url: require("./assets/Pharma2.jpg")
},{
    url: require("./assets/Pharma3.jpg")
},{
    url: require("./assets/Pharma4.jpg")
},{
    url: require("./assets/Pharma5.jpg")
},]

const width = Dimensions.get('window').width;
const PharmaPage = () => {
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
                <View style={{opacity: 0}}>
                    <Icon1 name="bell" size={20} color="black" />
                </View>
            </View>
            <Carousel
                loop
                width={width * 0.9}
                height={width / 2.5}
                autoPlay={true}
                style={{marginBottom: 20}}
                data={imageUrl}
                scrollAnimationDuration={1000}
                renderItem={({ item, index }:{item: any, index:number}) => (
                    <View>
                        <ImageBackground source={item.url} style={{width: width * 0.9, height: width / 2.5}} imageStyle={{borderRadius: 10}}>
                        </ImageBackground>
                    </View>
                )}
            />
            <View style={{width: width, flex: 1}}>
                <FlatList
                    numColumns={2}
                    data={categoryData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.viewStyle} onPress={() => navigation.navigate("AboutPharma")}>
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

export default PharmaPage;