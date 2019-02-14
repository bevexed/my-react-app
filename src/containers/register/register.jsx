/*
* 注册组件
* */
import React, {Component} from 'react';
import Logo from '../../components/logo/logo'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from "antd-mobile";
import {connect} from 'react-redux'
import {register} from "../../redux/actions";
import {Redirect} from "react-router-dom";

const ListItem = List.Item;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      type: ''
    };
  }

  register = () => {
    console.log(this.state);
    this.props.register(this.state)
  };
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val
    })
  };
  toLogin = () => {
    this.props.history.replace('/login')
  };

  render() {
    const {type} = this.state;
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
            {msg ? <div className='err-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem onChange={val => this.handleChange('password', val)} type="password">密码:</InputItem>
            <WhiteSpace/>
            <InputItem onChange={val => this.handleChange('password2', val)} type="password">确认密码:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型:</span> &nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio> &nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>
            </ListItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
          <WhiteSpace/>
          <Button onClick={this.toLogin}>已有账户</Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.users}), // 数据
  {register} // 函数
)(Register) // 组件
