import React, { Component } from 'react'
import { Text, Icon, Button } from 'native-base'
import { SafeContainer } from '../../components'

export default class Home extends Component{

    static navigationOptions = ({ 
        navigation: {navigate}, // basic navigation
        screenProps, //from single route
        navigationOptions //from second parameter parent
    }) => ({
        tabBarIcon: <Icon name='md-home' size={24}/>,
        tabBarLabel: 'Home',
        tabBarOnPress: () => navigate('Home'),        
    })

    state = {

    }

    render(){
        return (
            <SafeContainer type='scroll'>
                <Text>Dude</Text>
            </SafeContainer>
        )
    }
}