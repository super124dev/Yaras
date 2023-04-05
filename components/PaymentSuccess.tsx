import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet,FlatList, RefreshControl, Dimensions} from 'react-native'
import axios from 'axios';

const width = Dimensions.get('window').width;
const PaymentSuccess = () => {
    const [orderProduct, setOrderProduct] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

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
        const data = await axios.post('http://10.0.2.2:5000/addCart/getAllCart')
        setOrderProduct(data.data.msg);
        setTotalCost(data.data.totalmoney)
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <Image source={require("./assets/success.png")} style={{width: 100, height: 100}} />
            <Text style={{fontWeight: 'bold', color: 'black'}}>Your Payment was Successful!</Text>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 30}}>{totalCost} USDT</Text>
            {/* <View style={{width: width * 0.8}}>
                <FlatList
                    data={orderProduct}
                    style={{flex: 1, width: width * 0.6}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    renderItem={({item}) => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>{item.ProductName} X {item.ProductCount} </Text>
                            <Text> = {item.ProductPrice * item.ProductCount}</Text>
                        </View>
                    )}
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PaymentSuccess