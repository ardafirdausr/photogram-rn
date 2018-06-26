import { 
    createSwitchNavigatorm, 
    createStackNavigator,    
} from 'react-navigation'

import SignIn from './SignIn'
import SignUp from './SignUp'

export default createStackNavigator(
    { SignIn, SignUp },
    { 
        initialRouteName: 'SignIn',
        headerMode: 'none',        
    }
)