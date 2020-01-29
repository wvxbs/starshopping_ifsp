import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import Home from '../screens/signed/Home'
import HomeSidebar from './../components/HomeSidebar'

const HomeDrawerNavigator = createDrawerNavigator(
  {
    home: {
      screen: Home,
      navigationOptions : {
        drawerLabel : () => null
      }
    },
  },
  {
    initialRouteName :'home',
    contentComponent : HomeSidebar
  }
)

export default HomeDrawerNavigator
  