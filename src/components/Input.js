import React from 'react'
import { Item, Input, Label, Icon } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'

export default DInput = ({
    leftIcon,
    rightIcon,
    deleteIcon,
    label,
    value,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    placeholder,
    secureTextEntry,
    inputStyle,
    ...config
}) => (
    <Item {...config}>
        <Icon active name={leftIcon}/>
        <Label>{label}</Label>
        <Input
            style={inputStyle} 
            value={value} 
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}            
            placeholder={placeholder}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
        />
        { deleteIcon ? 
            <TouchableWithoutFeedback 
              onPress={() => onChangeText('')}
              > 
                <Icon name={rightIcon}/>                
            </TouchableWithoutFeedback> :
            <Icon name={rightIcon}/>                        
        }
    </Item>
)