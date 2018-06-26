import React, { Component } from 'react'
import { View, Image, AsyncStorage } from 'react-native'

export default class LoadingScreen extends Component{

    style = {
        container: {
            flex: 1,
            backgroundColor: '#215BA1',
            alignItems: 'center',
            justifyContent: 'center'
        },        
    }
    
    componentDidMount(){
        //update this
        setTimeout(() => {
            this._isLogged()
        }, 1000)
    }

    _isLogged = async () => {
        let { navigation: {navigate} } = this.props        
        logged = await AsyncStorage.getItem('photogram_token')
        navigate( logged ? 'Main' : 'Auth')
    }

    render(){
        return(
            <View style={this.style.container}>
                <Image source={require('../assets/logo/logo-white.png')}/>            
            </View>
        )
    }
}

