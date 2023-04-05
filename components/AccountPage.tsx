import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList} from 'react-native';
import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('window').width;
const AccountPage = () => {
  const navigation = useNavigation();

  return(
        <View style={styles.container}>
            <View style={{padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <TouchableOpacity style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}} onPress={() => navigation.goBack()}>
                    <Icon2 name="chevron-left" size={20} color={'#e8676d'} />
                </TouchableOpacity>
                <Text style={{color: '#5a5656', fontFamily: 'poppins_medium', fontSize: 20}}>Profile</Text>
                <TouchableOpacity style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}}>
                    <Icon2 name="edit-2" size={20} color={'#e8676d'} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 20, marginBottom: 30, marginTop: 30}}>
                <Image source={require("./assets/avatar.png")} style={{width: width / 3, height: width / 3 }} resizeMode='cover'/>
            </View>
            <Text style={{color: '#5a5656', fontSize: 20, fontFamily: 'poppins_medium', marginTop: 10}}>Eric124Jin@gmail.com</Text>
            <Text style={{marginBottom: 20}}>@Customer</Text>
            <View style={{marginBottom: 20, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, backgroundColor: '#f7d4d6', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10, marginTop: 10}}>
                <View style={{alignItems: 'center'}}>
                    <Icon1 name="checklist" size={16} color="#5a5656" />
                    <Text style={{fontSize: 12, fontFamily: "poppins_medium"}}>My Order</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Icon1 name="credit-card" size={16} color="#5a5656" />
                    <Text style={{fontSize: 12, fontFamily: "poppins_medium"}}>Payment</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Icon2 name="map-pin" size={16} color="#5a5656" />
                    <Text style={{fontSize: 12, fontFamily: "poppins_medium"}}>Location</Text>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                    <TouchableOpacity style={{width: width * 0.8, marginTop: 20 }}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <View style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}}>
                                    <Icon2 name="user" size={20} color={'#5a5656'} />
                                </View>
                                <Text style={{fontFamily: 'poppins_medium', fontSize: 16, color: '#5a5656'}}>User Details</Text>
                            </View>
                            <Icon2 name="chevron-right" size={20} color={'#5a5656'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: width * 0.8, marginTop: 20 }}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <View style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}}>
                                    <Icon2 name="settings" size={20} color={'#5a5656'} />
                                </View>
                                <Text style={{fontFamily: 'poppins_medium', fontSize: 16, color: '#5a5656'}}>Settings</Text>
                            </View>
                            <Icon2 name="chevron-right" size={20} color={'#5a5656'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: width * 0.8, marginTop: 20 }}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <View style={{padding: 10, backgroundColor: '#f7d4d6', borderRadius: 10}}>
                                    <Icon3 name="sharealt" size={20} color={'#5a5656'} />
                                </View>
                                <Text style={{fontFamily: 'poppins_medium', fontSize: 16, color: '#5a5656'}}>Share</Text>
                            </View>
                            <Icon2 name="chevron-right" size={20} color={'#5a5656'} />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{width: width * 0.8, marginBottom: 20, backgroundColor: '#f7d4d6', alignItems: 'center', paddingVertical: 10, borderRadius: 20}}>
                    <Text style={{fontFamily: 'poppins_medium', fontSize: 16, color: '#5a5656'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fef7f8'
    },
})

export default AccountPage;