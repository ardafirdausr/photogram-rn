import React, { Component } from 'react'
import { Text, Icon, Button } from 'native-base'

export default class Search extends Component{

    static navigationOptions = ({ 
        navigation: {navigate}, // basic navigation
        screenProps, //from single route
        navigationOptions //from second parameter parent
    }) => ({
        tabBarIcon: <Icon name='ios-search' size={24}/>,
        tabBarLabel: 'Search',
        tabBarOnPress: () => navigate('Search'),        
    })


    render(){
        return (
            <Text>Hello Word</Text>
        )
    }
}