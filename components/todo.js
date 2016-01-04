'use strict';

var React = require('react-native');
var apiList = require('../api');
var TodoItem = require('./todoItem');
var Detail = require('./detail');
var AddButton = require('./addButton');

var {
  AppRegistry,
  AsyncStorage,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
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

  componentDidMount: async function() {
    await this.props.getToken();
    await this.fetchData();
  },

  fetchData: function() {
    fetch(apiList.TODO_API, {
        headers: {
          'Authorization': this.props.token,
        }
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          this.props.authFail();
        }
      })
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      });
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

  redirectToNewTodo: function() {
    this.props.navigator.push({
      name: 'New Todo',
    });
  },

  renderTodo: function(todo) {
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
        renderRow = {this.renderTodo}
        style = {styles.listView} />
      <AddButton onClick={() => this.redirectToNewTodo()}/>
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