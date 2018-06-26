import React, { Component } from 'react'
import { Image, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native'
import { Input, Button, SafeContainer, SingleNav } from '../../components'
import serverAPI from '../../service/serverAPI'

export default class Login extends Component {
    state = {
        email: '',        
        password: '',        
        loading: false
    }

    style = {
        container: {
            flex: 1,            
            flexDirection: 'column',
            backgroundColor: 'white'
        },
        main: {
            flex: 1,
            padding: 30,        
            alignItems: "center",     
            justifyContent: 'center'       
        },
        logo: {
            marginBottom: 60
        },
        input: {
            marginVertical: 0,                        
        },
        button: {
            marginTop: 50
        },        
    }

    _disableSignUp = () => {        
        let { email, password } = this.state
        if( !!email && !!password ) return false
        else return true
    }  

    _stateOnChange = (key, value) => {
        this.setState({ ...this.state, [key]: value })
    }

    _navigate = (screen) => {
        let {navigation: {navigate}} = this.props
        navigate(screen)
    }

    _signIn = () => {
        this.setState({ ...this.state, loading: true })
        let { email, password } = this.state
        serverAPI.post('users/auth', { email, password })
          .then( async res => {                            
            let { data } = res
            await AsyncStorage.setItem('photogram_token', data.token)
            this.setState({ ...this.state, loading: false })
            this._navigate('Main')
          })
          .catch( rej => {
              try{
                  this.setState({ ...this.state, loading: false })                        
                  let { response: {data: {error}}} = rej
                  if('message' in error){
                      Alert.alert(error.message)
                      return
                  }            
                  Alert.alert('Sign In Failed')
              }
              catch(e){
                this.setState({ ...this.state, loading: false })                        
                Alert.alert("Connection timeout")
              }
            })
    }

    render(){
        return(            
            <SafeContainer type="view" style={this.style.container}>            
                    <KeyboardAvoidingView 
                      style={this.style.main} enabled
                      behavior="padding"
                      >
                        <Image 
                            width="200"
                            height="123"
                            source={require("../../assets/logo/logo-blue2.png")}
                            style={this.style.logo}
                        />
                        <Input
                            underlined
                            style={this.style.input}
                            placeholder="Email"
                            leftIcon="md-contact"
                            value={this.state.email}
                            autoCapitalize="none"
                            onChangeText={value => this._stateOnChange('email', value)}           
                            clearButtonMode="while-editing"                      
                        />
                        <Input
                            underlined
                            style={this.style.input}
                            placeholder="Password"                    
                            leftIcon="md-lock"
                            value={this.state.password}
                            onChangeText={value => this._stateOnChange('password', value)}
                            clearButtonMode="while-editing"                      
                            secureTextEntry                                                                                    
                        />
                        <Button
                            style={this.style.button}
                            onPress={this._signIn}
                            primary                    
                            block
                            loadingState={this.state.loading}
                            loadingColor="white"
                            disabled={this._disableSignUp()}
                        >Sign In</Button>
                    </KeyboardAvoidingView>                
                    <SingleNav
                      title="Did't have account ? "
                      navTitle="Sign Up"           
                      onPress={() => this._navigate('SignUp')}           
                    />
            </SafeContainer>
        )
    }
}