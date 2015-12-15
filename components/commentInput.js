'use strict';

var React = require('react-native');
var apiList = require('../api');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
} = React;

var CommentInput = React.createClass({
	getInitialState: function() {
		return {
			text: false,
		};
	},

	postComment: function() {
		fetch(apiList.apiWrapper('comments', String(this.props.todo.id)), {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					mark: this.props.todo.id,
					comment: this.state.text,
					name: 'leixu',
				})
			})
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					response.json();
				} else {
					var error = new Error(response.statusText)
					error.response = response
					throw error
				}
			})
			.then((responseData) => {
				this.props.updateComment();
				this.clearInput();
			})
			.done();
	},

	clearInput: function() {
		this._textInput.setNativeProps({text: ''});
	},

	render: function() {
		return (
		<View style={styles.container}>
		<View style={styles.input}>
		<TextInput
		ref={component => this._textInput = component}
		onChangeText = {(text) => this.setState({text})}
		value = {this.state.text}
		placeholder = {'Your new comment...'} />
		</View>
		<View style = {styles.submit}>
		<TouchableHighlight
		onPress={this.postComment}>
		<Image
		  style={styles.image}
		  source={{uri: apiList.resourceWrapper('submit.png')}} />
		</TouchableHighlight>
        </View>
        </View>
		);
	},
});

var styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
	},
	input: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	submit: {
		position: 'absolute',
		width: 30,
		height: 30,
		bottom: 15,
		right: 10,
	},
	image: {
		width: 30,
		height: 30,
	},
});


module.exports = CommentInput;
