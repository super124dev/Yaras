import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native'
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-alternatives-directions';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

const countries = [
    'Office',
    'Home',
    'Parents',
];

const GOOGLE_MAPS_APIKEY = 'AIzaSyB2FcFkoT0dg6LnRgsNHjqQnmeexOTM9Fs';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const Tracking = () => {
    const navigation = useNavigation();
    const [currentInfo, setCurrentInfo] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            // await Geolocation.getCurrentPosition(
            //     info => setCurrentInfo(info.coords),
            //     error => console.log("ERROR", error),
            //     config,
            // );
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 2000,
            })
            .then(location => {
                setCurrentInfo(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        }
        fetchData();
    }, [currentInfo])
    return(
        <View style={styles.container}>
            <View>
                <MapView style={{width: width, height: height * 0.6, marginBottom: 10 }} initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <Marker coordinate={origin}>
                        <Image source={require("./assets/mapLocationIcon.png")} style={{ height: 50, width: 30 }} resizeMode='cover' />
                    </Marker>
                    <Marker coordinate={destination}>
                        <Image source={require("./assets/mapLocationIcon.png")} style={{ height: 50, width: 30 }} resizeMode='cover' />
                    </Marker>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        lineCap='round'
                    />
                </MapView>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width *0.9, position: 'absolute', top: width * 0.05, left: width * 0.05}}>
                <TouchableOpacity style={{padding: 10, borderRadius: 7, backgroundColor: 'white'}} onPress={() => navigation.goBack()}>
                    <Icon3 name='left' size={20} color={'#0DA31A'} />
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10, borderRadius: 7, backgroundColor: 'white'}}>
                    <Icon3 name='find' size={25} color={'#0DA31A'} />
                </TouchableOpacity>
            </View>
            <View style={{width: width * 0.95, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 50}}>
                    <Icon2 name="map-pin" size={25} color="#B03129" />
                </View>
                <Text style={{color: '#606060', fontSize: 15}}>Delivery address</Text>
            </View>
            <View style={{width: width * 0.95}}>
                <Text style={{color: 'black', fontSize: 20, marginLeft: 50}}>Kancilan, Kembang, Jepara</Text>
            </View>
            <View style={{width: width * 0.95, marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 50}}>
                    <Image source={require("./assets/flagIcon.png")} style={{width: 25, height: 25}} resizeMode='cover' />
                </View>
                <Text style={{color: '#606060', fontSize: 15}}>Arrive in</Text>
            </View>
            <View style={{width: width * 0.95}}>
                <Text style={{color: 'black', fontSize: 20, marginLeft: 50}}>15 Minutes</Text>
            </View>
            <View style={{width: width * 0.95, alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                <Image source={require("./assets/linePng.png")} style={{width: width * 0.95}} resizeMode='cover' />
            </View>
            <View style={{width: width * 0.95, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={require("./assets/avatarPhoto.png")} style={{width: 60, height: 60, borderRadius: 50}} resizeMode='cover' />
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black', fontSize: 20}}>Deleiver Boy name</Text>
                        <Text style={{color: '#606060', fontSize: 15}}>Courier</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity style={{padding: 5, backgroundColor: '#F1381D', borderRadius: 10}}>
                        <Icon2 name="phone" size={25} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 5, backgroundColor: '#F1381D', borderRadius: 10, marginRight: 10}}>
                        <Icon2 name="mail" size={25} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
                <TouchableOpacity style={{backgroundColor: '#F1381D', borderRadius: 10, width: width * 0.9, paddingVertical: 10, alignItems: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'poppins_medium'}}>Live Tracking</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    flexDirector: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    TextStyle: {
        fontFamily: 'poppins_medium',
        color: 'black'
    },
})

export default Tracking;