import React, {useState, useEffect} from 'react'
import {Dimensions, View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native'
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Icon2 from 'react-native-vector-icons/Feather';

import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Avatar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'

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
const countries = [
    'Office',
    'Home',
    'Parents'
];

const width = Dimensions.get('window').width;
const PharmaCategory = () => {
    const navigation = useNavigation();

    const [countValue, setCountValue] = useState<any>([]);
    const [addStatus, setAddStatus] = useState<any>([]);
    const [historyData, setHistoryData] = useState([]);
    useEffect(() => {
        const getHistoryData = async () => {
            const historyData = await axios.post('http://10.0.2.2:5000/history/getByType', {type: 'Pharma'});
            setAddStatus(historyData.data.data.map((item:any) => {
                return false
            }))
            setCountValue(historyData.data.data.map((item:any) => {
                return 1
            }))
            setHistoryData(historyData.data.data)
        }
        getHistoryData();
    }, [])

    const onPressAdd = (index: number) => {
        let temp = addStatus;
        temp[index] = true;
        setAddStatus(temp.map((item:any) => {
            return item;
        }))
    }
    const onChangeNumberic = (value: number, index: number) => {
        let temp = countValue;
        temp[index] = value;
        setCountValue(temp.map((item:number) => {
            return item;
        }));
    }
    return(
        <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, width: '100%', alignItems: 'center'}}>
                    <View onTouchEnd={() => navigation.goBack()}>
                        <Icon2 name="arrow-left" size={20} color="black" />
                    </View>
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                        }}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            return (
                            <View style={styles.flexDirector}>
                                <Icon2 name="map-pin" size={20} color="black" />
                                <Text style={styles.TextStyle}>{selectedItem ? selectedItem : 'Address'}</Text>
                                <FontAwesome name="chevron-down" color={'#444'} size={15} />
                            </View>
                            );
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        renderCustomizedRowChild={(item, index) => {
                            return (
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'row', gap: 10, width: '50%'}}>
                                        <Icon2 name="map-pin" size={20} color="black" />
                                        <Text style={styles.TextStyle}>{item}</Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("CartPage")} style={{display: 'none'}}>
                        <Icon2 name="shopping-bag" size={20} color="#F1381D" />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row',alignItems: 'center', paddingVertical: 10, paddingHorizontal: 6, backgroundColor: 'white', borderRadius: 10, width: width * 0.95, gap: 5, marginBottom: 10}}>
                    <Icon2 name="search" size={15} color="#2E2E2E" />
                    <TextInput style={{width: '90%', padding: 0, fontSize: 12, height: 15}} placeholder={"Search..."} placeholderTextColor={"#8C8D8E"}></TextInput>
                    {/* <AutocompleteInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        data={searchText}
                        value={searhRestaurant}
                        onChangeText={(value:string) => onChangeSearch(value)}
                        // style={styles.autoCompleteStyle}
                        flatListProps={{
                            renderItem: ({ item }) => <Text onPress={() => onChangeSearch(item)}>{item}</Text>,
                        }}
                    /> */}
                </View>
                <View style={{width: width * 0.95, flex: 1}}>
                    {historyData.length !== 0 ? <View style={{justifyContent: 'center'}}><View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5, marginLeft: 10}}>
                        <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>Your Favorite Picks</Text>
                        <View style={{flexDirection: 'row', gap: 1, display: 'none'}}>
                            <Text style={{color: '#F1381D'}}>View all</Text>
                            <Icon2 name="chevron-right" size={20} color="#F1381D" />
                        </View>
                    </View><FlatList
                        data={historyData}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index }: {item: any, index: number}) => (
                            <Card key={index} style={{ width: width * 0.3, marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor:'white' }} onStartShouldSetResponder={(event) => true}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}} onTouchEnd={() => navigation.navigate("GrocerySelect", {groceryName: item.title})}><Image source={categoryData[(index + 3) % 10].imageUrl} style={{width: width * 0.25, height: width * 0.25, alignItems: 'flex-start', borderRadius: 10}} /></View>
                                {addStatus[index] === false ? <View style={{alignItems: 'center', justifyContent: 'center', height: 50}}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => onPressAdd(index)} style={{ paddingVertical: 5,width: width * 0.22, alignItems: 'center', justifyContent: 'center', backgroundColor:'#d90008', borderRadius: 10}}><Text style={{color: 'white'}}>Add</Text></TouchableOpacity>
                                </View> : <View style={{padding: 0, alignItems: 'center', justifyContent: 'center'}}><NumericInput totalWidth={width * 0.22} totalHeight={60} inputStyle={{borderWidth: 0}} separatorWidth={0} textColor="black" containerStyle={{borderWidth: 0}} iconStyle={{color: 'white', backgroundColor: '#d90008', borderRadius: 5}} minValue={1} maxValue={999} rounded value={countValue[index]} onChange={value => onChangeNumberic(value, index)} /></View>}
                            </Card>
                        )}
                    /></View> : <></>}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5, marginLeft: 10}}>
                        <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>Our Products</Text>
                        <View style={{flexDirection: 'row', gap: 1, display: 'none'}}>
                            <Text style={{color: '#F1381D'}}>View all</Text>
                            <Icon2 name="chevron-right" size={20} color="#F1381D" />
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            data={categoryData}
                            renderItem={({item, index}) => (
                                <Card key={index} style={{alignItems: 'center', marginBottom: 10, flex: 1, marginRight: width * 0.0083, marginLeft: width * 0.0083, width: width * 0.3}}>
                                    <TouchableOpacity style={styles.viewStyle} onPress={() => navigation.navigate("AboutPharma")}>
                                        <Image source={item.imageUrl} resizeMode='cover' style={{width: width * 0.25, height: width * 0.25, borderRadius: 10, marginTop: 10}} />
                                        <Text style={styles.groceryName}>{item.title}</Text>
                                    </TouchableOpacity>
                                </Card>
                            )}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
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
    viewStyle: {
        width: width * 0.3,
        alignItems: 'center',
        gap: 15,
    },
    groceryName: {
        width: width * 0.27,
        fontFamily: "Poppins_medium",
        textAlign: 'center',
        fontSize: 13,
        color: 'black',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
})

export default PharmaCategory;