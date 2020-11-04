import React from 'react';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    NavLink
} from "react-router-dom";
import 'antd/dist/antd.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const LeftSider = () => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                    <img src="./logo.svg" />
                    {!collapsed && <span>Logo here</span>}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <NavLink to="/" activeClassName="active">
                            Trang chủ
                        </NavLink>
                    </Menu.Item>
                    {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <NavLink to="/signin" activeClassName="active">
                            SignIn
                        </NavLink>
                    </Menu.Item> */}
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Người dùng">
                        {/* <Menu.Item key="3">
                            <NavLink to="/signin" activeClassName="active">Đăng nhập</NavLink>
                        </Menu.Item> */}
                        <Menu.Item key="5">
                            <NavLink to="/user" activeClassName="active">Danh sách</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/signup" activeClassName="active">Tạo tài khoản</NavLink>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <NavLink to="/simpledata" activeClassName="active">Dữ liệu mẫu</NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Nhật ký kiểm tra">
                        <Menu.Item key="6">
                            <NavLink to="/project" activeClassName="active">Danh sách</NavLink>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink to="/project/add" activeClassName="active">Thêm mới</NavLink>
                        </Menu.Item>
                    </SubMenu>
                    {/* <Menu.Item key="9" icon={<FileOutlined />}>
                        Files
                    </Menu.Item> */}
                </Menu>
            </Sider>
        </>
    );
};

export default LeftSider;