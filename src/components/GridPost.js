import React from 'react'
import {
		View,
		Image,
		TouchableWithoutFeedback,
		Dimensions
} from 'react-native'

export default ({
		margin = 1,
		column = 3,
		image,
		onPress
}) => {
		return(
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={{
					width: Dimensions.get('window').width / column - 2 * margin,
					height: Dimensions.get('window').width / column - 2 * margin,
					margin: margin,
					backgroundColor: '#efefef',
				}}>
					<Image source={{uri: image}}
						// image size based on frame
						style={{
								width: null,
								height: null,
								flex: 1
						}}/>
				</View>
			</TouchableWithoutFeedback>
		)

}