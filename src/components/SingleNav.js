import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default ({
	title,
	navTitle,
	onPress
}) => {
	style = {
		nav: {
			paddingVertical: 9,
			borderTopWidth: 1,
			borderColor: '#eaeaea',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#f5f5f5',
		},
		navText: {
			color: '#6e6e6e',
			fontSize: 13,
		},
	}

	return (
		<View style={style.nav}>
			<View>
				<Text style={style.navText}>{title}</Text>
			</View>
			<View style={{ marginLeft: 5 }}>
				<Text
				  style={{...style.navText, color: '#007aff'}}
				  onPress={onPress}
				  >{navTitle}</Text>
			</View>
		</View>
)}