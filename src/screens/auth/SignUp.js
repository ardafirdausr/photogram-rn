import React, { Component } from 'react'
import { Text } from 'native-base'
import { KeyboardAvoidingView, View, Alert, AsyncStorage, Image } from 'react-native'

import { Input, Button, SafeContainer, SingleNav } from '../../components'
import serverAPI from '../../service/serverAPI'

export default class SignUp extends Component{
	state = {
		email: '',
		emailValidation: false,
		emailError: '',
		password: '',
		passwordValidation: false,
		passwordError: '',
		passwordConfirmation: '',
		passwordConfirmationValidation: false,
		passwordConfirmationError: '',
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
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
		inputContainer: {
			alignSelf: 'stretch'
		},
		title: {
			fontSize: 22,
			marginBottom: 30
		},
		label: {
			fontSize: 14,
			color: '#007aff',
			alignSelf: 'flex-start',
			marginTop: 15,
			marginBottom: -6
		},
		error: {
			fontSize: 14,
			color: 'red',
			alignSelf: 'flex-start',
			marginVertical: 10
		},
		input: {
		},
		inputText: {
			paddingBottom: -5
		},
		button: {
			marginTop: 50
		}
	}

	_clickableSignUp = () => {
		let {
			emailValidation: e,
			passwordValidation: p,
			passwordConfirmationValidation: r
		} = this.state
		if( e && p && r) return false
		return true
	}

	_isValid = (key, value) => {
		if(this.state[key]) return {
			success: true,
			rightIcon: "checkmark-circle"
		}
		else if(value) return {
			error: true,
			rightIcon: "close-circle",
		}
	}

	_emailVerification = (value) => {
		if(/^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,3})+$/.test(value)){
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
			if(value === this.state.passwordConfirmation){
				this.setState({
					...this.state,
					password: value,
					passwordValidation: true,
					passwordConfirmationValidation: true
				})
			}
			else{
				this.setState({
					...this.state,
					password: value,
					passwordValidation: true,
					passwordConfirmationValidation: false
				})
			}
		}
		else{
			this.setState({
				...this.state,
				password: value,
				passwordValidation: false,
				passwordConfirmationValidation: false
			})
		}
	}

	_passwordConfirmationVerification = (value) => {
		if(value === this.state.password
		   && /^\w{6,20}$/.test(value)
		   && /^\w*\d+\w*$/.test(value)){
			this.setState({
				...this.state,
				passwordConfirmation: value,
				passwordConfirmationValidation:  true
			})
		}
		else{
			this.setState({
				...this.state,
				passwordConfirmation: value,
				passwordConfirmationValidation:  false
			})
		}
	}

	_navigate = (screen) => {
		let {navigation: {navigate}} = this.props
		navigate(screen)
	}

	_saveUserState = async ({meta, data}) => {
		await AsyncStorage.setItem('photogram_token', meta.token)
		await AsyncStorage.setItem('photogram_user', JSON.stringify(data))
	}

	_signUp = () => {
		this.setState({ ...this.state, loading: true })
		let { email, password, passwordConfirmation } = this.state
		serverAPI.post('users', {
			email,
			password,
			password_confirmation: passwordConfirmation
		}).then( ({data, data: {data: user}}) => {
				this._saveUserState(data)
				Image.prefetch(user.avatar)
				this.setState({ ...this.state, loading: false })
				this._navigate('Main')
		}).catch((rej) => {
			try{
				// catch error response from server
				let { response: {data: {error}}} = rej
				if(error){
					if('field' in error){
						this.setState({
							...this.state,
							emailError: error.field.email || '',
							passwordError: error.field.password || '',
							passwordConfirmationError: error.field.password_confirmation || '',
							loading: false,
						})
					}
					if('message' in error) {
						Alert.alert(error.message)
						return
					}
				}
				this.setState({ ...this.state, loading: false })
				// request failed (Internal server error)
				Alert.alert("Sign Up Failed")
			}
			catch(e){
				//catch server offline or no data in reject
				this.setState({ ...this.state, loading: false })
				Alert.alert("Connection timeout")
			}
		})
	}

	render(){
		return (
			<SafeContainer type="view" style={this.style.container}>
			  <KeyboardAvoidingView
				enabled
				behavior="padding"
				style={this.style.main}>
				<Text
				  style={this.style.title}
				  > Register New User</Text>
					<View style={this.style.inputContainer}>
						<Text style={this.style.label}>Email</Text>
						<Input
							underlined
							style={this.style.input}
							inputStyle={this.style.inputText}
							fontSize={14}
							placeholder="john_doe@example.com"
							value={this.state.email}
							onChangeText={this._emailVerification}
							autoCapitalize="none"
							{...this._isValid('emailValidation', this.state.email)}
						/>
						<Text style={this.style.error}>{this.state.emailError}</Text>
					</View>
					<View style={this.style.inputContainer}>
						<Text style={this.style.label}>Password</Text>
						<Input
							underlined
							secureTextEntry
							placeholder="must be 6-20 alphanumeric characters"
							style={this.style.input}
							value={this.state.password}
							onChangeText={this._passwordVerification}
							{...this._isValid('passwordValidation', this.state.password)}
							/>
						<Text style={this.style.error}>{this.state.passwordError}</Text>
					</View>
					<View style={this.style.inputContainer}>
						<Text style={this.style.label}>Password Confirmation</Text>
						<Input
							underlined
							secureTextEntry
							placeholder="re-input password"
							style={this.style.input}
							value={this.state.passwordConfirmation}
							onChangeText={this._passwordConfirmationVerification}
							{...this._isValid(
								'passwordConfirmationValidation',
								this.state.passwordConfirmation
							)}
							/>
						<Text style={this.style.error}>{this.state.passwordConfirmationError}</Text>
					</View>
				<Button
				  primary
				  block
				  onPress={this._signUp}
				  style={this.style.button}
				  loadingState={this.state.loading}
				  loadingColor="white"
				  disabled={ this._clickableSignUp() }
				  > Sign Up </Button>
			  </KeyboardAvoidingView>
			  <SingleNav
				title="Have account already ? "
				navTitle="Sign In"
				onPress={() => this._navigate('SignIn')}
				/>
			</SafeContainer>
		)
	}
}