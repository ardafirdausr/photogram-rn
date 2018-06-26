import React from 'react'
import { 
    Button, 
    Icon, 
    Text,
    FooterTab,
    Footer
} from 'native-base'
import { createBottomTabNavigator } from 'react-navigation'
import Home from './Home'
import Profile from './Profile'
import Search from './Search'

const style = {
    label: {
        fontSize: 12
    }
}

export default createBottomTabNavigator({
    Home,
    Profile,
    Search
},{
    initialRouteName: 'Home',
    swipeEnabled: true,
    order: ['Home', 'Search', 'Profile'],        
    tabBarOptions: {
        showLabel: true,
        showIcon: true,
        inactiveTintColor: '#6e6e6e',
        activeTintColor: '#007aff',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#f5f5f5',
            paddingVertical: 4,
        },        
    }
})