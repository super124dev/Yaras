import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, Button, Pressable, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';

interface LCurrentInfo {
    latitude: String,
    longitude: String,
}

const LocationSelector = () => {
    const navigation = useNavigation();
    const [currentInfo, setCurrentInfo] = useState({});

    const [buttonText, SetButtonText] = useState("Use Current Location");

    useEffect(() => {
        const config = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 3600000,
        };
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

    const onPressCurrentLocation = async () => {
        console.log("Lat & Lng ====================>", currentInfo.latitude, currentInfo.longitude);
        const res2: any = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currentInfo.latitude + "," + currentInfo.longitude + "&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc");
        let len = res2.data.results[0].address_components.length;
        
        let countryname;
        for(let i = 0; i < len; i ++) {
            if(res2.data.results[0].address_components[i].types[0] === "country")
            countryname = res2.data.results[0].address_components[i].long_name
        }
        console.log(countryname);
        SetButtonText(currentInfo.latitude);
        if(countryname != "Angola") {
            navigation.navigate("ErrorLocation");
        } else {
            navigation.navigate("CityList");
        }
    }

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'space-between', backgroundColor: 'white' }}>
            <View>
                <Image
                    source={require("./assets/mapMarker1.gif")}
                    style={{ width: 70, height: 150, marginTop: 30 }}
                />
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>Grant your location</Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>access</Text>
                <Text>Cheetay needs your location to show available options in your area</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => onPressCurrentLocation()}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Use Current Location</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{ fontSize: 5 }}></Text>
                <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("CityList")}><Text style={{ color: '#fd702f' }}>Or Select Another Location</Text></Pressable>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    pressableView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LocationSelector;