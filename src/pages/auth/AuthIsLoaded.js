import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import {
    Spin,
} from 'antd';

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) {
        return (
            <div style={{ textAlign: "center", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spin style={{ marginRight: "10px" }} /> Đang xác thực tài khoản đăng nhập ...
            </div>
        )
    }
    return children
}

export default AuthIsLoaded;