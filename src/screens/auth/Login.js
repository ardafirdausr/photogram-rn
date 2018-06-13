import React, { Component } from 'react'
import { View, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Text } from 'native-base'
import { Input, Button, SafeContainer } from '../../components'

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
            flexDirection: 'column'
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

    _disableSignUp(){
        let {emailValidation, passwordValidation} = this.state        
        if(emailValidation && passwordValidation) return false
        else return true
    }

    _isValid(key, value){
        console.log(Boolean(this.state[key]))
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

    _emailVerification(value){
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

    _passwordVerification(value){
        if(/^\w{6,}$/.test(value) && /^\w*\d+\w*$/.test(value)){                        
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

    _stateOnChange(key, value){
        this.setState({ ...this.state, [key]: value })
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
                            loadingColor="blue"
                            disabled={this._disableSignUp()}
                        >Sign In</Button>
                    </KeyboardAvoidingView>                
                <View style={this.style.nav}>
                    <View>
                        <Text style={this.style.navText}>Didnt have account ? </Text>    
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{...this.style.navText, color: '#007aff'}} >Sign Up</Text>
                    </View>
                </View>
            </SafeContainer>
        )
    }
}