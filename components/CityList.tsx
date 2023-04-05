import React from 'react'
import { View } from 'react-native'
import MapLocations from './MapLocations';

const CityList = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MapLocations />
        </View>
    );
}

export default CityList;