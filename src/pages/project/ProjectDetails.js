import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Divider, Breadcrumb, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { NavLink, Redirect, useParams } from "react-router-dom";
import { getAProject, resetProject } from '../../store/actions/projectActions'

const ProjectDetails = (props) => {
    const dispatch = useDispatch();
    const projectId = useParams().id;
    const project = useSelector((state) => state.project.current);

    // load project
    useEffect(() => {
        dispatch(getAProject(projectId));

        return function cleanup() {
            dispatch(resetProject());
        }
    }, []);

    // check auth
    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    if (project) {
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
                        <b>Chủ hộ:</b> {project.owner}
                    </p>
                    <Divider />
                    <p>
                        <b>Content:</b> {project.content}
                    </p>
                    <Divider />
                    <p>
                        <b>Posted by:</b> {project.creatorFullName}
                    </p>
                    <Divider />
                    <p>
                        {/* {project.createdAt} */}
                    </p>
                </div>
            </>
        );
    }
    else {
        return (
            <div className="loading">
                <Spin style={{ marginRight: "10px" }} /> Đang kết nối hoặc dữ liệu không tồn tại ...
            </div>
        );
    }
};

export default ProjectDetails;