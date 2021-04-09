import { createSwitchNavigator } from 'react-navigation'

import Auth from './auth'
import Main from './main'
import LoadingScreen from './LoadingScreen'

export default createSwitchNavigator(
	{  LoadingScreen, Auth, Main },
	{ initialRouteName: 'LoadingScreen' }
)