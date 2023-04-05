import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input'
import axios from 'axios';

import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from '@react-native-material/core';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const GrocerySelect = ({route}:any) => {
    const navigation = useNavigation();
    const {groceryName} = route.params;

    const [countValue, setCountValue] = useState(1);
    const [loading, setLoading] = useState(false);

    const addtoCart = async () => {
        setLoading(true);
        const data = await axios.post('http://10.0.2.2:5000/addCart/addCartCount', {
            ProductName: groceryName,
            ProductCount: countValue,
            ProductPrice: 400,
        });
        const history = await axios.post('http://10.0.2.2:5000/history/createOne', {
            historyName: groceryName,
            historyType: 'Grocery'
        });
        setLoading(false);
    }
    return (
        <View style={styles.container}>
            <View style={{width: width, alignItems :'center', backgroundColor: '#fbe4e5', height: height / 2, borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
                <View style={{padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                    <TouchableOpacity style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}} onPress={() => navigation.goBack()}>
                        <Icon2 name="chevron-left" size={20} color={'#e8676d'} />
                    </TouchableOpacity>
                    <Text style={{color: '#5a5656', fontFamily: 'poppins_medium', fontSize: 20}}>Product Details</Text>
                    <TouchableOpacity style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10, opacity: 0}}>
                        <Icon2 name="edit-2" size={20} color={'#e8676d'} />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image source={require("./assets/fruit1.png")} style={{width: width / 2, height: width / 2 }} resizeMode='cover'/>
                </View>
            </View>
            <NumericInput totalHeight={70} inputStyle={{borderWidth: 0}} separatorWidth={0} textColor="black" containerStyle={{borderWidth: 0}} iconStyle={{color: 'white', backgroundColor: '#d90008', borderRadius: 10}} minValue={1} maxValue={999} rounded value={countValue} onChange={value => setCountValue(value)} />
            <View style={{width: width * 0.9, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: 'poppins_medium', fontSize: 20, color: '#202020'}}>{groceryName}</Text>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Text style={{fontFamily: 'poppins_medium', fontSize: 20, color: "#e23e45"}}>$15.20</Text>
                    <Text style={{fontSize: 15}}>/ Kg</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', width: width * 0.9, justifyContent: 'space-between', marginBottom: 20}}>
                <Text style={{fontSize: 15}}>Available in stock</Text>
                <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                    <Icon1 name="star" size={20} color={"#ffc108"} />
                    <Text style={{fontSize: 15}}>4.9</Text>
                </View>
            </View>
            <Text style={{fontFamily: 'poppins_medium', fontSize: 20, color: '#202020', alignItems: 'flex-start', width: width * 0.9}}>Details</Text>
            <Text style={{width: width * 0.9, fontSize: 15}}>The garden strawberry is a widely grown hybrid species of the genus Fragaria and collectively known as the strawberries, which...</Text>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
                <TouchableOpacity onPress={() => addtoCart()} style={{width: width * 0.9, backgroundColor: '#de1f27', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10}}>
                    {loading === true ? <ActivityIndicator color='white' size={35} /> : <Text style={{color: 'white', fontFamily: 'poppins_medium', fontSize: 18}}>Add To Cart</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
})

export default GrocerySelect;