import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetUser} from "../../redux/actions";

import Cookies from 'js-cookie';


import {
  Result,
  List,
  WhiteSpace,
  Button,
  Modal
} from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

const alert = Modal.alert;

class Person extends Component {
  loginOut = () => {
    const alertInstance = alert('退出', '确定退出吗???', [
      {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
      {
        text: '确定', onPress: () => {
          Cookies.remove('userid');
          this.props.resetUser();
        }
      },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };

  render() {
    const {username, type, header, company, post, salary, info} = this.props.user;
    return (
      <div>
        <Result
          img={<img src={require('../../components/header-selector/1.png')} style={{width: 50}} alt={company}/>}
          title={username}
          message={type}
        />
        <WhiteSpace/>

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            <Brief>薪资：{salary}</Brief>
            <Brief>头像：{header}</Brief>
          </Item>
        </List>
        <WhiteSpace/>

        <Button type={'warning'} onClick={() => this.loginOut()}>退出</Button>
      </div>
    )
      ;
  }
}

function mapStateToProps(state) {
  return {
    user: state.users
  };
}

export default connect(
  mapStateToProps,
  {resetUser}
)(Person);
