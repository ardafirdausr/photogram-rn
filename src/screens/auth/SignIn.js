import React, { Component } from 'react'
import { View, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Input, Button, SafeContainer, SingleNav } from '../../components'

export default class Login extends Component {
    state = {
        email: '',
        emailValidation: false,
        password: '',
        passwordValidation: false,
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
        let {emailValidation, passwordValidation} = this.state        
        if(emailValidation && passwordValidation) return false
        else return true
    }

    _isValid = (key, value) => {
        if(this.state[key]) return {
            success: true,            
            rightIcon: "checkmark-circle"
        }
        else if(value) return {            
            error: true,
            rightIcon: "close-circle",
            deleteIcon: true
        }
    }

    _emailVerification = (value) => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
            this.setState({ 
                ...this.state, 
                email: value,
                emailValidation: true 
            })
        }
        else{
            this.setState({ 
                ...this.state, 
                email: value,
                emailValidation: false
            })            
        }        
    }    

    _passwordVerification = (value) => {
        if(/^\w{6,20}$/.test(value) && /^\w*\d+\w*$/.test(value)){                        
            this.setState({ 
                ...this.state, 
                password: value,
                passwordValidation: true 
            })
        }
        else{
            this.setState({ 
                ...this.state, 
                password: value,
                passwordValidation: false
            })
        }
    }

    _stateOnChange = (key, value) => {
        this.setState({ ...this.state, [key]: value })
    }

    _navigate = (screen) => {
        let {navigation: {navigate}} = this.props
        navigate(screen)
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
                            onChangeText={value => this._emailVerification(value)}
                            {...this._isValid('emailValidation', this.state.email)}
                        />
                        <Input
                            underlined
                            style={this.style.input}
                            placeholder="Password"                    
                            leftIcon="md-lock"
                            value={this.state.password}
                            onChangeText={value => this._passwordVerification(value)}
                            secureTextEntry
                            {...this._isValid('passwordValidation', this.state.password)}
                        />
                        <Button
                            style={this.style.button}
                            onPress={() => {
                                this.setState({
                                    ...this.state, 
                                    ['loading']: true
                                })
                                setTimeout(() => {
                                    this.setState({
                                        ...this.state, 
                                        ['loading']: false
                                    })
                                }, 2000)
                            }}
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