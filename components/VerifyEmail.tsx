import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import { Stack, ActivityIndicator } from "@react-native-material/core";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: { flex: 1 },
  title: { textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 'bold' },
  codeFieldRoot: { marginTop: 20, gap: 10 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'white',
    color: 'white',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: 'white',
  },
});

const languages = {
  "English": {
    verifyEmail: "Verification"
  },
  "Arabic": {
    VerifyEmail: "تَحَقّق"
  },
  "French": {
    VerifyEmail: "Vérification"
  }
}

const CELL_COUNT = 6;

const VerifyEmail = ({ route }: any) => {
  const { emailaddress, verifyCode } = route.params;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [selectLanguage, setSelectLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios.post('http://10.0.2.2:5000/getLanguage', {
      userEmail: emailaddress
    }) .then(function(response) {
      if(response.data.success === true) {
        setSelectLanguage(response.data.msg)
      }
    });
  })

  const onChangeValue = async (valueItem: any) => {
    setValue(valueItem);
    if (valueItem === verifyCode) {
      setLoading(true);
      await axios.post('http://10.0.2.2:5000/verifyEmail', {
        userEmail: emailaddress,
      })
        .then(function (response) {
          if(response.data.success === true) {
            setLoading(false);
            setShowAlert(true);
          }
        });
    }
    if (valueItem.length === 6 && valueItem != verifyCode) {
      setShowAlert(true);
    }
  }

  return (
    <SafeAreaView style={styles.root}>

      <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={{flex: 1, width: '100%'}}>
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>{languages[selectLanguage].VerifyEmail}</Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={(valueItem: any) => onChangeValue(valueItem)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {loading === true ? <ActivityIndicator size="large" color='white' /> : <></>}
        </View>
      </ImageBackground>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Success"
        message="Verify Success"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelButtonStyle={{ width: '60%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
        cancelText="Okay"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
      />
    </SafeAreaView>
  );
};

export default VerifyEmail;