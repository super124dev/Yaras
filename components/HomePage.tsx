import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, TextInput, FlatList, Modal, ScrollView } from 'react-native'

import Carousel from 'react-native-reanimated-carousel';
import 'react-native-reanimated';

import ButtonToggleGroup from 'react-native-button-toggle-group';
import { useNavigation } from '@react-navigation/native';

import Icon2 from 'react-native-vector-icons/Feather';

import axios from 'axios';

import AutocompleteInput from 'react-native-autocomplete-input';
import SelectDropdown from 'react-native-select-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BuildingImages = [{
        restaurantImageUrl: require('./assets/RestaurantBuilding1.jpg'),
        groceryImageUrl: require('./assets/GroceryStore1.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore1.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding2.jpg'),
        groceryImageUrl: require('./assets/GroceryStore2.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore2.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding3.jpg'),
        groceryImageUrl: require('./assets/GroceryStore3.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore3.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding4.jpg'),
        groceryImageUrl: require('./assets/GroceryStore4.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore4.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding5.jpg'),
        groceryImageUrl: require('./assets/GroceryStore5.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore5.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding6.jpg'),
        groceryImageUrl: require('./assets/GroceryStore6.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore6.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding7.jpg'),
        groceryImageUrl: require('./assets/GroceryStore7.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore7.jpg'),
    },{
        restaurantImageUrl: require('./assets/RestaurantBuilding8.jpg'),
        groceryImageUrl: require('./assets/GroceryStore8.jpg'),
        pharmaImageUrl: require('./assets/PharmaStore8.jpg'),
    }]

enum LanguageType {
    English = 0, Arabic, French, Portuguese
};

interface ILanguage {
    languageType: string;
    house: string;
    product_in_promotion: string;
    description: string;
    add_to_basket: string;
    food: string;
    grocery: string;
    pharma: string;
    categories: string;
    search_food: string;
    popular: string;
    nearest: string;
    healthy: string;
    best: string;
    imageUrl: any;
}

const languages: ILanguage[] = [{
    languageType: "English",
    house: "House",
    product_in_promotion: "Product in Promotion",
    description: "Description",
    add_to_basket: "Add to basket",
    food: "Food",
    grocery: "Grocery",
    pharma: "Pharma",
    categories: "Categories",
    search_food: "Search food...",
    popular: "Popular",
    nearest: "Nearest",
    healthy: "Healthy",
    best: "Best",
    imageUrl: require("./assets/English.png")
},
{
    languageType: "Arabic",
    house: "منزل",
    product_in_promotion: "المنتج في الترويج",
    description: "وصف",
    add_to_basket: "اضف الى السلة",
    food: "طعام",
    grocery: "خضروات",
    pharma: "فارما",
    categories: "فئات",
    search_food: "ابحث عن الطعام...",
    popular: "شائع",
    nearest: "الأقرب",
    healthy: "صحيح",
    best: "أفضل",
    imageUrl: require("./assets/Arabic.png")
},
{
    languageType: "French",
    house: "Loger",
    product_in_promotion: "Produit en Promotion",
    description: "Description",
    add_to_basket: "Ajouter au panier",
    food: "Nourriture",
    grocery: "Épicerie",
    pharma: "Pharmacie",
    categories: "Catégories",
    search_food: "Rechercher de la nourriture...",
    popular: "Populaire",
    nearest: "La plus proche",
    healthy: "En bonne santé",
    best: "Meilleur",
    imageUrl: require("./assets/French.png")
},
{
    languageType: "Portuguese",
    house: "Casa",
    product_in_promotion: "Produto em promoção",
    description: "Descrição",
    add_to_basket: "Adicionar a cesta",
    food: "Comida",
    grocery: "Mercado",
    pharma: "Farmacêutico",
    categories: "Categorias",
    search_food: "Pesquisar comida...",
    popular: "Popular",
    nearest: "Mais próximo",
    healthy: "Saudável",
    best: "Melhor",
    imageUrl: require("./assets/Portuguese.png")
}
]

const countries = [
    'Office',
    'Home',
    'Parents',
];

const HomePage = () => {
    const navigation = useNavigation();
    const [languageData, setLanguageData] = useState<ILanguage>(languages[LanguageType.English]);
    const [openLanguageModal, setOpenLanguageModal] = useState(false);

    const [restaurantPopularList, setRestaurantPopularList] = useState([]);
    const [restaurantNearByList, setRestaurantNearByList] = useState([]);
    const [restaurantHealthyList, setRestaurantHealthyList] = useState([]);

    const [groceryPopularList, setGroceryPopularList] = useState([]);
    const [groceryNearByList, setGroceryNearByList] = useState([]);
    const [groceryHealthyList, setGroceryHealthyList] = useState([]);

    const [pharmaPopularList, setPharmaPopularList] = useState([]);
    const [pharmaNearByList, setPharmaNearByList] = useState([]);
    const [pharmaHealthyList, setPharmaHealthyList] = useState([]);

    const [searchText, setSearchText] = useState([]);
    const [selectType, setSelectType] = useState(0);

    const [addressText, setAddressText] = useState("Home");

    const onClickLanguageType = (value: LanguageType) => {
        setLanguageData(languages[value]);
        setOpenLanguageModal(false);
    }

    const onSelectOne = (item:any) => {
        if(selectType === 0) {
            navigation.navigate("RestaurantSetting", {restaurantName: item.Name})
        } else if(selectType === 1) {
            navigation.navigate("GroceryCategory")
        } else {
            navigation.navigate("PharmaCategory")
        }
    }

    useEffect(() => {
        const getAll = async () => {
            const data = await axios.post('http://10.0.2.2:5000/restaurant/getTypeRestaurant', {type: "Popular"})
            if (data.data.success === true) {
                setRestaurantPopularList(data.data.msg);
            }
            const data1 = await axios.post('http://10.0.2.2:5000/restaurant/getTypeRestaurant', {type: "NearBy"})
            if (data.data.success === true) {
                setRestaurantNearByList(data1.data.msg);
            }
            const data2 = await axios.post('http://10.0.2.2:5000/restaurant/getTypeRestaurant', {type: "Healthy"})
            if (data.data.success === true) {
                setRestaurantHealthyList(data2.data.msg);
            }
            const data3 = await axios.post('http://10.0.2.2:5000/grocery/getTypeGrocery', {type: "Popular"})
            if (data3.data.success === true) {
                setGroceryPopularList(data3.data.msg);
            }
            const data4 = await axios.post('http://10.0.2.2:5000/grocery/getTypeGrocery', {type: "NearBy"})
            if (data4.data.success === true) {
                setGroceryNearByList(data4.data.msg);
            }
            const data5 = await axios.post('http://10.0.2.2:5000/grocery/getTypeGrocery', {type: "Healthy"})
            if (data5.data.success === true) {
                setGroceryHealthyList(data5.data.msg);
            }
            const data6 = await axios.post('http://10.0.2.2:5000/pharma/getTypePharma', {type: "Popular"})
            if (data6.data.success === true) {
                setPharmaPopularList(data6.data.msg);
            }
            const data7 = await axios.post('http://10.0.2.2:5000/pharma/getTypePharma', {type: "NearBy"})
            if (data7.data.success === true) {
                setPharmaNearByList(data7.data.msg);
            }
            const data8 = await axios.post('http://10.0.2.2:5000/pharma/getTypePharma', {type: "Healthy"})
            if (data8.data.success === true) {
                setPharmaHealthyList(data8.data.msg);
            }
        }
        getAll();
    }, [])

    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, width: '100%', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Tracking")}>
                    <Icon2 name="grid" size={20} color="black" />
                </TouchableOpacity>
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
                <TouchableOpacity onPress={() => setOpenLanguageModal(true)}>
                    <Image source={languageData.imageUrl} style={{width: 30, height: 20, borderRadius: 5}} />
                </TouchableOpacity>
            </View>
            <Carousel
                width={width * 0.9}
                height={width / 2.5}
                style={{ marginBottom: 10 }}
                autoPlay={true}
                data={["", "", "", ""]}
                scrollAnimationDuration={2000}
                renderItem={({ item, index }: { item: any, index: number }) => (
                    <View style={{width: '100%', backgroundColor: 'gray', borderRadius: 10}}>
                        <ImageBackground source={require("./assets/homepage.png")} style={{ width: width * 0.9, height: width / 2.5 }} imageStyle={{borderRadius: 10}} >
                            <View style={{flex: 1, paddingHorizontal: 22, paddingVertical: 14, justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <View>
                                    <Text style={{fontSize: 16, color: 'white'}}>{languageData.product_in_promotion}</Text>
                                    <Text style={{color: 'white', marginTop: 5}}>{languageData.description}</Text>
                                </View>
                                <TouchableOpacity style={{paddingHorizontal: 4, paddingVertical: 8, backgroundColor: 'white', borderRadius: 10}}>
                                    <Text style={{color: '#F1381D', fontSize: 10}}>{languageData.add_to_basket}</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )}
            />
            <View style={{flexDirection: 'row', gap: 50, marginBottom: 5}}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => setSelectType(0)}>
                    <Image source={selectType !== 0 ? require("./assets/foodIconNo.png") : require("./assets/foodIcon.png")} style={{width: 25, height: 25}}/>
                    <Text style={{fontSize: 13, color: '#004B84'}}>{languageData.food}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => setSelectType(1)}>
                    <Image source={selectType !== 1 ? require("./assets/groceryIcon.png") : require("./assets/groceryIconYes.png")} style={{width: 25, height: 25}}/>
                    <Text style={{fontSize: 13, color: '#004B84'}}>{languageData.grocery}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => setSelectType(2)}>
                    <Image source={selectType !== 2 ? require("./assets/pharmaIcon.png") : require("./assets/pharmaIconYes.png")} style={{width: 25, height: 25}}/>
                    <Text style={{fontSize: 13, color: '#004B84'}}>{languageData.pharma}</Text>
                </TouchableOpacity>
            </View>
            <Text style={{textAlign: 'left', width: '100%', fontSize: 17, color: '#272D2F', fontFamily: 'poppins_medium'}}>{languageData.categories}</Text>
            <View style={{width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                <View style={{flexDirection: 'row',alignItems: 'center', paddingVertical: 10, paddingHorizontal: 6, backgroundColor: 'white', borderRadius: 10, width: width * 0.8, gap: 5}}>
                    <Icon2 name="search" size={15} color="#2E2E2E" />
                    <TextInput style={{width: '90%', padding: 0, fontSize: 12, height: 15}} placeholder={languageData.search_food} placeholderTextColor={"#8C8D8E"}></TextInput>
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
                <TouchableOpacity style={{padding: 10, backgroundColor: '#F1381D', borderRadius: 10}}><Image source={require("./assets/filterIcon.png")} style={{width: 20, height: 20}} /></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{textAlign: 'left', marginTop: 5, width: '100%', fontSize: 15, color: '#272D2F', fontFamily: 'poppins_medium'}}>{languageData.popular}</Text>
            
            <View style={{marginBottom: 5}}>
                <FlatList
                    data={selectType === 0 ? restaurantPopularList : selectType === 1 ? groceryPopularList : pharmaPopularList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => '#' + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <View style={{ width: width * 0.4, marginBottom: 10, marginLeft: 5, marginRight: 5, backgroundColor: 'white', borderRadius: 10 }} onTouchEnd={() => onSelectOne(item)}>
                            <ImageBackground source={selectType === 0 ? BuildingImages[index % 8].restaurantImageUrl : selectType === 1 ? BuildingImages[index % 8].groceryImageUrl : BuildingImages[index % 8].pharmaImageUrl} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}} resizeMode='cover'>
                                <View style={{flex: 1, padding: 10, width: '100%', justifyContent: 'space-between'}}>
                                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                                        <Image source={require("./assets/heartIcon.png")} style={{width: 20, height: 20}} />
                                    </View>
                                    <Text style={{ color: 'white', fontFamily:'poppins_medium', fontSize: 13, textShadowColor: 'black', textShadowOffset: {width: 0.5, height: 0.5}, textShadowRadius: 5 }}>{item.Name}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )}
                />
            </View>
            <Text style={{textAlign: 'left', marginTop: 5, width: '100%', fontSize: 15, color: '#272D2F', fontFamily: 'poppins_medium'}}>{languageData.nearest}</Text>
            
            <View style={{height: width / 3, marginBottom: 5}}>
                <FlatList
                    data={selectType === 0 ? restaurantNearByList : selectType === 1 ? groceryNearByList : pharmaNearByList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => '@' + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <View style={{ width: width * 0.4, marginBottom: 10, marginLeft: 5, marginRight: 5 }} onTouchEnd={() => onSelectOne(item)}>
                            <ImageBackground source={selectType === 0 ? BuildingImages[(index + 2) % 8].restaurantImageUrl : selectType === 1 ? BuildingImages[(index + 2) % 8].groceryImageUrl : BuildingImages[(index + 2) % 8].pharmaImageUrl} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}} resizeMode='cover'>
                                <View style={{flex: 1, padding: 10, width: '100%', justifyContent: 'space-between'}}>
                                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                                        <Image source={require("./assets/heartIcon.png")} style={{width: 20, height: 20}} />
                                    </View>
                                    <Text style={{ color: 'white', fontFamily:'poppins_medium', fontSize: 13, textShadowColor: 'black', textShadowOffset: {width: 0.5, height: 0.5}, textShadowRadius: 5 }}>{item.Name}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )}
                />
            </View>
            {selectType < 2 ? <Text style={{textAlign: 'left', marginTop: 5, width: '100%', fontSize: 15, color: '#272D2F', fontFamily: 'poppins_medium'}}>{languageData.healthy}</Text> : <></>}
            
            {selectType < 2 ? <View style={{height: width / 3, marginBottom: 5}}>
                <FlatList
                    data={selectType === 0 ? restaurantHealthyList : groceryHealthyList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => '%' + index}
                    renderItem={({ item, index }: {item: any, index: number}) => (
                        <View style={{ width: width * 0.4, marginBottom: 10, marginLeft: 5, marginRight: 5 }} onTouchEnd={() => onSelectOne(item)}>
                            <ImageBackground source={selectType === 0 ? BuildingImages[(index + 4) % 8].restaurantImageUrl : selectType === 1 ? BuildingImages[(index + 4) % 8].groceryImageUrl : BuildingImages[(index + 4) % 8].pharmaImageUrl} style={{width: '100%', height: width / 3, alignItems: 'flex-start'}} imageStyle={{borderRadius: 10}} resizeMode='cover'>
                                <View style={{flex: 1, padding: 10, width: '100%', justifyContent: 'space-between'}}>
                                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                                        <Image source={require("./assets/heartIcon.png")} style={{width: 20, height: 20}} />
                                    </View>
                                    <Text style={{ color: 'white', fontFamily:'poppins_medium', fontSize: 13, textShadowColor: 'black', textShadowOffset: {width: 0.5, height: 0.5}, textShadowRadius: 5 }}>{item.Name}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )}
                />
            </View> : <></>}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openLanguageModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onClickLanguageType(LanguageType.English)}>
                            <Image source={require("./assets/English.png")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onClickLanguageType(LanguageType.Arabic)}>
                            <Image source={require("./assets/Arabic.png")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text>Arabic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onClickLanguageType(LanguageType.French)}>
                            <Image source={require("./assets/French.png")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text>French</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onClickLanguageType(LanguageType.Portuguese)}>
                            <Image source={require("./assets/Portuguese.png")} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <Text>Portuguese</Text>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10
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
    buttonGroup1: {
        width: '100%',
        padding: 4,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        width: width,
        alignItems: 'center',
        position: 'absolute',
        top: 50
    },
    modalView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        paddingVertical: 30,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        gap: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalViewAddress: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        width: width * 0.7,
        padding: 20,
        paddingVertical: 30,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        gap: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    autoCompleteStyle: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 10,
        height: 50,
        borderWidth: 1,
        zIndex: 1
    },
})

export default HomePage;