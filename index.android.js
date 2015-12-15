/**
 * ReactTODO
 *
 */
'use strict';

var React = require('react-native');
var AppMain = require('./components/nav');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var App = React.createClass({
    
  render: function() {
    return (            
      <View style={{ flex: 1 }}>
        <AppMain />
      </View>
    );
  }
});

AppRegistry.registerComponent('ReactTODO', () => App);

