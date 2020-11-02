import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  Breadcrumb
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from "./../../store/actions/authActions";

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

const SignUp = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const auth = useSelector(state => state.firebase.auth);
  if (auth.uid) return <Redirect to='/' />

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { email, password, fullName } = values;
    const newUser = {
      email, password, fullName
    }
    dispatch(signUp(newUser));
  };

  return (
    <>
      <Helmet>
        <title>AntDesign | SignUp</title>
      </Helmet>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>SignUp</Breadcrumb.Item>
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
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Định dạng E-mail không hợp lệ!',
              },
              {
                required: true,
                message: 'Vui lòng nhập E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Xác nhận mật khẩu không trùng khớp!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="fullName"
            label={
              <span>
                Họ tên&nbsp;
            <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              Tôi đã đọc <a href="">điều khoản</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Đăng ký
        </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignUp;