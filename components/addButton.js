'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var AddButton = React.createClass({
	render: function() {
		return (
			<View style = {styles.add}>
            <Text style = {styles.addText}>+</Text>
            </View>
			);
	},
});

var styles = StyleSheet.create({
  add: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#C74433',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontSize: 22,
  },
});

module.exports = AddButton;
