import React from 'react';
import { Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />
    return (
        <>
            <Helmet>
                <title>AntDesign | Home</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Hello World...
            </div>
        </>
    );
};

export default HomePage;