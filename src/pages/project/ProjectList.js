import { Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
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
    }, []);

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    return (
        <>
            <Helmet>
                <title>Nhật ký kiểm tra trật tự xây dựng</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Nhật ký kiểm tra</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <TableProjects projects={projects} />
            </div>

        </>
    )
}

export default ProjectList