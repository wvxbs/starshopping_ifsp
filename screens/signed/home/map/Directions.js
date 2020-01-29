import React from 'react'
import MapViewDirections from 'react-native-maps-directions'

const Directions = ({destination, origin, onReady}) => {
    <MapViewDirections 
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyD0k2G5Qcwr-KxVYyRBZL4NuelnR1xuORk"
        strokeWidth={3}
        strokeColor="#222"
    />
}

export default Directions