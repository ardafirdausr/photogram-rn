import React from 'react'
import { Item, Input, Label, Icon } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'

export default DInput = ({
    fontSize = 15,
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
    style,
    inputStyle,
    labelStyle,
    ...config
}) => (
    <Item style={style} {...config}>                
        <Label style={labelStyle}>{label}</Label>
        <Icon active name={leftIcon}/>
        <Input            
            style={{
                ...inputStyle,
                fontSize: fontSize
            }} 
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
                <Icon name={rightIcon || 'close-circle'}/>                
            </TouchableWithoutFeedback> :
            <Icon name={rightIcon}/>
        }
    </Item>
)