import React, {Component} from 'react';
import {connect} from 'react-redux'

import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";


class DashenInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  render() {
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder="请输入求职岗位">求职岗位：</InputItem>
        <InputItem placeholder="请输入个人介绍">个人介绍：</InputItem>
        <InputItem placeholder="请输入职位薪资">职位薪资：</InputItem>
        <TextareaItem title="职位要求："
                      rows={3}
        />
        <Button type="primary">保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(DashenInfo)
