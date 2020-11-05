import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Breadcrumb,
  message,
} from 'antd';
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from "./../../store/actions/authActions";

const { Option } = Select;

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

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [clickSave, setClickSave] = useState(false);
  const loadingStatus = useSelector((state) => state.auth.loading);

  useEffect(() => {
    setLoading(loadingStatus);
  }, [loadingStatus]);

  useEffect(() => {
    if (clickSave) {
      message.success('Thêm mới dữ liệu thành công!');
      setTimeout(() => {
        props.history.push('/user');
      }, 500);
    }
  }, [loading]);

  const auth = useSelector(state => state.firebase.auth);
  if (!auth.uid) return <Redirect to='/signin' />

  const onFinish = (values) => {
    setLoading(true);
    setClickSave(true);
    dispatch(signUp(values));
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
          name="signup"
          className="signup-form"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{
            role: "Staff",
          }}
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
            <Input placeholder="Nhập e-mail" />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập họ tên!',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập họ tên người dùng" />
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
            <Input.Password placeholder="Nhập mật khẩu" />
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

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn vai trò người dùng!',
              },
            ]}
          >
            <Select style={{ width: 170 }} >
              <Option value="Admin">Quản trị hệ thống</Option>
              <Option value="Leader">Quản trị viên</Option>
              <Option value="Staff">Nhân viên</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item {...tailFormItemLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
              Tạo tài khoản
        </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default withRouter(SignUp);