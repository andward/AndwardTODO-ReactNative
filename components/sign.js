'use strict';

var React = require('react-native');
var apiList = require('../api');

var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} = React;

var SignInPage = React.createClass({
	getInitialState: function() {
		return {
			username: false,
			password: false,
		};
	},
		
	signIn: function() {
		fetch(apiList.SIGN_IN, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
                this.clearInput();
			}
		})
		.then((repsonseData) => {
			this.props.updateToken(repsonseData.token);
			this.props.navigator.push({
				name: 'TODO'
			});
		});
	},

	clearInput: function() {
		this._uernameInput.setNativeProps({text: ''});
		this._pwdInput.setNativeProps({text: ''});
	},

	render: function() {
		return (
			<View style = {styles.container}>
			<View style = {styles.logo}>
			<Text style = {styles.logoText}>
			ANDWARD.TODO
			</Text>
			</View>
			<View style = {styles.input}>
			<TextInput
			ref={component => this._uernameInput = component}
		    onChangeText = {(username) => this.setState({username})}
		    value = {this.state.username}
		    multiline = {true}
		    placeholder = {'Your Account'} />
		    </View>
			<View style = {styles.input}>
			<TextInput
			ref={component => this._pwdInput = component}
		    onChangeText = {(password) => this.setState({password})}
		    value = {this.state.password}
		    multiline = {true}
		    placeholder = {'Your Password'} />
		    </View>
            <TouchableNativeFeedback
            onPress={this.signIn}>            
            <View style={styles.submit}>
            <Text style={styles.submitText}>
            SIGN IN
            </Text>
            </View>
            </TouchableNativeFeedback>
			</View>
		);
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logo: {
		height:200,
		justifyContent: 'center',
        alignItems: 'center',
	},
	logoText: {
		color: '#4285f4',
        fontSize: 30,
	},
    input: {
    	paddingLeft: 15,
    	paddingRight: 15,
    },
    submit: {
    	position: 'absolute',
    	left: 0,
    	right: 0,
    	bottom: 0,
    	justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#C74433',
    },
    submitText: {
    	color: 'white',
    },
});

module.exports = SignInPage;