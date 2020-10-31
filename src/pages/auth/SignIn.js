import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';

const SignIn = () => {
    return (
        <>
            <Helmet>
                <title>AntDesign | SignIn</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>SignIn</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Bill is a cat.
              </div>
        </>
    );
};

export default SignIn;