import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendMsg,readMsg} from "../../redux/actions";

import './chat.css'
import '../../App.css'


import {
  NavBar,
  List,
  Icon,
  InputItem
} from "antd-mobile";

const Item = List.Item;

class Chat extends Component {
  state = {
    content: ''
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentWillUnmount() {

    const to = this.props.user._id;
    const from = this.props.match.params.userid;
    this.props.readMsg(from,to);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(0, document.body.scrollHeight)
  }

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
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;
    const meId = user._id;
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join('_');
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
    return (

      <div className="chat-page">
        <NavBar
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.goBack()}
        >{users[targetId] ? users[targetId].username : null}</NavBar>
        <List>
          {
            msgs.map(msg => {
              if (meId === msg.from) {
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra={'我'}
                  >{msg.content}</Item>
                )
              } else {
                return <Item key={msg._id} thumb={require('../../components/header-selector/1.png')}>{msg.content}</Item>
              }
            })
          }


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
    user: state.users,
    chat: state.chat
  };
}

export default connect(
  mapStateToProps,
  {sendMsg,readMsg}
)(Chat);
