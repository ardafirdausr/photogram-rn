import React, { Component } from 'react';
import { Image } from 'react-native';
import Input from '../../components/Input'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class Post extends Component {
    state = {
        comment: '',
        like: false,
    }

    _commentOnChange = (value) => {
        this.setState({...this.state, comment: value})
    }

    render(){
        const {
            avatar,
            username,
            location,
            image,
            caption,
            createdAt,
            total_like,
            total_comment
        } = this.props
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: avatar}} />
                        <Body>
                            <Text>{username}</Text>
                            <Text note>{location}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: image}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumb-up" />                
                        </Button>
                        <Button transparent>
                            <Icon active name="comments-o" />                
                        </Button>
                        <Button transparent>
                            <Icon active name="share-2" />                
                        </Button>
                    </Left>            
                    <Right>
                        <Text>createdAt</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Text>{caption}</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: avatar}} />
                        <Input 
                            value={this.state.comment}
                            onChangeText={this._commentOnChange}
                            placeholder="Add Comment ...."
                            
                        />
                    </Left>
                </CardItem>
            </Card>
        )
    }
}


