import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, SectionList, FlatList, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import axios from 'axios';
import { Avatar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "@react-native-material/core";

import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import NumericInput from 'react-native-numeric-input'

const imageUrl = [{
    url: require("./assets/Restaurant1.jpg")
},{
    url: require("./assets/Restaurant2.jpg")
},{
    url: require("./assets/Restaurant3.jpg")
},{
    url: require("./assets/Restaurant4.jpg")
},{
    url: require("./assets/Restaurant5.jpg")
},]

const width = Dimensions.get('window').width;
const AboutRestaurant = ({ route }: any) => {
    const navigation = useNavigation();
    const { restaurantName } = route.params;
    const [restaurantList, setRestaurantList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [countValue, setCountValue] = useState<any>([]);
    const [addStatus, setAddStatus] = useState<any>([]);

    const [historyData, setHistoryData] = useState([]);
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const data = await axios.post('http://10.0.2.2:5000/food/getRestaurantFood', {
                RestaurantName: restaurantName
            })
            if (data.data.success === true) {
                setRestaurantList(data.data.msg);
            }
        }
        getData();
        const fatchData = async () => {
            axios.post('http://10.0.2.2:5000/addCart/getAllCount') .then(function(response) {
                if(response.data.success == true) {
                    setCartCount(response.data.countAll);
                }
            })
        }
        fatchData();
        const historyData = async () => {
            const historyData = await axios.post('http://10.0.2.2:5000/history/getByType', {type: 'Food'});
            setCountValue(historyData.data.data.map((item:any) => {
                return 1;
            }))
            setAddStatus(historyData.data.data.map((item:any) => {
                return false;
            }))
            setHistoryData(historyData.data.data);
        }
        historyData();
        setLoading(false);
    }, [route, loading])

    const onPressAdd = (index: any) => {
        let temp = addStatus;
        temp[index] = true;
        setAddStatus(temp.map((item:any) => {
            return item;
        }))
    }

    const onChangeNumberic = (value: any, index: any) => {
        let temp = countValue;
        temp[index] = value;
        setCountValue(temp.map((item:any) => {
            return item;
        }));
    }
    return (
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10}}>
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
            <ScrollView style={{flex: 1, width: '100%'}} showsVerticalScrollIndicator={false}>
                <Carousel
                    loop
                    width={width * 0.9}
                    height={width / 2.5}
                    style={{ marginBottom: 20 }}
                    autoPlay={true}
                    data={imageUrl}
                    scrollAnimationDuration={3000}
                    renderItem={({ item, index }: { item: any, index: number }) => (
                        <View>
                            <ImageBackground source={item.url} style={{ width: "100%", height: width / 2.5 }} resizeMode='cover' imageStyle={{borderRadius: 10}} >
                            </ImageBackground>
                        </View>
                    )}
                />
                {historyData.length !== 0 ? <><View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5}}>
                    <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>History</Text>
                    <View style={{flexDirection: 'row', gap: 1}}>
                        <Text style={{color: '#F1381D'}}>View all</Text>
                        <Icon2 name="chevron-right" size={20} color="#F1381D" />
                    </View>
                </View><FlatList
                    data={historyData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <Card key={index} style={{ width: width * 0.28, marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor:'white' }} onStartShouldSetResponder={(event) => true}>
                            <View onTouchEnd={() => navigation.navigate("Detail", {foodName: item.Name})}><Image source={{ uri: "http://10.0.2.2:5000/uploads/Foodimage" + index % 5 + ".jpg" }} style={{width: '100%', height: width / 3, alignItems: 'flex-start', borderRadius: 10}} resizeMode='cover' /></View>
                            {addStatus[index] === false ? <View style={{alignItems: 'center', justifyContent: 'center', height: 50}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => onPressAdd(index)} style={{paddingVertical: 5, width: width * 0.25, alignItems: 'center', justifyContent: 'center', backgroundColor:'#d90008', borderRadius: 10}}><Text style={{color: 'white'}}>Add</Text></TouchableOpacity>
                            </View> : <View style={{padding: 0, alignItems: 'center', justifyContent: 'center'}}><NumericInput totalWidth={width * 0.25} totalHeight={60} inputStyle={{borderWidth: 0}} separatorWidth={0} textColor="black" containerStyle={{borderWidth: 0}} iconStyle={{color: 'white', backgroundColor: '#d90008', borderRadius: 5}} minValue={1} maxValue={999} rounded value={countValue[index]} onChange={value => onChangeNumberic(value, index)} /></View>}
                        </Card>
                    )}
                /></> : <></>}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5}}>
                    <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>Deals</Text>
                    <View style={{flexDirection: 'row', gap: 1}}>
                        <Text style={{color: '#F1381D'}}>View all</Text>
                        <Icon2 name="chevron-right" size={20} color="#F1381D" />
                    </View>
                </View>
                <FlatList
                    data={restaurantList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <Card style={{ width: width * 0.28, marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate("Detail", {foodName: item.Name})}>
                            <ImageBackground source={{ uri: "http://10.0.2.2:5000/uploads/Foodimage" + index % 5 + ".jpg" }} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}}>
                                <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                    <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 1, borderRadius: 15, backgroundColor: '#F1381D'}}>
                                        <Text style={{color: 'white', fontSize: 10}}>UP TO 30% OFF</Text>
                                    </TouchableOpacity>
                                    <View style={{padding: 3, borderRadius: 50, backgroundColor: 'white'}}>
                                        <Icon2 name="heart" size={13} color={'black'} />
                                    </View>
                                </View>
                            </ImageBackground>
                            <Card.Content>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                                    <Text style={{ color: 'black', fontFamily:'poppins_medium', fontSize: 13 }}>{item.Name}</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                    <Icon3 name='star' size={13} color={'#F1381D'}/>
                                    <Text style={{fontSize: 13, fontFamily: 'poppins_medium'}}>5.0</Text>
                                </View>
                                <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>40 mins</Text>
                                <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>Rs. 130 Delivery fee</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5}}>
                    <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>Featured</Text>
                    <View style={{flexDirection: 'row', gap: 1}}>
                        <Text style={{color: '#F1381D'}}>View all</Text>
                        <Icon2 name="chevron-right" size={20} color="#F1381D" />
                    </View>
                </View>
                <FlatList
                    data={restaurantList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <Card style={{ width: width * 0.28, marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor: 'white' }} onTouchEnd={() => navigation.navigate("Detail", {foodName: item.Name})}>
                            <ImageBackground source={{ uri: "http://10.0.2.2:5000/uploads/Foodimage" + index % 5 + ".jpg" }} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}}>
                                <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                    <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 1, borderRadius: 15, backgroundColor: '#F1381D'}}>
                                        <Text style={{color: 'white', fontSize: 10}}>UP TO 30% OFF</Text>
                                    </TouchableOpacity>
                                    <View style={{padding: 3, borderRadius: 50, backgroundColor: 'white'}}>
                                        <Icon2 name="heart" size={13} color={'black'} />
                                    </View>
                                </View>
                            </ImageBackground>
                            <Card.Content>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                                    <Text style={{ color: 'black', fontFamily:'poppins_medium', fontSize: 13 }}>{item.Name}</Text>
                                </View>
                                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                    <Icon3 name='star' size={13} color={'#F1381D'}/>
                                    <Text style={{fontSize: 13, fontFamily: 'poppins_medium'}}>5.0</Text>
                                </View>
                                <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>40 mins</Text>
                                <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>Rs. 130 Delivery fee</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
                <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>All Restaurants</Text>
                <Text style={{fontSize: 12, fontFamily: 'poppins_medium'}}>Top restaurants in your area</Text>
                {restaurantList.map((item, index) => <Card key={index} style={{ backgroundColor: 'white', width: width * 0.9, marginBottom: 10, marginLeft: 5, marginRight: 5 }} onTouchEnd={() => navigation.navigate("Detail", {foodName: item.Name})}>
                    <ImageBackground source={{ uri: "http://10.0.2.2:5000/uploads/Foodimage" + index % 5 + ".jpg" }} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}}>
                        <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                            <TouchableOpacity style={{paddingHorizontal: 5, paddingVertical: 1, borderRadius: 15, backgroundColor: '#F1381D'}}>
                                <Text style={{color: 'white', fontSize: 10}}>UP TO 30% OFF</Text>
                            </TouchableOpacity>
                            <View style={{padding: 3, borderRadius: 50, backgroundColor: 'white'}}>
                                <Icon2 name="heart" size={13} color={'black'} />
                            </View>
                        </View>
                    </ImageBackground>
                    <Card.Content>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                            <Text style={{ color: 'black', fontFamily:'poppins_medium', fontSize: 13 }}>{item.Name}</Text>
                            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                <Icon3 name='star' size={13} color={'#F1381D'}/>
                                <Text style={{fontSize: 13, fontFamily: 'poppins_medium'}}>5.0</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', gap: 15}}>
                            <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>40 mins</Text>
                            <Text style={{fontSize: 10, fontFamily: 'poppins_medium'}}>Rs. 130 Delivery fee</Text>
                        </View>
                    </Card.Content>
                </Card>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingStyle: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    },
    flexDirector: {
        flexDirection: 'row',
        gap: 5
    },
    TextStyle: {
        fontFamily: 'poppins_medium',
        color: 'black'
    },
});

export default AboutRestaurant;