import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import Styles from './../Styles'
import { translate } from './../locales'
import axios from 'axios';
 
const HomeSidebar = props => {

    const [items, setItems] = useState([{}])
    const [name, setName] = useState("")

    const getName = async () => {
        await axios.get('https://codelinepds.herokuapp.com/api/user', {
            withCredentials: true
        })
        .then(res => {
            var name = "" +  res.data.firstName + " " + res.data.lastName + ""
            setName(name)
        })
    }

    useEffect(() => {
        setItems([
            {
                id : 2,
                title : translate('scan'),
                link : 'Scanner'
            },
            { 
                id : 3,
                title : translate('profile'),
                link : 'profile'
            }
        ])
    })

    const signOutAsync =() => {
        axios.get('https://codelinepds.herokuapp.com/logout')
        AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    const Builder = items.map(item => {
        return (
                <TouchableOpacity 
                style={Styles.sidebarLink}
                onPress={()=>{
                    props.navigation.toggleDrawer();
                    props.navigation.navigate(item.link)
                }}
                key={item.id}
            >
                <Text style={{
                    fontWeight : 'bold',    
                    textAlign : 'left',
                    fontSize : 22
                }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <View style={Styles.sidebarContainer}>
            <View style={Styles.sidebarHeader}>
                <View>

                </View>
                <Text style={Styles.sidebarUserName}>
                    {name}
                </Text>
            </View>
            <ScrollView contentContainerStyle={Styles.sidebarLinkContainer}>
                {Builder}
                <TouchableOpacity 
                style={Styles.sidebarLink}
                onPress={()=>{
                    props.navigation.toggleDrawer();
                    signOutAsync()
                }}
            >
                <Text style={{
                    fontWeight : 'bold',
                    textAlign : 'left',
                    fontSize : 22,
                    color : 'red'
                }}>
                    {translate('exit')}
                </Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default HomeSidebar