import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { SafeContainer } from '../../components'
import { Text, Icon, Button } from 'native-base'

export default class Profile extends Component{

    static navigationOptions = ({ 
        navigation: {navigate}, // basic navigation
        screenProps, //from single route
        navigationOptions //from second parameter parent
    }) => ({
        tabBarIcon: <Icon name='ios-person' size={24}/>,
        tabBarLabel: 'Profile',
        tabBarOnPress: () => navigate('Profile'),        
    })    
    
    render(){
        return(
            <SafeContainer>
                <Text 
                  onPress={ async () => {
                    await AsyncStorage.removeItem('photogram_token')                      
                    this.props.navigation.navigate('LoadingScreen')                    
                  }}
                  >
                    Logout
                </Text>
            </SafeContainer>
        )
    }
}