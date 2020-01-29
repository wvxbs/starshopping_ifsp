import React, {useState, useEffect} from 'react'  
import {View, Text, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, ActivityIndicator} from 'react-native'
import Styles from './../../Styles'
import axios from 'axios'
import { translate } from './../../locales'
 
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : null,
      password : null,
      isLoading : false,
      aRequest : {},
      response : 0,
      responseStatus : 0
    };
  }

  static navigationOptions = {
    header : null,
    title : translate('enter'),
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomColor : '#fff'
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
}

    Navigate = (screen) => {
        this.props.navigation.navigate(screen)
    }

    
      signInAsync = async (request) => {
        var oRequest = JSON.parse(this.state.aRequest)
        await AsyncStorage.multiSet([
          ["email", oRequest.email],
          ["password", oRequest.password]
        ])
        AsyncStorage.setItem('userToken', JSON.stringify(request));
        this.Navigate('App');
      }

      isLoading = () => {
        if(this.state.isLoading){
            return (
              <ActivityIndicator style={{marginLeft : 'auto', marginRight : 'auto', marginTop : 'auto', marginBottom : 'auto'}}/>
            )
        } else {
          return (
            <Text style={Styles.buttonText}>
              {translate('enter')}
            </Text>
          )
        }
      }

      submitData = (email, password) => {
        var request = ''
        this.setState({isLoading : true})
        
        if(email != undefined && password != undefined) {
          request = JSON.stringify({
            email : email,
            password : password
          })
          this.setState({aRequest : request})

          axios.post('https://codelinepds.herokuapp.com/login/consumer', request, {
            headers : {
              "Content-Type" : "application/json"
            }
          }).then(res => { 
            this.setState({response : res.data})
            console.log(this.state.response)
            this.signInAsync(res.data)
          }).catch(err =>{
            this.setState({responseStatus : err})
            console.log(this.state.responseStatus)
            alert(this.state.responseStatus.message)
            this.setState({
              isLoading : false,
              response : 0,
              responseStatus : 0
            })
          })
        } else {
          alert('Preencha os campos')
          this.setState({
            isLoading : false,
            response : 0,
            responseStatus : 0
          })
        }
      }

    render () {
      var email, password

      return(
        <View style={[Styles.container, {height : 'auto'}]}>
          <KeyboardAvoidingView behavior="padding" style={{height : 'auto'}}>
              <ScrollView contentContainerStyle={[Styles.noHeaderMarginTop, {height : 'auto'}]}>
                  <View style={{marginTop : 'auto', marginBottom : 'auto'}}>
                      <Text style={Styles.title}>{translate('welcome')}</Text>
                  </View>
                  <View>
                    <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            {translate('email')}
                        </Text>
                        <View>
                            <TextInput 
                                style={Styles.textInput} 
                                type="text"
                                placeholder="Ex: gustabo@email.com"
                                onChangeText={(input) =>{
                                  email = input
                                }}
                                value={email}
                            />
                        </View>    
                    </View>
                    <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            {translate('password')}
                        </Text>
                        <View>
                            <TextInput 
                                style={Styles.textInput} 
                                type="password"
                                placeholder="Ex: ;)"
                                onChangeText={(input) =>{
                                  password = input
                                }}
                                value={password}
                                secureTextEntry
                            />
                        </View>    
                    </View>
                  </View>
                  <View style={{justifyContent : 'center', marginTop : 16}}>
                    <TouchableOpacity 
                        onPress={()=>{
                          this.submitData(email,password)
                        }} 
                        style={Styles.button}
                    >
                      {this.isLoading()}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.Navigate('signUp')}
                    >
                      <Text style={Styles.textButton}>
                        {translate('signup')}
                      </Text>
                    </TouchableOpacity>
                  </View>
              </ScrollView>
          </KeyboardAvoidingView>
          </View>
      )
    }
}