'use strict';

var React = require('react-native');
var apiList = require('../api');
var TodoItem = require('./todoItem');
var Detail = require('./detail');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var DonePage = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(apiList.DONE_API)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderDone}
        style={styles.listView} />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },

  selectTodo: function(todo) {
    this.props.navigator.push({
      title: todo.task,
      name: 'Detail',
      todo: todo,
    });
  },

  renderDone: function(todo) {
    return (
      <TodoItem 
      onSelect={() => this.selectTodo(todo)}
      todo={todo}/>
    );
  },
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: 'white',
    marginTop: 2,
  },
});

module.exports = DonePage;