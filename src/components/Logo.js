import React from 'react'
import { View, Image } from 'react-native'

export default LoadingScreen = () => {
    style = {
        container: {
            flex: 1,            
            alignItems: 'center',
            justifyContent: 'center'
        },        
    }

    return (
        <View style={style.container}>
            <Image 
              width="6"
              height="3"
              source={require('./src/assets/logo/logo-text.png')}
              />
        </View>
    )
}
