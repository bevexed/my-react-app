import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List, Badge} from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {

  // 对 chatMsgs 安 chat_id 进行分组，并得到每个组的 LastMsg 组成的数组
  getLastMsgs = (chatMsgs, userid) => {
    // 1.找出每个聊天的 LastMSg
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
      if (msg.to === userid && !msg.read) {
        msg.unReadCount = 1
      } else {
        msg.unReadCount = 0
      }

      const chatId = msg.chat_id;
      let lastMsg = lastMsgObjs[chatId];
      if (!lastMsg) {
        lastMsgObjs[chatId] = msg
      } else {
        const unReadCount = lastMsg.unReadCount + msg.unReadCount
        if (msg.create_time > lastMsg.create_time) {
          lastMsgObjs[chatId] = msg;
        }
        lastMsgObjs[chatId].unReadCount = unReadCount
      }
    })

    // 2. 得到所有 LastMsg 组成の数组
    const lastMsgs = Object.values(lastMsgObjs);

    // 3.对数组进行排序
    lastMsgs.sort((m1, m2) => m2.create_time - m1.create_time);

    console.log(lastMsgs);

    return lastMsgs
  };

  render() {
    const {user} = this.props;
    const {users, chatMsgs} = this.props.chat;

    const lastMsgs = this.getLastMsgs(chatMsgs,user._id);

    return (
      <div>
        <List>
          {
            lastMsgs.map(msg =>
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require('../../components/header-selector/1.png')}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${msg.to === user._id ? msg.from : msg.to}`)}
              >{msg.content}
                <Brief>{users[msg.to === user._id ? msg.from : msg.to].username}</Brief>
              </Item>
            )
          }


        </List>
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
)(Message);
