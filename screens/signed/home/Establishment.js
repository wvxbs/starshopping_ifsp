import React from 'react';
import {View, ScrollView, Text, ActivityIndicator, StatusBar} from 'react-native'
import axios from 'axios'
import Styles from './../../../Styles'
import { translate } from '../../../locales';
import Coupon from '../../../components/Coupon';

class Establishment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id : this.props.navigation.getParam('id', 0),
            isLoading : true,
            data : {},
            coupons : {}
         };
    }

    static navigationOptions = {
        header : null
    }

    renderCoupons = () => {
        if(JSON.stringify(this.state.coupons) == '[]') {
            return(
                <View>
                    <Text style={{    
                            fontSize : 20,
                            fontWeight : 'bold',
                            textAlign : 'left',
                            width : 'auto',
                            textAlign : 'center',
                            alignContent : 'center',
                            marginTop : 20,
                        }}
                    >
                        {translate('nocupons')}
                    </Text>
                </View>
            )
        } else {
            if(Array.isArray(this.state.coupons)){
                var render = []
                 this.state.coupons.map(coupon =>{
                    render.push(<Coupon title={coupon.description} />)
                })
                return (
                    <View>
                        <Text  style={{
                            fontSize : 20,
                            fontWeight : 'bold',
                            textAlign : 'left',
                            width : 'auto',
                            marginTop : 20
                        }}>
                            {translate('availableCoupons')} :
                        </Text>
                        <View style={{justifyContent : 'center'}}>
                            {render}
                        </View>
                    </View>
                )
                } else {
                return(
                    <View>
                        <Text  style={{
                            fontSize : 20,
                            fontWeight : 'bold',
                            textAlign : 'left',
                            width : 'auto',
                            marginTop : 20
                        }}>
                            {translate('availableCoupons')} :
                        </Text>
                        <View style={{justifyContent : 'center'}}>
                            <Coupon title={this.state.coupons.description} />
                        </View>
                    </View>
                )
            }
        }
    }

    isLoading = () =>{
        if(this.state.isLoading) {
            return (
            <View style={{flex : 1,justifyContent : 'center', alignContent : 'center', height:400}}>
                <ActivityIndicator size="large" color="#000" />
            </View>
            )
        } else {
            return(
                <View>
                    <View>
                        <Text style={[Styles.title, {marginTop : 10}]}>
                            {this.state.data.name}
                        </Text>
                        <View>
                            <Text style={[Styles.label, {marginTop : 10}]}>
                                "{this.state.data.description}"
                            </Text>
                        </View>
                        <View style={{width :'auto'}}>
                            {this.renderCoupons()}
                        </View>
                    </View>
                </View>
            )
        }
    }

    async componentWillMount() {
        var url = "https://codelinepds.herokuapp.com/api/establishment/getById/" + this.state.id
        await axios.get(url).then(res => {
            this.setState({
                data : res.data,
            })
            var url = 'https://codelinepds.herokuapp.com/api/coupon/getByEstablishmentId/' + this.state.data.id
            axios.get(url).then(res =>{
                this.setState({
                    coupons : res.data,
                    isLoading : false
                })
            })
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={Styles.container}>
                {this.isLoading()}
            </ScrollView>
        )
    }
}

export default Establishment;