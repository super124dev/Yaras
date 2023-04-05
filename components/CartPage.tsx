import React, {useState, useEffect} from 'react'
import {RefreshControl, View, Text, SafeAreaView, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity} from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import NumericInput from 'react-native-numeric-input'

import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;

const CartPage = () => {
    const [orderProduct, setOrderProduct] = useState([]);
    const navigation = useNavigation();

    const [count, setCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const data = await axios.post('http://10.0.2.2:5000/addCart/getAllCart')
            if(data.data.success === true) {
                setOrderProduct(data.data.msg)
                setTotalCost(data.data.totalmoney)
            }
        }
        getData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        const data = await axios.post('http://10.0.2.2:5000/addCart/getAllCart');
        setOrderProduct(data.data.msg);
        setTotalCost(data.data.totalmoney)
        setRefreshing(false);
    }
    const changeCount = async (value:number, productName:string) => {
        const data = await axios.post('http://10.0.2.2:5000/addCart/changeProductCountByIndex', {productName: productName, value: value});
        console.log(data.data.success);
        if(data.data.success === true) {
            onRefresh();
        }
    }
    const onDeleteAll = async () => {
        const data = await axios.post('http://10.0.2.2:5000/addCart/emptyCart');
        console.log(data.data.success);
        if(data.data.success === true) {
            onRefresh();
        }
    }

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, width: '100%', padding: 10}}>
                <View onTouchEnd={() => navigation.goBack()}>
                    <Icon2 name="arrow-left" size={20} color="black" />
                </View>
                <View style={styles.flexDirector}>
                    <Icon2 name="map-pin" size={20} color="black" />
                    <Text style={styles.TextStyle}>House</Text>
                </View>
                <TouchableOpacity onPress={() => onDeleteAll()}>
                    <Icon2 name="trash-2" size={20} color="black" />
                </TouchableOpacity>
            </View>
                <FlatList
                    data={orderProduct}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({item, index}) => (
                        <View style={styles.cartCard}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                    <Image source={require("./assets/Category13.jpg")} style={{width: 50, height: 50, borderRadius: 20}} />
                                    <View>
                                        <Text style={styles.textColor}>{item.ProductName}</Text>
                                        <Text style={styles.textColor}>$ {item.ProductPrice}</Text>
                                    </View>
                                </View>
                                <NumericInput totalHeight={40} iconSize={30} inputStyle={{borderRadius: 10, backgroundColor:'#ff4f00', borderWidth: 0}} separatorWidth={0} textColor="white" containerStyle={{borderWidth: 0, borderBottomWidth: 2, borderRadius: 20}} iconStyle={{color: '#ff4f00'}} minValue={0} maxValue={999} value={item.ProductCount} onChange={(value) => changeCount(value, item.ProductName)} rounded  />
                            </View>
                        </View>
                    )}
                />
            <View style={{width: width * 0.9, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{justifyContent: 'space-between', paddingVertical: 10}}>
                    <View style={{flexDirection: 'row', gap: 5, alignItems: "center"}}>
                        <Text>Checkout to earn</Text>
                        <Icon2 name="alert-circle" size={20} color='gray' />
                    </View>
                    <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <Image source={require("./assets/coinIcon.png")} style={{width: 20, height: 20}}/>
                        <Text>{totalCost}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width: width * 0.55}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: 'white', fontFamily: 'poppins_medium', fontSize: 15}}>Checkout</Text>
                    </LinearGradient>
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
    headerTitle: {
        fontFamily: 'poppins_extra_bold',
        fontSize: 30,
        color: '#2c3853',
        marginBottom: 10,
    },
    cartCardforButton: {
        width: width * 0.95,
        borderRadius: 40,
        backgroundColor: '#b0ebf3',
        shadowColor: 'black',
        borderBottomColor: '#cbe3e7',
        borderBottomWidth: 2,
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10, 
        padding: 10
    },
    cartCard: {
        width: width * 0.95,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        shadowColor: 'black',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomEndRadius: 10,
        padding: 10
    },
    textColor: {
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

export default CartPage;