import React from 'react'
import Styles from './../Styles'
import { TouchableOpacity, View }from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const DrawerToggler = props => {
    return(
            <View style={Styles.sidebarTogglerContainer}>
            <TouchableOpacity
                style={Styles.sidebarTogger}
                onPress={ async ()=> {
                    props.navigation.toggleDrawer();
                }}
            >
                <Ionicons 
                    name="md-menu"
                    color="#000000"
                    size={32}
                />
            </TouchableOpacity>
            </View>
    )
}

export default DrawerToggler