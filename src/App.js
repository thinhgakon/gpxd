import { Layout } from 'antd';
import {
  BrowserRouter,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import LeftSider from './components/LeftSider';
import TopHeader from './components/TopHeader';
import MainFooter from './components/MainFooter';
import MainRoutes from './components/MainRoutes';
const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <LeftSider />
        <Layout className="site-layout">
          <TopHeader />
          <Content style={{ margin: '0 16px' }}>
            <MainRoutes />
          </Content>
          <MainFooter />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
