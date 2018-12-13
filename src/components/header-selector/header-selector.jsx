import React, {Component} from 'react';
import {Grid, List} from "antd-mobile";
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }
  state = {
    icon: null // 默认没有值
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: i + 1,
        icon: require(`./1.png`) // 不能使用 import
      })
    }
  }

  handleClick = ({text,icon}) => {
    // 更新当前组件状态
    this.setState({icon})
    // 调用函数更新父组件状态
    this.props.setHeader(text)
  }

  render() {

    const {icon} = this.state

    const listHeader = !icon?'请选择头像':(
      <div>
        已选择头像：<img src={icon} alt=""/>
      </div>
    )

    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              onClick={this.handleClick}
        />
      </List>
    )
  }
}
