import React, {useState, useEffect} from 'react'

import {View, Text, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, TouchableOpacity } from 'react-native'
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
      response : 0,
      aRequest : 0,
      responseStatus : 0
    };
  }

  static navigationOptions = {
    title : translate('signup'),
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
        await AsyncStorage.setItem('userToken', JSON.stringify(request));
        this.Navigate('App');
      }

      handleEmailChange = (email) => {
        this.setState({email})
      }
      
      handlePasswordChange = (password) => {
        this.setState({password})
      }

      submitData = (email, firstName, lastName, cpf, password) => {
        var request = ''
        this.setState({isLoading : true})
        
        if(email != undefined && firstName != undefined && lastName != undefined && cpf != undefined && password != undefined) {
          request = JSON.stringify({
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "birth": "1970-01-01T00:00:02.001Z",
            "telephone": "+5511952275451",
            "zipcode": "05145200",
            "country": "Brasil",
            "state": "SP",
            "city": "São Paulo",
            "address": "Av. Pereira Raimundo de Magalhães",
            "number": "3363",
            "cpf": cpf,
            "complement": "Bloco A",
            "profilePhoto": "/pathasa.png",
            "password": password
          })

          this.setState({aRequest : JSON.stringify({
            email : email,
            password : password
          })})

          axios.post('https://codelinepds.herokuapp.com/api/consumer', request, {
            headers : {
              "Content-Type" : "application/json"
            }
          }).then(res => { 
            this.setState({response : res.data})
            console.log(this.state.response)
            this.signInAsync(res.data.id)
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
      var email, firstName, lastName, cpf, password

      return(
        <View style={[Styles.container, {height : 'auto'}]}>
          <KeyboardAvoidingView behavior="padding" style={{height : 'auto'}}>
              <ScrollView>
                <View>
                  <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            Primeiro Nome:
                        </Text>
                        <View>
                            <TextInput 
                                style={Styles.textInput} 
                                type="text"
                                placeholder="Ex: Gabriel"
                                onChangeText={(input) =>{
                                  firstName = input
                                }}
                                value={firstName}
                            />
                        </View>    
                    </View>
                    <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            Ultimo Nome:
                        </Text>
                        <View>
                            <TextInput 
                                style={Styles.textInput} 
                                type="text"
                                placeholder="Ex: Gengibre"
                                onChangeText={(input) =>{
                                  lastName = input
                                }}
                                value={lastName}
                            />
                        </View>    
                    </View>
                    <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            E-Mail:
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
                            CPF:
                        </Text>
                        <View>
                            <TextInput 
                                style={Styles.textInput} 
                                type="text"
                                placeholder="Ex: 121312312312"
                                onChangeText={(input) =>{
                                  cpf = input
                                }}
                                value={cpf}
                                keyboardType={"numeric"}
                            />
                        </View>    
                    </View>
                    <View style={{marginTop:17}}>
                        <Text
                            style={Styles.label}
                        >
                            Senha:
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
                  <View style={{justifyContent : 'center', marginTop : 16, marginBottom : 20}}>
                    <TouchableOpacity 
                        onPress={()=>{
                          this.submitData(email, firstName, lastName, cpf, password)
                        }} 
                        style={Styles.button}
                    >
                        <Text style={Styles.buttonText}>
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