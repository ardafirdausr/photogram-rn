import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Home from './Home'
import Profile from './Profile'
import Search from './Search'


export default MainTab = createBottomTabNavigator({
    Home,
    Profile,
    Search
},{
    initialScreen: Home
})