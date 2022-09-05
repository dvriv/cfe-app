import React, { Component } from 'react';
import { Input, Label, Menu, Header} from 'semantic-ui-react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const MainSideNav = () => {
  return (
    <Menu vertical size="large">
      <Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          name="Home"
        />
        <Header>Pasivos</Header>
        <Menu.Item
          as={Link}
          to="/pasivos"
          name="Pasivos"
        />
        <Menu.Item
          as={Link}
          name="Centro de Costos"
          to="/centroscosto"
        />
        <Menu.Item
          as={Link}
          name="Configuracion"
          to="/configuracion"
        />
      </Menu.Item>
    </Menu>
  );
};

export default MainSideNav;
