import React from 'react'
import { View, Image } from 'react-native'

export default LoadingScreen = () => {
    style = {
        container: {
            flex: 1,
            backgroundColor: '#215BA1',
            alignItems: 'center',
            justifyContent: 'center'
        },        
    }

    return (
        <View style={style.container}>
            <Image source={require('./src/assets/logo/logo-white.png')}/>
        </View>
    )
}
