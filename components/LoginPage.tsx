import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Text, View, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Stack, ActivityIndicator } from "@react-native-material/core";

const languages: any = {
    'English': {
        email: 'Email...',
        password: 'Password...',
        login_link_tip: 'If you have no account yet, please register.',
        log_in: 'Log In',
        enter_your_email: 'Enter your Email.',
        enter_your_password: 'Enter your Password.',
    },
    'Arabic': {
        email: 'بريد إلكتروني...',
        password: 'كلمة المرور...',
        login_link_tip: 'إذا لم يكن لديك حساب بعد ، يرجى التسجيل.',
        log_in: 'تسجيل الدخول',
        enter_your_email: 'أدخل بريدك الإلكتروني.',
        enter_your_password: 'ادخل رقمك السري.',
    },
    'French': {
        email: 'E-mail...',
        password: 'Mot de passe...',
        login_link_tip: "Si vous n'avez pas encore de compte, veuillez vous inscrire.",
        log_in: 'Connexion',
        enter_your_email: 'Entrer votre Email.',
        enter_your_password: 'Tapez votre mot de passe.',
    }
}

const LoginPage = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [selectLanguage, setSelectLanugage] = useState("English");
    const [alertTitle, setAlertTitle] = useState("Warning");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
    })
    const onLogin = async () => {
        if (userEmail === '') {
            setShowAlert(true);
            setAlertMessage("Enter your Email");
            return;
        }
        if (userPassword === '') {
            setShowAlert(true);
            setAlertMessage("Enter your Password");
            return;
        }
        if (userEmail === "yaras@admin.com" && userPassword === "123456" ) {
            navigation.navigate("AdminPage");
        }
        setLoading(true);
        await axios.post('http://10.0.2.2:5000/user/login', {
            userEmail: userEmail,
            userPassword: userPassword
        })
            .then(function (response) {
                setLoading(false);
                if(response.data.success === false) {
                    setAlertTitle("Warning");
                } else {
                    setAlertTitle("Success");
                    console.log(response.data.userInfo);
                    if(response.data.userInfo.userRole === "Restaurant") {
                        navigation.navigate("ForRestaurant", {userInfo: response.data.userInfo});
                    } else if(response.data.userInfo.userRole === "Customer") {
                        navigation.navigate("CustomerPage");
                    }
                }
                // setShowAlert(true);
                // setAlertMessage(response.data.msg);
            });
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require("./assets/logo.png")} style={{ width: 200, height: 100, marginRight: 15 }} />
                    <Text style={{ color: 'white', fontSize: 30, fontFamily: 'Segoe Print' }}>  {languages[selectLanguage].log_in}</Text>
                </View>
                <TextInput onChangeText={newText => setUserEmail(newText)} style={styles.textinput} placeholder={languages[selectLanguage].email} placeholderTextColor={"white"}></TextInput>
                <TextInput secureTextEntry={true} onChangeText={newText => setUserPassword(newText)} style={styles.textinput} placeholder={languages[selectLanguage].password} placeholderTextColor={"white"}></TextInput>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}><Text style={{ color: 'white', marginTop: 20 }}>{languages[selectLanguage].login_link_tip}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onLogin()} style={{ width: '70%', marginTop: 20, marginBottom: 40 }} disabled={loading}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {loading === true ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white' }}> {languages[selectLanguage].log_in} </Text>}
                    </LinearGradient>
                </TouchableOpacity>
            </ImageBackground>
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
        alignItems: 'center',
    },
    textinput: {
        paddingHorizontal: 20,
        width: '70%',
        borderWidth: 1.5,
        borderColor: 'white',
        color: 'white',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
    }
})

export default LoginPage;