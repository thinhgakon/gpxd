import logo from './logo.svg';
import { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import HomePage from './pages/home/HomePage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <img src="./logo.svg" />
            {!collapsed && <span>Logo here</span>}
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <NavLink to="/signin" activeClassName="active">
                SignIn
              </NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">
                <NavLink to="/signin" activeClassName="active">SignIn</NavLink>
              </Menu.Item>
              <Menu.Item key="4">
                <NavLink to="/signup" activeClassName="active">SignUp</NavLink>
              </Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2020 Created by Thinh Nguyen Xuan</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
