/*
* 登录组件
* */
import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      <Switch>
        <Route path={'/laoban-info'} component={LaobanInfo}/>
        <Route path={'/dashen-info'} component={DashenInfo}/>
      </Switch>
      </div>
    )
  }
}
