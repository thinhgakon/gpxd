import { Breadcrumb, Button, Space } from 'antd';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import {
    PlusOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
import { loadProject, resetProject } from '../../store/actions/projectActions';
import TableProjects from './components/TableProjects';

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.project.list);
    const role = useSelector(state => state.auth.role);

    useEffect(() => {
        dispatch(loadProject(role));
        return function cleanup() {
            dispatch(resetProject());
        }
    }, [role]);

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    return (
        <>
            <Helmet>
                <title>Nhật ký kiểm tra trật tự xây dựng</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <NavLink to="/">Trang chủ</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Nhật ký kiểm tra</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Space style={{ marginBottom: 16 }}>
                        <Button style={{ color: "red" }} type="dashed" block icon={<PlusOutlined />}>
                            <NavLink to="/project/add" activeClassName="active">Thêm mới</NavLink>
                        </Button>
                    </Space>
                </div>
                <TableProjects projects={projects} />
            </div>

        </>
    )
}

export default ProjectList