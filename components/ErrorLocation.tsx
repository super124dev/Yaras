import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ErrorLocation = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('./assets/Notavailable.png')} style={{ width: 200, height: 200, marginBottom: 50 }} />
        <Text style={{ fontSize: 20 }}>Your Location is not availble.</Text>
      </View>
      <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => navigation.navigate("CityList")}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff6537', '#ff0403']} style={{ padding: 10, width: '80%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Select Another Location Manually</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center'
  }
})

export default ErrorLocation;