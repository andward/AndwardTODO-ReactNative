'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
} = React;

var TodoItem = React.createClass({

	render: function() {
		return (
		<View {...this.props}>
		<TouchableNativeFeedback onPress={() => this.props.onSelect()}>
			<View style={styles.container}>
            <View style={styles.cell}>
            <Text style={styles.task}>{this.props.todo.task}</Text>
            </View>
            <View style={styles.tag}>
			<Text style={styles.tagText}>{this.props.todo.tag}</Text>
            </View>
            </View>
        </TouchableNativeFeedback>
        </View>
		);
	},
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
  },
  cell: {
    flex: 1,
  },
  tag: {
  	paddingRight: 20,
  	paddingLeft: 5,
  },
  tagText: {
  	color: '#C74433',
  },
  task: {
    textAlign: 'left',
  },
});

module.exports = TodoItem;