import React from 'react'
import { ActivityIndicator, Keyboard } from 'react-native'
import { Text, Icon, Button } from 'native-base'

export default DButton = ({ 
    loadingState:loading, 
    loadingColor:color = "grey", 
    children:text,    
    onPress,
    leftIcon,
    rightIcon,
    style,
    ...buttonConfig
}) => (    
    <Button style={style} 
      onPress={
          loading ? undefined : () => {
              onPress()
              Keyboard.dismiss()
          }
      }
      {...buttonConfig}
    >
        <Icon name={leftIcon}/>
        {
            loading ? 
                <ActivityIndicator size="small" color="white" /> : 
                <Text>{text}</Text>
        }
        <Icon name={rightIcon}/>
    </Button>
)