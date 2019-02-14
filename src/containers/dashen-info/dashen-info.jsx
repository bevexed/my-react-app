import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import {updateUserData} from "../../redux/actions";
import {Redirect} from "react-router-dom";


class DashenInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  };

  handelChange = (name, val) => {
    this.setState({
      [name]: val
    })
  };

  save = () => {
    this.props.updateUserData(this.state)
  };

  render() {
    const {header, type} = this.props.user;
    if (header) {
      const path = type === 'dashen' ? '/dashen' : '/laoban';
      return <Redirect to={path}/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder="请输入求职岗位" onChange={val => this.handelChange('post', val)}>求职岗位：</InputItem>
        <InputItem placeholder="请输入个人介绍" onChange={val => this.handelChange('company', val)}>个人介绍：</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => this.handelChange('salary', val)}>职位薪资：</InputItem>
        <TextareaItem title="职位要求："
                      rows={3}
                      onChange={val => this.handelChange('info', val)}
        />
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.users}),
  {updateUserData}
)(DashenInfo)
