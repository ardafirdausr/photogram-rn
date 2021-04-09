import React, { PureComponent } from 'react';
import {
	Image,
	TouchableWithoutFeedback,
	View,
	AsyncStorage
} from 'react-native';

import Input from './Input'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class Post extends PureComponent {

	state = {
		comment: '',
		like: false,
		user: {}
	}

	style = {
		postImage: {
			flex: 1,
			alignSelf: 'stretch',
			height: 260,
			width: null,
			backgroundColor: '#efefef'
		},
		icon: {
			fontSize: 28
		},
		textButton: {
			marginRight: 10
		},
		section: {
			paddingVertical: 5,
			paddingTop: 5,
			paddingBottom: 5
		}
	}

	_getUser = async () => {
		const user = JSON.parse(await AsyncStorage.getItem('photogram_user'))
		this.setState({ ...this.state, user })
	}

	componentDidMount(){
		this._getUser()
	}

	_commentOnChange = (value) => {
		this.setState({...this.state, comment: value})
	}

	render(){
		let { postImage, icon, textButton, section } = this.style
		const {
			id: post_id,
			image,
			caption,
			createdAt,
			relationships: {
				comments: {
					comments_count,
					links: {self: likes_link}
				},
				likes: {
					likes_count,
					links: {self: comments_link}
				}
			},
			included: {
				user: {
					id: user_id,
					username,
					avatar,
				}
			}
		} = this.props
		return (
			<TouchableWithoutFeedback onPress={this._dismissKeyboard}>
				<Card>
					<CardItem>
						<Left>
							<Thumbnail small source={{uri: avatar}} style={{backgroundColor: '#efefef'}}/>
							<Body>
								<Text>{username}</Text>
								<Text note>{"indonesia"}</Text>
							</Body>
						</Left>
						<Right>
						<Button transparent>
							<Icon name='more' />
						</Button>
						</Right>
					</CardItem>
					<CardItem cardBody>
						<Image
							style={postImage}
							source={{ uri: image }}
							resizeMode="cover"
							/>
					</CardItem>
					<CardItem style={section}>
						<Left>
							<Button transparent>
								<Icon active name="ios-heart-outline" style={icon}/>
							</Button>
							<Button transparent>
								<Icon active name="ios-chatbubbles-outline" style={icon}/>
							</Button>
							<Button transparent>
								<Icon active name="ios-share-outline" style={icon}/>
							</Button>
						</Left>

						<Right>
							<Text>{createdAt || 'kemarin'}</Text>
						</Right>
					</CardItem>
					<CardItem style={section}>
						<View style={textButton}>
							<Text note>{`${likes_count} likes`}</Text>
						</View>
						<View>
							<Text note>{`${comments_count} comments`}</Text>
						</View>
					</CardItem>
					<CardItem>
						<Text>{caption}</Text>
					</CardItem>
					<CardItem>
						<Left>
							<Thumbnail
							source={{uri: this.state.user.avatar}}
							small
							/>
							<Input
								value={this.state.comment}
								onChangeText={this._commentOnChange}
								placeholder="Add Comment ...."
							/>
						</Left>
					</CardItem>
				</Card>
			</TouchableWithoutFeedback>
		)
	}
}