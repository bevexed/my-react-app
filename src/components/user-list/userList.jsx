import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  WingBlank,
  WhiteSpace,
  Card,
} from "antd-mobile";

const Header = Card.Header;
const Body = Card.Body;

export default class UserList extends Component {

  render() {
    const {userList} = this.props;
    return (
      <WingBlank style={{padding:'60px 0'}}>
        {
          userList.map(user =>
            <div key={user._id}>
              <WhiteSpace/>
              <Card>
                <Header
                  thumb={require('../../components/header-selector/1.png')}
                  thumbStyle={{height:'40px'}}
                  extra={user.username}
                />
                <Body>
                {user.post ? <div>职位：{user.post}</div> : null}
                {user.company ? <div>公司：{user.company}</div> : null}
                {user.info ? <div>简介：{user.info}</div> : null}
                </Body>
              </Card>
            </div>)
        }
      </WingBlank>
    );
  }
}

UserList.propTypes = {
  userList: PropTypes.array.isRequired
};

