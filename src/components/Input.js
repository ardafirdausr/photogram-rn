import React from 'react'
import { Item, Input, Label, Icon } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'

export default DInput = ({
	fontSize = 15,
	iconSize = 20,
	leftIcon,
	rightIcon,
	deleteIcon,
	label,
	value,
	clearButtonMode,
	onChangeText,
	onFocus,
	onBlur,
	onSubmitEditing,
	placeholder,
	secureTextEntry,
	style,
	inputStyle,
	labelStyle,
	autoCapitalize,
	...config
}) => (
	<Item style={style} {...config}>
		<Label style={labelStyle}>{label}</Label>
		<Icon active name={leftIcon} style={{fontSize: iconSize}}/>
		<Input
			style={{
				...inputStyle,
				fontSize: fontSize
			}}
			value={value}
			clearButtonMode={clearButtonMode}
			onChangeText={onChangeText}
			onFocus={onFocus}
			onBlur={onBlur}
			placeholder={placeholder}
			onSubmitEditing={onSubmitEditing}
			secureTextEntry={secureTextEntry}
			autoCapitalize={autoCapitalize}
		/>
		{ deleteIcon ?
			<TouchableWithoutFeedback
			  onPress={() => onChangeText('')}
			  >
				<Icon name={rightIcon || 'ios-close-circle'} style={{fontSize:iconSize, color:"#aaa"}}/>
			</TouchableWithoutFeedback> :
			<Icon name={rightIcon} style={{fontSize:iconSize}}/>
		}
	</Item>
)