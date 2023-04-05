import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, Alert, BackHandler, ImageBackground} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Stack, ActivityIndicator } from "@react-native-material/core";

import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Detail = ({route}:any) => {
    const navigation = useNavigation();
    const {foodName} = route.params;
    const [count, setCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [chooseRateModal, setChooseRateModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fatchData = async () => {
            axios.post('http://10.0.2.2:5000/addCart/getAllCount') .then(function(response) {
                if(response.data.success == true) {
                    setCartCount(response.data.countAll);
                }
            })
        }
        fatchData();
    }, [])

    const addtoCart = async () => {
        setLoading(true);
        const data = await axios.post('http://10.0.2.2:5000/addCart/addCartCount', {
            ProductName: foodName,
            ProductCount: count,
            ProductPrice: 400,
        });
        setCartCount(cartCount + count);
        const history = await axios.post('http://10.0.2.2:5000/history/createOne', {
            historyName: foodName,
            historyType: 'Food'
        });
        setLoading(false);
    }

    return(
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={height * 0.7}
                style={{ marginBottom: 10 }}
                data={[...new Array(1).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({ index }: { index: number }) => (
                    <View>
                        <ImageBackground source={require("./assets/foodExample.png")} style={{ width: width, height: height * 0.7}} imageStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} resizeMode='cover'>
                            <View style={{padding: 10, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity style={{padding: 10, borderRadius: 7, backgroundColor: 'white'}} onPress={() => navigation.goBack()}>
                                    <Icon3 name='left' size={20} color={'#0DA31A'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{padding: 7, borderRadius: 7, backgroundColor: '#EBEBEB', opacity: 0.8}} onPress={() => setChooseRateModal(true)}>
                                    <Icon3 name='hearto' size={25} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )}
            />
            <View style={{flex: 1, width: width * 0.9, justifyContent: 'space-between', paddingBottom: 10}}>
                <View>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: '#272D2F', fontSize: 25, fontFamily: 'poppins_medium'}}>{foodName}</Text>
                        <Text style={{color: '#F1381D', fontSize: 25, fontFamily: 'poppins_medium'}}>IDR 25K</Text>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <Icon3 name='star' size={25} color={'#F2CF63'} />
                            <Text style={{color: 'black', fontSize: 20}}>4.8</Text>
                            <Text style={{color: 'gray', fontSize: 15}}>(8.2K Reviews)</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            <Icon2 name='map-pin' size={20} color={'black'} />
                            <Text style={{fontFamily: 'poppins_medium', fontSize: 15}}>5 KM / 15 min</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text>Marinated grilled beef ribs, served with steamed rice, raw vegetable salad (lalapan) and condiment. Sambal terasi is often put on side, and other put the ribs over the sambal (iga penyet). Read More</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => addtoCart()} style={{width: width * 0.9, borderRadius: 10, backgroundColor: '#F1381D', alignItems: 'center', paddingVertical: 10}}>
                    {loading === false ? <Text style={{color: 'white', fontFamily: 'poppins_medium'}}>Add To Cart</Text> : <ActivityIndicator color='white' />}
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={chooseRateModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{color: '#272D2F', fontSize: 20, fontFamily: 'poppins_medium'}}>Please Rate Here.</Text>
                        <Rating
                            type='heart'
                            ratingCount={5}
                            imageSize={40}
                            startingValue={0}
                            jumpValue={1}
                        />
                        <TouchableOpacity onPress={() => setChooseRateModal(false)} style={{width: '90%', marginTop: 10}}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'poppins_medium' }}>Rate here</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        gap: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default Detail;