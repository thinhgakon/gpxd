import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Breadcrumb, Button, Space } from 'antd';
import { Helmet } from 'react-helmet';
import { NavLink } from "react-router-dom";
import { useFirestoreConnect } from 'react-redux-firebase';
import { removeAllProjects, addSimpleProjects } from './../store/actions/projectActions';

const SimpleData = () => {
    const dispatch = useDispatch();
    useFirestoreConnect(['projects'])
    const projects = useSelector(state => state.firestore.ordered.projects);

    const onRemoveProjects = () => {
        dispatch(removeAllProjects(projects));
    };

    const onAddSimpleProjects = () => {
        dispatch(addSimpleProjects());
    };

    return (
        <>
            <Helmet>
                <title>AntDesign | Product Details</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <NavLink to="/" activeClassName="active">Trang chủ</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to="/project" activeClassName="active">Danh sách sai phạm</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <p>
                    <Button danger style={{ marginRight: "10px" }} type="dashed">Xóa users</Button>
                    <Button type="dashed">Tạo users mẫu</Button>
                </p>
                <Divider orientation="left" plain>Users</Divider>
                <p>
                    <Button danger style={{ marginRight: "10px" }} onClick={onRemoveProjects} type="dashed">Xóa Projects</Button>
                    <Button onClick={onAddSimpleProjects} type="dashed">Tạo Projects mẫu</Button>
                </p>
                <Divider orientation="left" plain>Projects</Divider>
            </div>
        </>
    );
};

export default SimpleData; 