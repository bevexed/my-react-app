import React, {Component} from 'react';
import {connect} from 'react-redux';
import './chat.less'

import {
  NavBar,
  List,
  InputItem
} from "antd-mobile";

const Item = List.Item;

class Chat extends Component {
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(Chat);
