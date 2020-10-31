import {
    Form,
    Input,
    Tooltip,
    Checkbox,
    Button,
    Breadcrumb
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions'

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

const CreateProject = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    const onFinish = (values) => {
        const { title, content } = values;
        dispatch(createProject({ title, content }));
        props.history.push('/');
    };

    return (
        <>
            <Helmet>
                <title>AntDesign | Add new project</title>
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
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Add new
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateProject;