import React from 'react';
import { Breadcrumb, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  NavLink, Redirect
} from "react-router-dom";

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "./../../store/actions/authActions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignIn = () => {
  const authError = useSelector((state) => state.auth.authError);
  const dispatch = useDispatch();

  const auth = useSelector(state => state.firebase.auth);
  if (auth.uid) return <Redirect to='/' />

  const onFinish = (values) => {
    console.log('Success:', values);
    dispatch(signIn({ email: values.username, password: values.password }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Helmet>
        <title>AntDesign | SignIn</title>
      </Helmet>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Đăng nhập</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background site-layout-signin" style={{ padding: 24, minHeight: 360 }}>
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="E-mail"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập E-mail!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail đăng nhập" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
        </Button>
        <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
        </div>

        Or <NavLink to="/signup" activeClassName="active">đăng ký!</NavLink>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SignIn;