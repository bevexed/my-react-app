import React, {Component} from 'react';
import {connect} from 'react-redux'

import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";
import HeaderSelector from '../../components/header-selector/header-selector'
import {Redirect} from "react-router-dom";

import {updateUserData} from "../../redux/actions";

class LaobanInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    header: "",
    post: "",
    info: "",
    company: "",
    salary: ""
  };
  handelChange = (name, value) => {
    this.setState({
      [name]: value
    })
  };
  // 更新 header 状态
  setHeader = (header) => {
    this.setState({
      header
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
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder="请输入招聘职位" onChange={val => {
          this.handelChange('post', val)
        }}>招聘职位：</InputItem>
        <InputItem placeholder="请输入公司名称" onChange={val => {
          this.handelChange('company', val)
        }}>公司名称：</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => {
          this.handelChange('salary', val)
        }}>职位薪资：</InputItem>
        <TextareaItem title="职位要求："
                      rows={3}
                      onChange={val => {
                        this.handelChange('info', val)
                      }}
        />
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.users}),
  {updateUserData}
)(LaobanInfo)
