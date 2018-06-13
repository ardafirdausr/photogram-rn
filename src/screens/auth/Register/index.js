import React, { Component } from 'React'
import { SafeAreaView } from 'react-navigation'
import { Input, Button } from '../../components'

class Register extends Component{
    state = {
        name: '',
        nameValidataion: true,
        username: '',
        usernameValidation: true,
        email: '',
        emailValidation: true,
        password: '',
        passwordValidation: true,
        passwordConfirmation: '',
        passwordConfirmationValidation: true,
        loading: false
    }

    style = {
        container: {
            flex: 1
        }   
    }

    _emailValidation(key, value){        
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/){
            this.setState({ ...this.state, [key]: true })
        }
        this.setState({ ...this.state, [key]: false })
    }

    _alphanumericValidation(key, value){
        if(/^[A-Za-z0-9]+$/.test(value)){
            this.setState({ ...this.state, [key]: true })            
        }
        this.setState({ ...this.state, [key]: false })        
    }

    _alphabetValidation(key, value){
        if(/^[a-zA-Z ]{1,}$/.test(value)){
            this.setState({ ...this.state, [key]: true })
        }
        else{
            this.setState({ ...this.state, [key]: false })
        }
    }

    __stateOnChange(key, value) {
        this.setState({ ...this.state, [key]: value })
    }

    render(){
        return (
            <SafeAreaView style={this.style.container}>
                <Input
                  

                />
                <Input
                  value={this.state.email}
                  onChangeText={ value => this.__stateOnChange() }
                />
                <Button
                 loadingState={this.state.loading}
                 loadingColor="blue"
                 block primary
                 > Submit </Button>
            </SafeAreaView>
        )
    }
}

export default Register