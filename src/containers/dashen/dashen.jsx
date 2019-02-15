import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/actions";

import UserList from '../../components/user-list/userList'

class dashen extends Component {
  componentDidMount() {
    // 获取 UserList
    this.props.getUserList(this.props.user.type)
  }

  render() {
    return (
      <div>

        <UserList userList={this.props.userList}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList : state.userList,
    user : state.users,
  };
}

export default connect(
  mapStateToProps,
  {getUserList}
)(dashen);
