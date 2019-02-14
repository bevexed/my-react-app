import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TabBar} from "antd-mobile";
import {withRouter} from 'react-router-dom'
import '../../App.css';

class NavFoot extends PureComponent {
  render() {
    const {realNavList} = this.props;
    const path = this.props.location.pathname;
    return (
      <TabBar
        tabBarPosition={'bottom'}
      >
        {
          realNavList.map(nav =>
            <TabBar.Item
              key={nav.path}
              title={nav.text}
              icon={{uri: require(`./img/${nav.icon}.svg`)}}
              selectedIcon={{uri: require(`./img/${nav.icon}-select.svg`)}}
              selected={path === nav.path}
              onPress={() => this.props.history.replace(nav.path)}
            />
          )
        }
      </TabBar>
    );
  }
}

NavFoot.propTypes = {
  realNavList: PropTypes.array.isRequired
};

export default withRouter(NavFoot);
