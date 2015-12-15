'use strict';

var React = require('react-native');
var apiList = require('../api');
var CommentList = require('./commentList');
var CommentInput = require('./commentInput');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var DetailPage = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	componentDidMount: function() {
		this.fetchData();
	},

	fetchData: function() {
		fetch(apiList.apiWrapper('comments', String(this.props.todo.id)))
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	},

	updateComment: function() {
		this.fetchData()
	},

	render: function() {
		return (
			<View style={styles.container}>
		    <View style={styles.tag}>
			<Text style={styles.tagName}>{this.props.todo.tag}</Text>
			</View>
			<View style={styles.task}>
			<Text>{this.props.todo.task}</Text>
			</View>
			<View style={styles.cell}>
			<View style={styles.name}>
			<Text>{this.props.todo.name}</Text>
			</View>
			<View style={styles.time}>
			<Text>{this.props.todo.time}</Text>
			</View>
			</View>
			<View style={styles.header}>
			<Text style={styles.headerText}>Comments</Text>
			</View>
			<CommentList 
			dataSource={this.state.dataSource} />
			<CommentInput
			todo={this.props.todo} 
			updateComment={this.updateComment} />
			</View>
			);
	},
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cell: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  task: {
  	paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingLeft: 20,
    paddingRight: 20,
  },
  tag: {
  	paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingLeft: 20,
  },
  tagName: {
  	color: '#C74433',
  },
  time: {
  	paddingRight: 20,
  },
  name: {
  	flex: 1,
  },
  header: {
  	paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
  	fontSize: 11,
  },
});


module.exports = DetailPage;