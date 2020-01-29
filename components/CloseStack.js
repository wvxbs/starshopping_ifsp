import React from 'react'
import Styles from './../Styles'
import { TouchableOpacity }from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Navigator from './../navigation/Navigator'

const CloseStack = props => {
    return(
        <TouchableOpacity
            onPress={ async ()=>{
                props.navigation.navigate(props.stack)
            }}
            style={{marginLeft : 10}}
        >
            <Ionicons 
                name="ios-close"
                color="#000"
                size={32}
            />
        </TouchableOpacity>
    )
}

export default CloseStack