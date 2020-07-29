import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = (props) => {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/" style={{ display: 'inline-block' }}>
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite" style={{ display: 'inline-block' }}>
          Favorite
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
