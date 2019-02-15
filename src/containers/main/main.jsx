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
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Person from '../person/person'
import NotFound from '../../components/NotFound/404'
import NavFoot from '../../components/NavFoot/NavFoot'
import Chat from '../chat/chat'

import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {getRedirectTo} from "../../utils";
import {getUserData} from "../../redux/actions";

import Cookies from 'js-cookie'

import {NavBar} from "antd-mobile";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userId = Cookies.get('userid');
    const {_id} = this.props.user;
    if (userId && !_id) {
      this.props.getUserData()
    }
    getUserData()
  }

  realNavList = [];

  navList = [
    {
      path: '/laoban',
      component: Dashen,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
      type: 'dashen'
    }, {
      path: '/dashen',
      component: Laoban,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
      type: 'laoban'
    }, {
      path: '/message',
      component: Message,
      title: '信息列表',
      icon: 'message',
      text: '信息'
    }, {
      path: '/person',
      component: Person,
      title: '个人信息',
      icon: 'person',
      text: '个人信息'
    }
  ];

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

    const {navList} = this;
    const pathname = this.props.location.pathname;
    this.realNavList = navList.filter(nav => nav.type !== user.type);
    const currentNav = this.realNavList.find(nav => nav.path === pathname);
    return (
      <div style={{minHeight: '100vh'}}>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          {this.realNavList.map(nav => <Route path={nav.path} component={nav.component} key={nav}/>)}
          <Route path={'/laoban-info'} component={LaobanInfo}/>
          <Route path={'/dashen-info'} component={DashenInfo}/>
          <Route path={'/chat/:userid'} component={Chat}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFoot realNavList={this.realNavList}/> : null}

      </div>
    )
  }
}

export default connect(
  state => ({user: state.users}),
  {getUserData}
)(Main)
