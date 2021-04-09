import React from 'react'
import {
	Button,
	Icon,
	Text,
	FooterTab,
	Footer
} from 'native-base'
import { createBottomTabNavigator } from 'react-navigation'
import Home from './Home'
import MyProfile from './MyProfile'
import Search from './Search'

const style = {
	label: {
		fontSize: 12
	}
}

export default createBottomTabNavigator({
	Home,
	MyProfile,
	Search
},{
	initialRouteName: 'Home',
	swipeEnabled: true,
	order: ['Home', 'Search', 'MyProfile'],
	tabBarOptions: {
		showLabel: true,
		showIcon: true,
		inactiveTintColor: '#9e9e9e',
		activeTintColor: '#007aff',
		labelStyle: {
			fontSize: 12,
		},
		style: {
			backgroundColor: '#fafafa',
			paddingVertical: 4,
		},
	}
})