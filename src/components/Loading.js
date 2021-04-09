import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default ({
	color = "#aaa",
	size = "small"
}) => (
	<View 
		style={{
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			marginVertical: 10
		}}
		>
		<ActivityIndicator color={color} size={size}/>
	</View>
)