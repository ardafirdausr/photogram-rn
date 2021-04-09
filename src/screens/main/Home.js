import React, { Component } from 'react'
import { Image, Alert, TouchableWithoutFeedback, AsyncStorage} from 'react-native'
import {
	Text, Icon, Button, Header, Left, Body, Right, Title, Content, View,
} from 'native-base'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import { UnsafeContainer, SafeContainer, Post, Loading } from '../../components'
import serverAPI from '../../service/serverAPI'

class Home extends Component{

	static navigationOptions = ({
		navigation: { navigate }, // basic navigation
		screenProps, //from single route
		navigationOptions: { inactiveTintColor }  //from second parameter parent
	}) => ({
		tabBarIcon: ({focused, tintColor}) => {
			color = focused ? 'black' : '#9e9e9e'
			return (
				<Icon
				  name='md-home'
				  style={{
					fontSize:24,
					color
				  }}/>
		)},
		tabBarLabel: 'Home',
		tabBarOnPress: () => navigate('Home'),
	})

	state = {
		posts: [],
		nextPageUrl: '',
		loadFlag: true,
		fetchSize: 5,
		loading: true,
		refreshing: false,
		loadMore: false
	}

	style = {
		contaner: {
			flex: 1,
			alignSelf: 'stretch',
		},
		centerContainer: {
			flex: 1,
			alignSelf: 'stretch',
			alignItems: 'center',
			justifyContent: 'center',
			flexGrow: 1
		},
		logoImage: {
			width: 100,
			height: 25,
		},
		icon: {
			fontSize: 28
		},
		emptyList: {
			image: {
				fontSize: 50,
				color: '#aaa',
				marginBottom: 10
			},
			text: {
				color: '#aaa'
			}
		},
		footerList: {
			view: {
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				marginVertical: 10
			},
			text: {
				color: '#6e6e6e',
				fontSize: 15
			}
		}
	}

	componentDidMount() {
		this._fetchPost()
	}

	_fetchPost = (url = 'posts', add = false) => {
		if(this.state.loadFlag){
			this.setState(
				{...this.state, loadFlag: false},
				() => {
					serverAPI.get(url, { params: { size: this.state.fetchSize }})
						.then(({ data: {
								links: {next: nextPageUrl},
								data: posts,
							}}) => {
								posts = add ? [...this.state.posts, ...posts] : posts
								this.setState({
									...this.state,
									loading: false,
									refreshing: false,
									loadMore: false,
									loadFlag: true,
									nextPageUrl,
									posts,
							})
						})
						.catch(rej => {
							try{
								//catch when failed get response from server
								this.setState({
									...this.state,
									loading: false,
									refreshing: false,
									loadMore: false,
									loadFlag: true,
								})
								if(this.state.nextPageUrl !== null) Alert.alert('Failed get data')
							}
							catch(e){
								Alert.alert('Connection timeout')
								return
							}
					})
				})
		}
	}

	_refreshPost = () => {
		this.setState(
			{ ...this.state, refreshing: true },
			() => this._fetchPost()
		)
	}

	_loadMorePost = () => {
		if(!this.onEndReachedCalledDuringMomentum){
			this.setState(
				{...this.state, loadMore: true},
				() => this._fetchPost(this.state.nextPageUrl, true)
			)
			this.onEndReachedCalledDuringMomentum = true;
		}

	}

	_renderFooterList = () => {
		let { footerList: { text, view }} = this.style
		if(this.state.nextPageUrl === null){
			return (
				<View style={view}>
					<Text style={text} > No More Post</Text>
				</View>
			)
		}
		return this.state.loadMore ? <Loading/> : null
	}

	_renderHeader = () => {
		let{ logoImage, icon } = this.style
		return (
			<Header>
			<Left>
				<Button transparent>
				<Icon name='ios-camera-outline' style={icon}/>
				</Button>
			</Left>
			<Body>
				<Image
				source={require('../../assets/logo/logo-text.png')}
				style={logoImage}
				/>
			</Body>
			<Right>
				<Button transparent>
				<Icon name='ios-add' style={icon}/>
				</Button>
			</Right>
			</Header>
		)
	}

	_renderEmptyList = () => {
		let { centerContainer, emptyList: {text, image} } = this.style
		return (
			<TouchableWithoutFeedback style={centerContainer}>
				<View style={centerContainer}>
					<Icon name="ios-camera" style={image} />
					<Text style={text} >No photos</Text>
				</View>
			</TouchableWithoutFeedback>
		)
	}

	_renderPost = () => {
		let { loading, posts } = this.state
		let { container,centerContainer } = this.style
		if(loading){
			return <Loading/>
		}
		return (
			<KeyboardAwareFlatList
				style={container}
				contentContainerStyle={ posts.length ? null : centerContainer }
				data={this.state.posts}
				renderItem={({item}) => <Post {...item} /> }
				keyExtractor={(item, index) => `${index}-${item.type}-${item.id}`}
				ListFooterComponent={this._renderFooterList}
				ListEmptyComponent={this._renderEmptyList}
				refreshing={this.state.refreshing}
				onRefresh={this._refreshPost}
				onEndReached={this._loadMorePost}
				onEndReachedThreshold={2}
				onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
				scrollEnabled={true}
				removeClippedSubviews={false}
				keyboardShouldPersistTaps='never'
			/>
		)
	}

	render(){
		return (
			<UnsafeContainer>
				{this._renderHeader()}
				<SafeContainer>
					{this._renderPost()}
				</SafeContainer>
			</UnsafeContainer>
		)
	}
}

export default Home