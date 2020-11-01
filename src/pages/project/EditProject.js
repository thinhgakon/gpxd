import {
    Form,
    Input,
    Button,
    Breadcrumb
} from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { updateProject } from '../../store/actions/projectActions'
import { useFirestoreConnect } from 'react-redux-firebase';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const EditProject = (props) => {
    const dispatch = useDispatch();
    useFirestoreConnect(['projects'])
    const projects = useSelector(state => state.firestore.ordered.projects);
    const [form] = Form.useForm();
    const projectId = useParams().id;
    const editedProject = projects ? projects.find((x) => x.id == projectId) : null;

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    const onFinish = (values) => {
        const { title, content } = values;
        dispatch(updateProject({ id: projectId, title, content }));
        props.history.push('/');
    };
    if (editedProject) {
        return (
            <>
                <Helmet>
                    <title>AntDesign | Edit project</title>
                </Helmet>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Add new project</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background site-layout-signup" style={{ padding: 24, minHeight: 360 }}>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        className="signup-form"
                        onFinish={onFinish}
                        scrollToFirstError
                        initialValues={{ title: editedProject.title, content: editedProject.content }}
                    >

                        <Form.Item
                            name="title"
                            label={
                                <span>
                                    Title
                            </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input title!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Content"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input content!',
                                },
                            ]}
                        >
                            <TextArea rows={5} />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Save
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </>
        );
    } else {
        return (
            <div className="container center">
                <p>Loading Project...</p>
            </div>
        );
    }
};

export default EditProject;