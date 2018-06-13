import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { Input, Button } from '../../../components'

export default RegisterProfile = ({
    style,
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
              placeholder=""
              style={styles.input}
              />
        </SafeAreaView>
    )
}