import React from 'react';
import Navbar from './Navbar';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const TopHeader = () => {
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <div className="topbar">
                    <Navbar />
                </div>
            </Header>
        </>
    );
};

export default TopHeader;