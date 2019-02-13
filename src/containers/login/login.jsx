/*
* 登录组件
* */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import {login} from "../../redux/actions";
import Logo from '../../components/logo/logo'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from "antd-mobile";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toRegister = () => {
    this.props.history.replace('/register')
  };
  toLogin = () => {
    console.log(this.state);
    this.props.login(this.state)
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  };

  render() {
    const {msg, redirectTo} = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>我的第一个REACT项目</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={val => this.handleChange('password', val)}>密码:</InputItem>
            <WhiteSpace/>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.toLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.toRegister}>还没有账户</Button>
        </WingBlank>
      </div>)
  }
}

export default connect(
  state => ({user: state.users}),
  {login}
)(Login)
