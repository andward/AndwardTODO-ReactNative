'use strict';

var React = require('react-native');
var apiList = require('../api');
var TodoItem = require('./todoItem');
var Detail = require('./detail');
var AddButton = require('./addButton');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var TodoPage = React.createClass({
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
    fetch(apiList.TODO_API)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
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

  renderTODO: function(todo) {
    return (
      <TodoItem 
      onSelect={() => this.selectTodo(todo)}
      todo={todo}/>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderTODO}
        style = {styles.listView} />
      <AddButton />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
    backgroundColor: 'white',
  },
});

module.exports = TodoPage;