import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text, Icon, Button } from 'native-base'

export default DButton = ({ 
    loadingState:loading, 
    loadingColor:color = "grey", 
    children:text,
    leftIcon,
    rightIcon,
    style,
    ...buttonConfig
}) => (    
    <Button style={style} {...buttonConfig}>
        <Icon name={leftIcon}/>
        {
            loading ? 
                <ActivityIndicator size="small" color="white" /> : 
                <Text>{text}</Text>
        }
        <Icon name={rightIcon}/>
    </Button>
)