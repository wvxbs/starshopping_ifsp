import React from 'react'
import {View, ScrollView, TextInput, Text, FlatList, TouchableOpacity} from 'react-native'
import Styles from './../../../Styles'
import { Ionicons } from '@expo/vector-icons'
import Loading from './../../../components/Loading'
import axios from 'axios'

export default class Search extends React.Component {
    state = {
        isLoading : true,
        items : [],
        query : null,
        placeholder : 'Procure o que deseja econtrar.'
    }
     
    static navigationOptions = {
        header : null
    }

    componentWillMount () {
        axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {
            this.setState({ 
                isLoading : false,
                items : res.data
            });
        })
    }

    render () {
        const {  isLoading, items, query, placeholder} = this.state

        searchResult = items.map(item => (
            <View style={Styles.searchResultContainer}>
                <View>
                    <Text>{item.employee_name}</Text>
                    <Text>{item.employee_salary}</Text>
                </View>
            </View>
        )) 

        ShowResults = props => {
            if(isLoading) {
                return (
                    <View             
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 1
                        }}
                    >
                        <Loading /> 
                    </View>
                )
            } else {
            return (
                <FlatList>
                    {this.searchResult}
                </FlatList  > 
            )
            }
        }   
        return (
            <View style={Styles.container}>
                <TextInput 
                    style={Styles.searchbox}
                    placeholder="Buscar"
                />
                <View>
                    <ShowResults />
                </View>
            </View>
        )
    }
}   

/*<Text 
style={{
    fontWeight : 'bold',
    fontSize : 23,
    margin : 'auto',
    height : 'auto',
    textAlign : 'center',
    alignContent : 'center',
    marginTop : 35
}}*/