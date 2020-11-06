import React from 'react';
import { Layout } from 'antd';
import {
    Route
} from "react-router-dom";
import LeftSider from './../components/LeftSider';
import TopHeader from './../components/TopHeader';
import MainFooter from './../components/MainFooter';
const { Content } = Layout;

const CommonLayout = ({ component: Component, ...rest }) => {
    console.log("rest:", rest);
    return (
        <Route {...rest}>
            <Layout style={{ minHeight: '100vh' }}>
                <LeftSider />
                <Layout className="site-layout">
                    <TopHeader />
                    <Content style={{ margin: '0 16px' }}>
                        <Component />
                    </Content>
                    <MainFooter />
                </Layout>
            </Layout>
        </Route>
    );
};

export default CommonLayout;