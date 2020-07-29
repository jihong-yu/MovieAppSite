import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';

const RightMenu = (props) => {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Logout Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login" style={{ display: 'inline-block' }}>
            Sign in
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register" style={{ display: 'inline-block' }}>
            Sign up
          </a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler} style={{ display: 'inline-block' }}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default withRouter(RightMenu);
