import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Text, Icon, Thumbnail, Header, Left, Right, Title } from 'native-base'

import SafeContainer from './SafeContainer'
import UnsafeContainer from './UnsafeContainer'
import Button from './Button'

export default class MyProfile extends Component{

		static navigationOptions = ({
				navigation: {navigate}, // basic navigation
				screenProps, //from single route
				navigationOptions: { inactiveTintColor } //from second parameter parent
		}) => ({
			tabBarIcon: ({focused, tintColor}) => {
					color = focused ? 'black' : '#9e9e9e'
					return (
							<Icon
								name='ios-person'
								style={{
									fontSize:24,
									color
								}}/>
			)},
			tabBarLabel: 'Profile',
			tabBarOnPress: () => navigate('MyProfile'),
		})

		state = {
				user: {}
		}

		style = {
				header: {
					fontWeight: "600"
				},
				userProfile: {
						container: {
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-around',
								padding: 15
						},
						thumbnail: {
								backgroundColor: '#efefef',
								marginRight: 15
						},
						activity: {
								flex: 1,
								flexDirection: 'column',
								justifyContent: 'center',
						},
						statsContainer: {
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
						},
						statsItem: {
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between'
						},
						statsItemText: {
								fontSize: 15,
						},
						statsItemDesc: {
								color: '#aaa',
								fontSize: 15
						},
						button: {
								alignSelf: 'stretch',
								marginVertical: 10,
								paddingVertical: 2,
								height: 30
						}
				},
				profile: {
					container: {
						paddingHorizontal: 15
					},
					name: {
						fontWeight: "500",
					},
					bio: {
						paddingVertical: 8
					}
				}
		}

		componentDidMount() {
				this._getUserState()
		}

		_getUserState = async () => {
				const user = JSON.parse(await AsyncStorage.getItem('photogram_user'))
				this.setState({ ...this.state, user })
		}

		_logout = async () => {
				await AsyncStorage.removeItem('photogram_token')
				await AsyncStorage.removeItem('photogram_user')
				this.props.navigation.navigate('LoadingScreen')
		}

		_renderHeader = () => {
				let {user}  = this.state
				let {header} = this.style
				return (
						<Header>
								<Left>
										<Text style={header}>{user.username}</Text>
								</Left>
								<Right>
										<Icon name="ios-more-outline" style={{fontSize: 28}}/>
								</Right>
						</Header>
				)
		}

		render(){
				let { user } = this.state
				let { userProfile, profile } = this.style
				return(
					<UnsafeContainer>
						{this._renderHeader()}
						<SafeContainer>
							<View style={userProfile.container}>
								<Thumbnail
										style={userProfile.thumbnail}
										source={{uri : user.avatar}}
										large />
								<View style={userProfile.activity}>
									<View style={userProfile.stats}>
										<View style={userProfile.statsContainer}>
											<View style={userProfile.statsItem}>
												<Text style={userProfile.statsItemText}>120</Text>
												<Text style={userProfile.statsItemDesc}>posts</Text>
											</View>
											<View style={userProfile.statsItem}>
												<Text style={userProfile.statsItemText}>6300</Text>
												<Text style={userProfile.statsItemDesc}>followers</Text>
											</View>
											<View style={userProfile.statsItem}>
												<Text style={userProfile.statsItemText}>601</Text>
												<Text style={userProfile.statsItemDesc}>following</Text>
											</View>
											</View>
											<Button style={userProfile.button} >
												Edit Profile
											</Button>
										</View>
								</View>
							</View>
							<View style={profile.container}>
								<Text style={profile.name}>{user.name}</Text>
								<Text style={profile.bio}>"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius explicabo fugiat quam nisi. Hic, saepe laudantium impedit officiis, ipsam cum nobis minus quaerat voluptatum repudiandae fuga iste debitis adipisci!</Text>
							</View>
							<View>
									<Text>Image</Text>
							</View>
							<Text onPress={this._logout}>Logout</Text>
						</SafeContainer>
					</UnsafeContainer>
				)
		}
}