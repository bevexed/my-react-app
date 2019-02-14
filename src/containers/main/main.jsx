/*
* 1. 实现自动登录
*   1. cookie 中有 userId ，发请求获取对应的 user
*   2. cookie 中没有 userId 跳转到 login 页面
* 2. 如果已经登录
*   1，根据 user 和 header 跳转到相应页面
* */
import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {getRedirectTo} from "../../utils";

import Cookies from 'js-cookie'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 读取 cookie 中的 userId

    const userId = Cookies.get('userid');
    if (!userId) {
      return <Redirect to={'/login'}/>
    }

    const {user} = this.props;
    if (!user._id) {
      return null
    } else {
      let path = this.props.location.pathname;
      if (path === '/') {
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}/>
      }
    }
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

export default connect(
  state => ({user: state.users}),
)(Main)
