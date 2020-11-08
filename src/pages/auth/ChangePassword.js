import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Breadcrumb,
  message,
} from 'antd';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, resetAuth } from "./../../store/actions/authActions";

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

const ChangePassword = (props) => {
  const authError = useSelector((state) => state.auth.authError);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [clickSave, setClickSave] = useState(false);
  const loadingStatus = useSelector((state) => state.auth.loading);

  useEffect(() => {
    return function cleanup() {
      dispatch(resetAuth());
    }
  }, []);

  useEffect(() => {
    setLoading(loadingStatus);
  }, [loadingStatus]);

  useEffect(() => {
    if (clickSave && authError == null) {
      message.success('Thay đổi mật khẩu thành công!');
      setTimeout(() => {
        props.history.push('/project');
      }, 500);
    }
  }, [loading]);

  const auth = useSelector(state => state.firebase.auth);
  if (!auth.uid) return <Redirect to='/signin' />

  const onFinish = (values) => {
    setLoading(true);
    setClickSave(true);
    dispatch(changePassword(values));
  };

  return (
    <>
      <Helmet>
        <title>GPXD | Thay đổi mật khẩu</title>
      </Helmet>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>SignUp</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background site-layout-signup" style={{ padding: 24, minHeight: 360 }}>
        <Form
          {...formItemLayout}
          form={form}
          name="signup"
          className="signup-form"
          onFinish={onFinish}
          scrollToFirstError
        >

          {/* <Form.Item
            name="oldpassword"
            label="Mật khẩu hiện tại"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu hiện tại!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu hiện tại" />
          </Form.Item> */}

          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu mới!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
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
            <Input.Password placeholder="Nhập lại mật khẩu xác nhận" />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <div style={{ padding: "10px 0" }} className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </Form.Item>

        </Form>
      </div>
    </>
  );
};

export default withRouter(ChangePassword);