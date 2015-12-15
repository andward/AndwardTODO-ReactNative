'use strict';

var React = require('react-native');
var apiList = require('../api');
var CommentInput = require('./commentInput');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var CommentList = React.createClass({
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },

  renderComments: function(comment) {
  	return (
  		<View style = {styles.container}>
  		<View style = {styles.comment}>
  		<Text style = {styles.commentText}>{comment.comment}</Text>
  		</View>
  		<View style = {styles.name}>
  		<Text style = {styles.nameText}>{comment.name}</Text>
  		</View>
  		</View>
  	);
  },

  render: function() {
    return (
      <View>
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderComments}
        style={styles.listView} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingTop: 10,
    paddingBottom: 10,
  },
  comment: {
  	flex: 1,
  	paddingLeft: 20,
  },
  name: {
  	paddingLeft: 10,
  	paddingRight: 20,
  },
  commentText: {
  	fontSize: 11,
  },
  nameText: {
  	fontSize: 11,
  },
});

module.exports = CommentList;