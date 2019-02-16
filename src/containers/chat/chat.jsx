import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendMsg} from "../../redux/actions";

import './chat.css'
import '../../App.css'


import {
  NavBar,
  List,
  InputItem
} from "antd-mobile";

const Item = List.Item;

class Chat extends Component {
  state = {
    content: ''
  };

  handSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content;
    if (content) {
      this.props.sendMsg({to, from, content});

      this.setState({content: ''})
    }
  };

  render() {
    return (
      <div className="chat-page">
        <NavBar>aa</NavBar>
        <List>
          <Item thumb={require('../../components/header-selector/1.png')}>你好</Item>
          <Item thumb={require('../../components/header-selector/1.png')}>你好</Item>
          <Item thumb={require('../../components/header-selector/1.png')}>你好</Item>
          <Item
            className='chat-me'
            extra={'我'}
          >你好</Item>
        </List>
        <div className={"am-tabs-tab-bar-wrap"}>
          <InputItem
            placeholder={"请输入"}
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            extra={
              <span onClick={() => this.handSend()}>发送</span>
            }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users
  };
}

export default connect(
  mapStateToProps,
  {sendMsg}
)(Chat);
