import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Styles from './../Styles'

const Loading = props => {
    return(
        <ActivityIndicator 
            size="large"
            color="#000"
        />
    )
}

export default Loading