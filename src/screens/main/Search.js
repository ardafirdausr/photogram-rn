import React, { PureComponent } from 'react'
import { FlatList, Image, Alert, View, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Header, Item, Button, Text, Icon, Input, Card, CardItem, Thumbnail } from 'native-base'

import { SafeContainer, UnsafeContainer, Loading, GridPost } from '../../components'
import serverApi from '../../service/serverAPI'

export default class Search extends PureComponent{

	static navigationOptions = ({
		navigation: {navigate}, // basic navigation
		screenProps, //from single route
		navigationOptions: {inactiveTintColor} //from second parameter parent
	}) => ({
		tabBarIcon: ({focused, tintColor}) => {
			color = focused ? 'black' : '#9e9e9e'
			return (
				<Icon
				  name='ios-search'
				  style={{
					fontSize:24,
					color
				  }}/>
		)},
		tabBarLabel: 'Search',
		tabBarOnPress: () => navigate('Search'),
	})

	state = {
		search: '',
		searchFocus: false,
		posts: [],
		fetchPostSize: 20,
		numColumns: 3,
		nextPageUrl: '',
		loadPostsFlag: true,
		loading: true,
		refreshing: false,
		loadMore: false,
	}

	style = {
		container: {
			flex: 1
		},
		centerContainer: {
			flex: 1,
			alignSelf: 'stretch',
			alignItems: 'center',
			justifyContent: 'center',
		},
		emptyList: {
			text: {
				color : '#aaa',
			},
			icon: {
				fontSize: 50,
				color: '#aaa',
				marginBottom: 10
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

	componentDidMount(){
		this._fetchPost()
	}

	_refreshPost = () => {
		this.setState(
			{ ...this.state, refreshing: true},
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

	_fetchPost = (url = 'posts', add = false ) => {
		if(this.state.loadPostsFlag){
			this.setState(
				{...this.state, loadPostsFlag: false},
				() => {
					serverApi.get(url, {params: {size: this.state.fetchPostSize}})
						.then(({data: {
							links: {next: nextPageUrl},
							data: posts
						}}) => {
							posts = add ? [...this.state.posts, ...posts] : posts
							this.setState({
								...this.state,
								loading: false,
								refreshing: false,
								loadPostsFlag: true,
								nextPageUrl,
								posts
							})
						})
						.catch(() => {
							try{
								this.setState({
									...this.state,
									loading: false,
									refreshing: false,
									loadMore: false,
									loadFlag: true,
								})
								if(this.state.nextPageUrl !== null) Alert.alert('Failed Retrive data')
							}
							catch(e){
								Alert.alert('Connection timeout')
							}
						})
				}
			)
		}
	}

	_fetchSearchResult = () => {

	}

	_renderFooterList = () => {
		let { footerList: { text, view }} = this.style
		let { loadMore } = this.state
		if(this.state.nextPageUrl === null){
			return (
				<View style={view}>
					<Text style={text} > No More Post</Text>
				</View>
			)
		}
		return loadMore ? <Loading/> : null
	}

	_renderPost = () => {
		let { loading, posts, numColumns } = this.state
		let { centerContainer } = this.style
		if(loading){
			return <Loading/>
		}
		return (
			<FlatList
				data={posts}
				numColumns={numColumns}
				contentContainerStyle={ posts.length ? null : centerContainer }
				renderItem={ ({item}) => (
					<GridPost
						image={item.image}
						column={numColumns}
						margin={1}
						/>
				)}
				keyExtractor={ (item, index) => `${index} - ${item.image}` }
				ListEmptyComponent={this._renderEmptyList}
				ListFooterComponent={this._renderFooterList}
				refreshing={this.state.refreshing}
				onRefresh={this._refreshPost}
				onEndReached={this._loadMorePost}
				onEndReachedThreshold={9}
				removeClippedSubviews={false}
				onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
				shouldItemUpdate={(props,nextProps)=> props.item!==nextProps.item  }
				getItemLayout={(data, index) => ({length: 12, offset: 12 * index, index})}
				scrollEnabled={true}
				/>
		)
	}

	_renderEmptyList = () => {
		let { centerContainer, emptyList: {text, icon} }  = this.style
		return (
			<View style={centerContainer}>
				<Icon name="ios-camera" style={icon} />
				<Text style={text}>No photos</Text>
			</View>
		)
	}

	_renderScreen = () => {
		return this._renderPost()
	}

	_renderHeader = () => {
		return (
			<Header searchBar rounded>
			<Item>
				<Icon name='ios-search'/>
				<Input
				autoCapitalize='none'
				clearButtonMode='always'
				placeholder='Search...'
				value={this.state.search}
				onChange={(value) => this._stateOnChange('search', value)}
				/>
			</Item>
			<Button transparent>
				<Text>Search</Text>
			</Button>
			</Header>
		)
	}

	_stateOnChange = (key, value) => {
		this.setState({...this.state, [key]: value})
	}

	render(){
		return (
			<UnsafeContainer>
				{this._renderHeader()}
				<SafeContainer>
					{this._renderScreen()}
				</SafeContainer>
			</UnsafeContainer>
		)
	}
}