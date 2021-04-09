import React from 'react'
import { ActivityIndicator, Keyboard } from 'react-native'
import { Text, Icon, Button } from 'native-base'

export default DButton = ({
	loadingState:loading,
	loadingColor:loadingColor = "grey",
	children:text,
	fontSize =  15,
	color = "white",
	onPress = () => {},
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
				<Text style={{fontSize: fontSize}}>{text}</Text>
		}
		<Icon name={rightIcon}/>
	</Button>
)