import React from 'react';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    PieChartOutlined,
    TeamOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import {
    NavLink
} from "react-router-dom";
import 'antd/dist/antd.css';
import logo from './../assets/logo.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

const LeftSider = () => {
    const role = useSelector(state => state.auth.role);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <NavLink to="/" activeClassName="active">
                    <div className="logo">
                        <img src={logo} />
                        {!collapsed && <span>Nhật ký GPXD</span>}
                    </div>
                </NavLink>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <NavLink to="/" activeClassName="active">
                            Trang chủ
                        </NavLink>
                    </Menu.Item>

                    {role == "Admin" &&
                        <SubMenu key="sub1" icon={<TeamOutlined />} title="Người dùng">
                            <Menu.Item key="2">
                                <NavLink to="/user" activeClassName="active">Danh sách</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to="/signup" activeClassName="active">Tạo tài khoản</NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to="/simpledata" activeClassName="active">Dữ liệu mẫu</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    }

                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Nhật ký kiểm tra">
                        <Menu.Item key="5">
                            <NavLink to="/project" activeClassName="active">Danh sách</NavLink>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink to="/project/add" activeClassName="active">Thêm mới</NavLink>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="7" icon={<LoginOutlined />}>
                        <NavLink to="/changepass" activeClassName="active">
                            Đổi mật khẩu
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
};

export default LeftSider;