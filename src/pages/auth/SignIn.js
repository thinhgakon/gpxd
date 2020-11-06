import React, { useState, useEffect } from 'react';
import { Breadcrumb, Form, Input, Button, Checkbox, Row, Col } from 'antd';
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

  const [loading, setLoading] = useState(true);
  const [clickSave, setClickSave] = useState(false);
  const loadingStatus = useSelector((state) => state.auth.loading);

  useEffect(() => {
    setLoading(loadingStatus);
  }, [loadingStatus]);

  const auth = useSelector(state => state.firebase.auth);
  if (auth.uid) return <Redirect to='/' />

  const onFinish = (values) => {
    console.log('Success:', values);
    setLoading(true);
    setClickSave(true);
    dispatch(signIn({ email: values.username, password: values.password }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập hệ thống</title>
      </Helmet>
      <div className="site-layout-background site-layout-signin" style={{ backgroundColor: "#f1f4f7", height: "100%" }}>
        <Row style={{ height: "100%" }} justify="space-around" align="middle">
          <div style={{ padding: "30px", borderRadius: "5px", backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(51,51,51,0.15)" }}>
            <Col>
              <h2 style={{ padding: "20px 0" }}>Đăng nhập hệ thống</h2>
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
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
                  <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                  <div style={{ padding: "10px 0" }} className="red-text center">
                    {authError ? <p>{authError}</p> : null}
                  </div>
                </Form.Item>
              </Form>
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default SignIn;