import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [restaurantName, setRestaurantName] = useState("");
    const [cityName, setCityName] = useState("");

    const clickAddRestaurant = async () => {
        setLoading(true);
        await axios.post("http://10.0.2.2:5000/restaurant/createOne", {
            Name: "ABCDE",
            City: "ABCDE"
        }) .then (function(response) {
            if(response.data.success === true) {
                setAlertTitle("Success");
                setAlertMessage("Add Restaurant Success");
            } else {
                setAlertTitle("Failed");
                setAlertMessage("Something went wrong");
            }
        })
        setLoading(false);
    }
    return(
        <View style={styles.container}>
            <TextInput value={restaurantName} onChangeText={newText => setRestaurantName(newText)} style={styles.textinput} placeholder="Restaurant Name..."></TextInput>
            <TextInput value={cityName} onChangeText={newText => setCityName(newText)} style={styles.textinput} placeholder="City Name..."></TextInput>
            <TouchableOpacity style={{width: "80%", marginTop: 30}} onPress={() => clickAddRestaurant()}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                    {loading === true ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white' }}>Add Restaurant</Text> }
                </LinearGradient>
            </TouchableOpacity>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        paddingHorizontal: 20,
        padding: 8,
        width: '80%',
        borderWidth: 1.5,
        borderColor: 'gray',
        color: 'gray',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    }
})

export default AdminPage