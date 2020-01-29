    import React from 'react'
import {View, ScrollView, Text, ActivityIndicator} from 'react-native'
import Styles from './../../../Styles'
import axios from 'axios'
import { translate } from '../../../locales';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            telephone : '',
            cpf : '',
            isLoading : true
         };
    }

    componentWillMount () {
        axios.get('https://codelinepds.herokuapp.com/api/user').then(res =>{
            this.displayProfileData(res.data)
            this.setState({isLoading : false})
        })
    }

    displayProfileData  = (profile) => {
        var name = "" + profile.firstName + " " + profile.lastName + ""
        this.setState({
            name : name,
            email : profile.email,
            telephone : profile.telephone,
            cpf : profile.cpf
        })
    }

    render() {
        if(this.state.isLoading) {
            return (
            <View style={{flex : 1,justifyContent : 'center', alignContent : 'center', height:400}}>
                <ActivityIndicator size="large" color="#000" />
            </View>
            )
        } else {
        return (
        <View style={Styles.container}>
            <View>
                <Text style={[Styles.title, {fontSize : 35, marginTop : 10}]}>
                    {this.state.name}
                </Text>
                <View>
                    <Text style={[Styles.label, {marginTop : 10}]}>
                        {translate('email')}:   
                    </Text>
                    <Text style={[Styles.label, {marginTop : 10, fontWeight : "normal"}]}>
                        {this.state.email}
                    </Text>
                    <Text style={[Styles.label, {marginTop : 10}]}>
                        {translate('telephone')}: 
                    </Text>
                    <Text style={[Styles.label, {marginTop : 10, fontWeight : "normal"}]}>
                        {this.state.telephone}
                    </Text>
                    <Text style={[Styles.label, {marginTop : 10}]}>
                        {translate('cpf')}: 
                    </Text>
                    <Text style={[Styles.label, {marginTop : 10, fontWeight : "normal"}]}>
                        {this.state.cpf}
                    </Text>
                </View>
            </View>
    </View>
        );
    }}
}

export default Profile;