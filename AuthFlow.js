import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from './screens/sign/SignIn'
import SignUp from './screens/sign/SignUp'
import HomeDrawerNavigator from './navigation/HomeDrawerNavigator'
import axios from 'axios'
import { translate } from './locales'
import React from 'react';
import {ActivityIndicator, AsyncStorage, StyleSheet, View, } from 'react-native';
import Scanner from './screens/signed/home/Scanner';
import Search from './screens/signed/home/Search';
import Profile from './screens/signed/home/Profile';
import Establishment from './screens/signed/home/Establishment';
import ScannerResult from './screens/signed/home/scanner/ScannerResult';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  logIn = async (request) => {
    await axios.post('https://codelinepds.herokuapp.com/login/consumer', request, {
      headers : {
        "Content-Type" : "application/json"
      }
  }).catch(err =>{
    alert(translate('disconnected'))
    AsyncStorage.clear()
    this.props.navigation.navigate("Auth")
  })
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    var request 
    if(userToken !== null) {
      AsyncStorage.multiGet(['email', 'password']).then((data) => {
        const email = data[0][1];
        const password = data[1][1];
        request = JSON.stringify({
          email : email,
          password : password
        }) 
        this.logIn(request)
    })
    }

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={{flex : 1, justifyContent : 'center', alignContent : 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator(
    {
     signIn : {
       screen : SignIn,
       navigationOptions : {
         title : translate('signin'),
         headerStyle: {
          backgroundColor: '#fff',
          borderBottomColor : '#fff'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
       },
     },
     signUp : SignUp    
    },
    {
        initialRouteName: 'signIn',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomColor : '#fff'
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            },
          }
        }
    );

  const EstablishmentStack = createStackNavigator(
      {
        establishment : Establishment
      },{
        initialRouteName : 'establishment',
        header : null
      }
  )

  const HomeSearchStack = createStackNavigator(
      {
        search : Search
      },
      {
        initialRouteName: 'search',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#fff'
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            },
          }
      }
  )

  const ScannerStack = createStackNavigator(
      {
       scanner : Scanner,
       result : ScannerResult
      },
      {
        header : null
      }
      );

      const AppStack = createStackNavigator(
        {
            home : {
              screen : HomeDrawerNavigator,
              navigationOptions : {
                header : null,
                title : translate('discover'),
                headerStyle: {
                  backgroundColor: '#fff',
                  borderBottomColor : '#fff'
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }
            },
            establishment : {
              screen : EstablishmentStack,
              navigationOptions : {title : translate('details'),
              headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor : '#fff'
              },
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }
            },
            profile : {
              screen : Profile,
              navigationOptions : {
                title : translate('profile'),
                headerStyle: {
                  backgroundColor: '#fff',
                  borderBottomColor : '#fff'
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }
            },
            HomeSearch : {
              screen : HomeSearchStack,
              navigationOptions : {
                title : translate('search'),
                headerStyle: {
                  backgroundColor: '#fff',
                  borderBottomColor : '#fff'
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }
            },
            Scanner : {
              screen : ScannerStack,
              navigationOptions : {
                title : translate('scanner'),
                headerStyle: {
                  backgroundColor: '#fff',
                  borderBottomColor : '#fff'
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }
            },
        },
        {
          initialRouteName: 'home',
          defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              },
          }
      }
    );

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Scanner : ScannerStack,
    HomeSearch : HomeSearchStack 
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
