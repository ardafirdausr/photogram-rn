import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { Input, Button } from '../../../components'

export default RegisterProfile = ({
    emailValue,
    emailValidation,
    emailOnChangeText,
    passwordValue,
    passwordValidation,
    passwordOnChangeText,
    passwordConfirmtaionValue,    
    passwordConfirmtaionValidation,    
    passwordConfirmationOnChangeText,    
    ...rest
}) => {

    styles = {
        container: {
            flex: 1
        },
        input: {
            marginVertical: 10,
            backgroundColor: "#f8f8f8"
        }
    }    

    return (
        <SafeAreaView style={{...styles.container, ...style}}>
            <Input
              stackedLabel
              label="Email"
              placeholder="john_doe@example.com"
              style={styles.input}
              value={emailValue}
              onChangeText={emailOnChangeText}
              />
            <Input
              secureTextEntry
              stackedLabel
              label="Password"
              placeholder="contain atleast 6 alphanumeric characters"
              style={styles.input}
              value={passwordValue}
              onChangeText={passwordOnChangeText}              
              />
            <Input
              secureTextEntry
              stackedLabel
              label="Password Confirmation"
              placeholder="re-input your password"
              style={styles.input}
              value={passwordValue}
              onChangeText={passwordOnChangeText}              
              />
        </SafeAreaView>
    )
}