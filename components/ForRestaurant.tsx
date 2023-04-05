import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl, View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, Modal, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
// import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { BlurView, VibrancyView  } from "@react-native-community/blur";
import { Stack, ActivityIndicator } from "@react-native-material/core";

const width = Dimensions.get('window').width;

const ForRestaurant = ({ route }: any) => {
    const { userRole } = route.params;
    const [refreshing, setRefreshing] = useState(false);

    const [choosePrepared, setChoosePrepared] = useState(false);
    const [chooseAddFood, setChooseAddFood] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertmessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    const [foodName, setFoodName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [currentNumber, setCurrentNumber] = useState("");
    const [image, setImage] = useState("http://10.0.2.2:5000/uploads/imagePicker.png");
    const [chooseImageSelector, setChooseImageSelector] = useState(false);

    const [loading, setLoading] = useState(false);

    const [alldata, setAllData] = useState();

    useEffect(() => {
        const getInfo = async () => {
            let data = await axios.post('http://10.0.2.2:5000/order/getAll');
            console.log(data.data.data);
            setAllData(data.data.data);
        }
        getInfo();
        setAlertmessage("");
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        let data = await axios.post('http://10.0.2.2:5000/order/getAll');
        setAllData(data.data.data);
        setRefreshing(false);
    }

    const clickAddFood = async () => {
        setChooseAddFood(true);
    }

    const clickPrepare = async (value:string) => {
        setCurrentNumber(value);
        setChoosePrepared(true);
    }

    const clickDelete = async () => {
        axios.post('http://10.0.2.2:5000/order/deleteOne', {
            email: currentNumber
        }) .then(function(response) {
            if(response.data.success === true) {
                setShowAlert(true);
                setAlertTitle("Success");
                setAlertmessage("Prepared Successful");
                setChoosePrepared(false);
                console.log(response.data.data);
                setAllData(response.data.data);
                return;
            } else {
                setShowAlert(true);
                setAlertTitle("Warning")
                setAlertmessage("Prepare Failed");
                return;
            }
        })
    }

    const clickAddToRestaurant = async () => {
        setLoading(true);
        if(foodName === "") {
            setShowAlert(true);
            setAlertmessage("Enter foodName...");
            return;
        } if(categoryName === "") {
            setShowAlert(true);
            setAlertmessage("Enter CategoryName...");
            return;
        } if(foodPrice === "") {
            setShowAlert(true);
            setAlertmessage("Enter foodPrice...");
            return;
        } if(restaurantName === "") {
            setShowAlert(true);
            setAlertmessage("Enter restaurantName...");
            return;
        }
        await axios.post('http://10.0.2.2:5000/restaurant/getRestaurantName', {
            resName: restaurantName
        }) .then(function(response) {
            console.log(response.data.success);
            if(response.data.success === true) {
                setShowAlert(true);
                setAlertmessage("There is no Restaurnat in database");
                return;
            } else {
                axios.post('http://10.0.2.2:5000/food/createOne', {
                    Name: foodName,
                    Category: categoryName,
                    Price: foodPrice,
                    RestaurantName: restaurantName,
                    ImageUrl: image,
                }) .then(function(response) {
                    if(response.data.success === true) {
                        setChooseAddFood(false);
                        setFoodName("");
                        setCategoryName("");
                        setFoodPrice("");
                        setRestaurantName("");
                        setImage("http://10.0.2.2:5000/uploads/imagePicker.png")
                    } else {
                        setChoosePrepared(true);
                    }
                    setLoading(false);
                })
            }
        })
        
    }

    const chooseCamera = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path);
        })
        setChooseImageSelector(false);

    }

    const chooseImage = () => {

        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image.path);
        })

        setChooseImageSelector(false);
    }
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 25, marginBottom: 10 }}>Orders</Text>
            <FlatList
                data={alldata}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item }) => (
                    <View style={styles.cardView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Image source={require("./assets/Category1.jpg")} style={{ width: 50, height: 50, borderRadius: 10 }} />
                            <View style={{maxWidth: width * 0.6}}>
                                <Text>{item.foodName}</Text>
                                {/* <Text>{item.fromUser}adsadfasfasdfafdadsf</Text> */}
                                <Text>{item.foodPrice} x {item.foodCount}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => clickPrepare(item.fromUser)}><Image source={require("./assets/tick.png")} style={{ width: 25, height: 25, marginRight: 15 }} /></TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={{ width: width * 0.9, marginTop: 10 }} onPress={() => clickAddFood()}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>Add Food</Text>
                </LinearGradient>
            </TouchableOpacity>
            <BlurView
                blurType="dark"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
            />
            <Modal
                animationType="slide"
                statusBarTranslucent= {true}
                transparent={true}
                visible={chooseAddFood}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{width: "100%", alignItems:'flex-end'}} onPress={() => setChooseAddFood(false)}><Image source={require("./assets/cancel.jpg")} style={{width: 20, height: 20}}/></TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: 20 }}>Add Food</Text>
                            <View style={{ marginBottom: 30, width: 150, height: 150, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'gray', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => setChooseImageSelector(true)}>
                                    <Image source={{ uri: image }} style={{ width: 130, height: 130, borderRadius: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <TextInput value={foodName} onChangeText={value => setFoodName(value)} style={styles.textinput} placeholder='Food Name...' placeholderTextColor='gray'></TextInput>
                            <TextInput value={categoryName} onChangeText={value => setCategoryName(value)} style={styles.textinput} placeholder='Category Name...' placeholderTextColor='gray'></TextInput>
                            <TextInput value={foodPrice} onChangeText={value => setFoodPrice(value)} inputMode='numeric' style={styles.textinput} placeholder='Price...' placeholderTextColor='gray'></TextInput>
                            <TextInput value={restaurantName} onChangeText={value => setRestaurantName(value)} style={styles.textinput} placeholder='Restaurant Name...' placeholderTextColor='gray'></TextInput>
                            <TouchableOpacity onPress={() => clickAddToRestaurant()} style={{ width: '90%', marginTop: 10 }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    {loading === true ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white' }}>Add Restaurant</Text> }
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={choosePrepared}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Are you sure?</Text>
                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity onPress={() => setChoosePrepared(false)}><Image source={require("./assets/close.png")} style={{ width: 30, height: 30 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => clickDelete()}><Image source={require("./assets/check.png")} style={{ width: 30, height: 30 }} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alertMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelButtonStyle={{ width: '60%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
                cancelText="Okay"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={chooseImageSelector}>
                <View style={styles.centeredView}>
                    <View style={styles.ImagemodalView}>
                        {/* <TouchableOpacity style={{width: "100%", ali    gnItems:'flex-end'}} onPress={() => setChooseAddFood(false)}><Image source={require("./assets/cancel.jpg")} style={{width: 40, height: 40}}/></TouchableOpacity> */}
                        <View style={{ width: 110, height: 110, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'gray', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => chooseImage()}><Image source={{ uri: "http://10.0.2.2:5000/uploads/gallery.png" }} style={{ width: 100, height: 100, borderRadius: 20 }} /></TouchableOpacity>
                        </View>
                        <View style={{ width: 110, height: 110, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: 'gray', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => chooseCamera()}><Image source={{ uri: "http://10.0.2.2:5000/uploads/camera.png" }} style={{ width: 100, height: 100, borderRadius: 20 }} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2fC',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.9,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 8,
        marginBottom: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // paddingTop: 5, 
        alignItems: 'center',
        shadowColor: '#000',
        width: '80%',
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ImagemodalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        // paddingTop: 5, 
        alignItems: 'center',
        shadowColor: '#000',
        width: '70%',
        gap: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textinput: {
        paddingHorizontal: 20,
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        color: 'gray',
        borderRadius: 30,
        fontSize: 13,
        paddingVertical: 3
    }
})

export default ForRestaurant;