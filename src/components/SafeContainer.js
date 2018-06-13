import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { 
    TouchableWithoutFeedback,     
    Keyboard,
    View,
    ScrollView 
} from 'react-native'

export default ({ 
    type, 
    children, 
    style,
    onPress 
}) => (            
    <SafeAreaView style={{...style, flex: 1}}>
        <TouchableWithoutFeedback 
          style={{flex: 1}}
          onPress={ onPress ? onPress : 
          () => Keyboard.dismiss() } >
            {
                type === 'view' ?
                <View style={{flex: 1}}>
                    {children}
                </View> :
                type === 'scroll' ?
                    <ScrollView style={{flex: 1}}>
                        {children}
                    </ScrollView> :
                ""
            }
        </TouchableWithoutFeedback>                
    </SafeAreaView>
)