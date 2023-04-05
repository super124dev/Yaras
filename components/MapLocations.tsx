import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { ActivityIndicator } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';

const MapLocations = () => {
    const navigation = useNavigation();
    let [loading, setLoading] = useState(false);
    let [results, setResults] = useState([]);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const res1: any = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=angole+cities&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc")
            let data1 = res1.data.results;
            console.log(data1);
            const res2 = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=angole+cities&pagetoken=AfLeUgOKjvRgruLp9ecnBXaK6K6ppiGM9cVa7cWIzlUxi1IHv1oWJvh1N7_Vhj5H4Ns9rN_LrbZEwoBl9PuDSy9Cw4PHrkaPzYD9MM1zEC2zaLJIKOeXAeM3fShXHSmR97tHlFcYncJQ4b8HDqJ91RhJfghaZAVZ8SeMCmlE9Yr27uWidfLjbJcXwSQS_oajywr6_cBMSseySeZOnlIDagliSPanJbk4s9mc94EAB6xw21JmszjsSmSgZ0OIBJ46BgXZGaQVgNU78oxUeu3yGQr6UGMPn35H2ZJ5aNgMH3t6I4Vhz7J7OPSzQWr94sOPCFnN-R1OuyXbuP3UnOzwf8hBoM8GzLmb_fzQDLkr5j-0XiEZlOd-fvpwJsLrF4Gzp5DtpbWwSE9vFxhfOgY&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc")
            let data2 = res2.data.results;
            data1 = [...data1, ...data2];
            setResults(data1.map((item:any, idx:number) => {
                return (<View style={styles.viewStyle} key={idx} onTouchEnd={() => navigation.navigate("RestaurantList", { cityname: item.name })}>
                    <Image source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + item.photos[0].photo_reference + "&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc" }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                    <Text style={styles.Cityname}>{item.name}</Text>
                </View>)
            }));
            setLoading(false);
        })();
    }, [])

    return (
        <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white', width: '100%' }}>
            {loading ? <View style={styles.loadingStyle}><ActivityIndicator size="large" /><Text style={{fontSize: 15, color: 'black'}}>Loading...</Text></View> : results}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loadingStyle: {
        flex: 1,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle: {
        padding: 8,
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#d7d7d7',
        borderRadius: 7,
        gap: 15,
        marginBottom: 10,
    },
    Cityname: {
        fontFamily: "Arial",
        fontSize: 15,
        color: 'black'
    }
})

export default MapLocations;