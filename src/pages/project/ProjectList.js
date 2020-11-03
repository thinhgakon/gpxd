import { Breadcrumb } from 'antd';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import TableProjects from './components/TableProjects';

import { useFirestoreConnect } from 'react-redux-firebase';

const ProjectList = () => {
    useFirestoreConnect(['projects'])
    const projects = useSelector(state => state.firestore.ordered.projects);
    return (
        <>
            <Helmet>
                <title>GPXD | Danh sách</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Sai phạm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
                <TableProjects projects={projects} />
            </div>

        </>
    )
}

export default ProjectList