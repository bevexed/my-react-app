/*
* 登录组件
* */
import React, {Component} from 'react';
import Logo from '../../components/logo/logo'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from "antd-mobile";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    toRegister = () =>{
        this.props.history.replace('/register')
    }
    render() {
        return (
            <div>
                <NavBar>我的第一个REACT项目</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem type="password">密码:</InputItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </WingBlank>
            </div>)
    }
}
