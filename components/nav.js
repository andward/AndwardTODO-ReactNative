'use strict';

var React = require('react-native');
var apiList = require('../api');
var TodoPage = require('./todo');
var DonePage = require('./done');
var DetailPage = require('./detail');
var NewTodoPage = require('./newTodo');


const DRAWER_REF = 'drawer';
const NAV_NAME = {
  todo: "TODO",
  done: "DONE",
  detail: "Detail",
  newTodo: "New Todo",
  setting: "Setting"};

var {
　　AppRegistry,
　　View,
    ListView,
　　Navigator,
　　Text,
　　BackAndroid,
　　StyleSheet,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    Dimensions,
} = React;

var NavBar = React.createClass({

    getInitialState: function() {
      return ({
      title: null,
      });
    },

    configureScene: function(route){
      return Navigator.SceneConfigs.FadeAndroid;
    },

    renderScene: function(router, navigator){
      var Component = null;
      this._navigator = navigator;

      switch(router.name){
        case NAV_NAME.done:
          Component = DonePage;
          break;
        case NAV_NAME.todo: //default view
          Component = TodoPage;
          break;
        case NAV_NAME.detail:
          Component = DetailPage;
          break;
        case NAV_NAME.newTodo:
          Component = NewTodoPage;
          break;
      }

      return <Component 
      navigator={navigator} 
      todo={router.todo}/>
    },

    componentDidMount: function() {
      var navigator = this._navigator;
      BackAndroid.addEventListener('hardwareBackPress', function() {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
          }
          return false;
      });
    },

    componentWillUnmount: function() {
      BackAndroid.removeEventListener('hardwareBackPress');
    },

    switchNav: function(name) {
      this.setState({title: name});
      this._navigator.push({name: this.state.title});
      this.refs[DRAWER_REF].closeDrawer();
    },

    navView: function() {
      return (
        <View style = {styles.nav}>
          <View style = {styles.header}>
          <Text style = {styles.headerText}>ANDWARD</Text>
          <Text style = {styles.headerText}>.TODO</Text>
          </View>
          <View style = {styles.item}>
            <Text style = {styles.text}
            onPress= {() => {this.switchNav(NAV_NAME.todo);}}
            >TODO</Text>
          </View>
          <View style = {styles.item}>
            <Text style = {styles.text}
            onPress= {() => {this.switchNav(NAV_NAME.done);}}
            >DONE</Text>
          </View>
          <View style = {styles.item}>
          <Text style = {styles.text}>SETTINGS</Text></View>
        </View>);
    },

    render: function() {
      var title = this.state.title ? this.state.title : NAV_NAME.todo;
      return (
          <DrawerLayoutAndroid
          ref={DRAWER_REF}
          drawerWidth={Dimensions.get('window').width - 56}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.navView}>
          <View style = {styles.container}>
          <ToolbarAndroid
            navIcon={{uri: apiList.resourceWrapper('menu_white.png')}}
            title={title}
            titleColor="white"
            style={styles.toolbar}
            onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
            onActionSelected={this.onActionSelected} />
          <Navigator 
          initialRoute={{name: NAV_NAME.todo}}
          configureScene={this.configureScene}
          renderScene={this.renderScene} />
          </View>
          </DrawerLayoutAndroid>
        );
    }
});

var styles = StyleSheet.create({
  nav: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 50,
  },
  header: {
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerText: {
    color: '#4285f4',
    fontSize: 30,
    textAlign: 'left',
  },
  container: {
     flex: 1,
     flexDirection: 'column',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#4285f4',
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'left',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f5f5f5',
  },
  text: {
    fontSize: 15,
  },
});

module.exports = NavBar;
