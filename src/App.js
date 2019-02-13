import './App.css';
import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import store from './redux/store'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <HashRouter>
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <Route component={Main}/> {/* 默认组件*/}
            </Switch>
          </HashRouter>
        </Provider>

      </div>
    );
  }
}

export default App;
