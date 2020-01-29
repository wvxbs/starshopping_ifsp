import React from 'react'
import {View, Text} from 'react-native'
import Styles from './../Styles'

const Coupon = props => {
    return (
        <View style={Styles.coupon}>
            <Text style={{
                fontSize : 20,
                fontWeight : 'bold',
                textAlign : "center",
                width : 'auto',
                marginTop : 20
            }}>
                {props.title}
            </Text>
        </View>
    )
}

export default Coupon