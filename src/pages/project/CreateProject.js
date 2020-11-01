import {
    Form,
    Input,
    DatePicker,
    Switch,
    Button,
    Breadcrumb,
    Row,
    Col,
    Select
} from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions'
const { TextArea } = Input;
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

const CreateProject = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const auth = useSelector(state => state.firebase.auth);
    if (!auth.uid) return <Redirect to='/signin' />

    const onFinish = (values) => {
        console.log("values:", values);
        // const { title, content } = values;
        dispatch(createProject(values));
        props.history.push('/');
    };

    return (
        <>
            <Helmet>
                <title>GPXD | Thêm mới dữ liệu</title>
            </Helmet>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới dữ liệu</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    className="signup-form"
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={{
                        address: "", bandoso: "", content: "",
                        owner: "", permitAcreage: "", permitDate: "",
                        permitNumber: "", qhdien: "", qhduong: "",
                        qhmuong: "", realAcreage: "", thuadatso: "",
                        tranhchap: false
                    }}
                >

                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="owner"
                                label="Chủ hộ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng họ tên chủ hộ!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="Địa chỉ xây dựng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            {/* <Form.Item
                                name="permitNumber"
                                label="Giấy phép số"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="permitDate"
                                label="Cấp ngày"
                            >
                                <DatePicker />
                            </Form.Item> */}

                            <Form.Item
                                label="Giấy phép số"
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                <Form.Item
                                    name="permitNumber"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '120px',
                                        lineHeight: '32px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Cấp ngày
                                </span>
                                <Form.Item
                                    name="permitDate"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <DatePicker style={{ width: "auto" }} />
                                </Form.Item>
                            </Form.Item>

                            {/* <Form.Item
                                name="permitAcreage"
                                label="Diện tích cấp phép"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="realAcreage"
                                label="Diện tích xây dựng thực tế"
                            >
                                <Input />
                            </Form.Item> */}

                            <Form.Item
                                label="Diện tích cấp phép"
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                <Form.Item
                                    name="permitAcreage"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <Input placeholder="đơn vị m2" />
                                </Form.Item>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '120px',
                                        lineHeight: '32px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Thực tế
                                </span>
                                <Form.Item
                                    name="realAcreage"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <Input placeholder="đơn vị m2" />
                                </Form.Item>
                            </Form.Item>

                            {/* <Form.Item
                                name="bandoso"
                                label="Tờ bản đồ số"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="thuadatso"
                                label="Thửa đất số"
                            >
                                <Input />
                            </Form.Item> */}
                            <Form.Item
                                label="Tờ bản đồ số"
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                <Form.Item
                                    name="bandoso"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '120px',
                                        lineHeight: '32px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Thửa đất số
                                </span>
                                <Form.Item
                                    name="thuadatso"
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 60px)',
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                name="qhduong"
                                label="Quy hoạch đường"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="qhmuong"
                                label="Quy hoạch mương"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="qhdien"
                                label="Quy hoạch điện"
                            >
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item
                                name="content"
                                label="Nội dung phát hiện"
                            >
                                <TextArea />
                            </Form.Item>

                            {/* <Form.Item
                                name="realAcreage"
                                label="Có tranh chấp với ai không"
                            >
                                <Input />
                            </Form.Item> */}

                            <Form.Item name="tranhchap" label="Có tranh chấp không?">
                                <Switch />
                            </Form.Item>

                            <Form.Item
                                name="bienbanso"
                                label="Đã lập biên bản số"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="huongxuly"
                                label="Hướng xử lý"
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                name="ketquaxuly"
                                label="Kết quả xử lý"
                            >
                                <TextArea />
                            </Form.Item>

                            {/* <Form.Item
                                name="coquankiemtra"
                                label="Cơ quan kiểm tra"
                            >
                                <Input />
                            </Form.Item> */}
                            <Form.Item
                                name="coquankiemtra"
                                label="Cơ quan kiểm tra"
                            >
                                <Select defaultValue="Phường" style={{ width: 120 }} >
                                    <Option value="Phường">Phường</Option>
                                    <Option value="TP">Thành phố</Option>
                                </Select>
                            </Form.Item>


                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Thêm mới dữ liệu
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default CreateProject;