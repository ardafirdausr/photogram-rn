import { createSwitchNavigator } from 'react-navigation'

import Auth from './auth'
import LoadingScreen from './LoadingScreen'

export default createSwitchNavigator(
    { Auth, LoadingScreen },
    { initialRouteName: 'LoadingScreen' }
)