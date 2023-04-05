import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';

const RestaurantList = ({ route }: any) => {
  const navigation = useNavigation();
  const { cityname } = route.params;
  let [loading, setLoading] = useState(false);
  let [results, setResults] = useState([]);
  let [locations, setLocations] = useState([{ geometry: { location: { lat: 0, lng: 0 } }, name: '' }]);
  let [citylat, setCityLat] = useState(0);
  let [citylng, setCityLng] = useState(0);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=restuarants+" + cityname + "&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc")
      const citylocation = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=angole+" + cityname + "&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc");
      setCityLat(citylocation.data.results[0].geometry.location.lat);
      setCityLng(citylocation.data.results[0].geometry.location.lng);

      let data = res.data.results;
      let nextPageToken = res.data.next_page_token;
      while(!!nextPageToken) {
          const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc&pagetoken="+nextPageToken;
          const res1 = await axios.get(url)
          let data1 = res1.data.results;
          if (data1.length === 0) continue;
          else {
              data = [...data, ...data1];
              nextPageToken = res1.data.next_page_token;
          }
      }
      setLocations(data);
      setResults(data.map((item: any, idx: number) => {
        return (
          <View style={styles.viewStyle} key={idx} onTouchEnd={() => navigation.navigate("CustomerPage")}>
            {item.photos != undefined ?
              <Image source={{ uri: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + item.photos[0].photo_reference + "&key=AIzaSyBCZVSjuVPDGigu-jFRtmV6p8fVXtlOxyc" }} style={{ width: 50, height: 50, borderRadius: 10 }} />
              : <Image source={require("./assets/restaurantMark.png")} style={{ width: 50, height: 50, borderRadius: 10 }} />}
            <Text style={styles.Restaurantname}>{item.name}</Text>
          </View>
        )
      }
      ));
      setLoading(false)
    })();
  }, [])
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 20, backgroundColor: 'white', width: '100%', flex: 1 }}>
      <MapView style={{ height: 200, marginBottom: 10 }} region={{ latitude: citylat, longitude: citylng, latitudeDelta: 0.01, longitudeDelta: 0.01 }} >
        {locations.map((rest: any, idx: number) => <Marker
          key={idx}
          coordinate={{ latitude: rest.geometry.location.lat, longitude: rest.geometry.location.lng }}
          pinColor={"purple"}
          title={rest.name}>
          <Image source={require("./assets/mapMark.png")} style={{ height: 35, width: 35 }} />
        </Marker>)}
      </MapView>
      <ScrollView decelerationRate={"normal"}>
        {loading === true ? <View style={styles.loadingStyle}><ActivityIndicator size="large" /><Text style={{ fontSize: 15, color: 'black' }}>Loading...</Text></View> : results}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    height: '100%',
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
  Restaurantname: {
    fontFamily: "Arial",
    fontSize: 15,
    color: 'black'
  }
})

export default RestaurantList;