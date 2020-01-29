import React, { Component } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Style from './../../../../Styles'
import Styles from './../../../../Styles';
import { translate } from '../../../../locales';
import axios from 'axios'

class ScannerResult extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            data : {},
            hash : this.props.navigation.getParam('hash', 0),
            isLoading : true
        };
    }

    static navigationOptions = {
        header : null
    }

    async componentWillMount() {
        var url = "https://codelinepds.herokuapp.com/api/couponQRCode/validate/" + this.state.hash

        axios.get(url).then(res => {
            alert(JSON.stringify(res.data))
            this.setState({isLoading : false})
        }).catch(err =>{
            alert(translate('invalidcou'))
            this.props.navigation.navigate('scanner')
        })
    }

    render() {
        if(this.state.isLoading) {
            return (
            <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
                <ActivityIndicator size="large" color="#000" />
            </View>
            )
        } else {
        return (
            <View style={Styles.container}>
                <View>
                    <Text style={Styles.label}>
                        "dois pelo preço de Um"
                    </Text>
                </View>
            </View>
        );
    }}
}

export default ScannerResult;