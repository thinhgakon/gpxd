import logo from './logo.svg';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Layout, Menu } from 'antd';
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
  NavLink
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import HomePage from './pages/home/HomePage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ProjectList from './pages/project/ProjectList';
import CreateProject from './pages/project/CreateProject';
import ProjectDetails from './pages/project/ProjectDetails';
import Navbar from './components/Navbar';
import EditProject from './pages/project/EditProject';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  useFirestoreConnect(['projects'])
  const projects = useSelector(state => state.firestore.ordered.projects);

  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  const dispatch = useDispatch();
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
              <Menu.Item key="5">List</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Projects">
              <Menu.Item key="6">
                <NavLink to="/project" activeClassName="active">List</NavLink>
              </Menu.Item>
              <Menu.Item key="8">
                <NavLink to="/project/add" activeClassName="active">Add new</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <div className="topbar">
              <Navbar />
            </div>
          </Header>
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
              <Route exact path="/project">
                <ProjectList projects={projects} />
              </Route>
              <Route path="/project/add" component={CreateProject} />
              <Route path="/project/edit/:id" component={EditProject} />
              <Route path='/project/:id' component={ProjectDetails} />
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
