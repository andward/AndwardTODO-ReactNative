'use strict';

var React = require('react-native');
var apiList = require('../api');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var NewTodoPage = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
            }),
			todoText: false,
			tagText: false,
		};
	},

	fetchTags: function() {
		fetch(apiList.TAGS_API, {
			headers: {
				'Authorization': this.props.token,
			},
		})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData),
            });
        })
        .done();
	},

	componentDidMount: async function() {
		await this.fetchTags();
	},

	submitNewTodo: function() {
		fetch(apiList.TODO_API, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': this.props.token,
			},
			body: JSON.stringify({
				task: this.state.todoText,
				tag: this.state.tagText,
				name: 'leixu',
			})
		})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				this.props.navigator.push({
					name: 'TODO'
				});
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		})
	},

	renderTag: function(item) {
		return (
			<TouchableNativeFeedback
			onPress={() => this.onSelectTag(item)}>
			<View style = {styles.tagItem}>
			<Text>{item.tag}</Text>
			</View>
			</TouchableNativeFeedback>
			);
	},

	onSelectTag: function(item) {
		this.setState({tagText:item.tag});
		this._tagInput.setNativeProps({text: item.tag});
	},

	clearInput: function() {
		this._todoInput.setNativeProps({text: ''});
		this._tagInput.setNativeProps({text: ''});
	},

	render: function() {
		return (
			<View style = {styles.container}>
			<View style = {styles.input}>
			<TextInput 
			ref={component => this._todoInput = component}
		    onChangeText = {(todoText) => this.setState({todoText})}
		    value = {this.state.todoText}
		    multiline = {true}
		    placeholder = {'Your New Todo'} />
		    </View>
			<View style = {styles.input}>
			<TextInput 
			ref={component => this._tagInput = component}
		    onChangeText = {(tagText) => this.setState({tagText})}
		    value = {this.state.tagText}
		    multiline = {true}
		    placeholder = {'Add New Tag -OR- Pick From Following'} />
		    </View>
		    <ScrollView style = {styles.scroll}>
            <ListView
            style={styles.selector}
            dataSource = {this.state.dataSource}
            renderRow = {this.renderTag} />
            </ScrollView>
            <TouchableNativeFeedback
            onPress={this.submitNewTodo}>            
            <View style={styles.submit}>
            <Text style={styles.submitText}>
            SUBMIT
            </Text>
            </View>
            </TouchableNativeFeedback>
			</View>
			)
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    input: {
    	paddingLeft: 15,
    	paddingRight: 15,
    },
    scroll: {
    	height: 200,
    },
    selector: {
    	flex: 1,
    	height: 200,
    },
    tagItem: {
    	flex: 1,
    	paddingTop: 15,
    	paddingBottom: 15,
    	justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#f5f5f5',
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

module.exports = NewTodoPage;
