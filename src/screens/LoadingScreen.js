import React, { Component } from 'react'
import { View, Image } from 'react-native'

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
            let { navigation: {navigate}} = this.props
            navigate('SignIn')
        }, 2000)
    }

    render(){
        return(
            <View style={this.style.container}>
                <Image source={require('../assets/logo/logo-white.png')}/>            
            </View>
        )
    }
}

