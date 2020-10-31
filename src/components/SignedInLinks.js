import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from './../store/actions/authActions';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';

const SignedInLinks = ({ profile }) => {

  const dispatch = useDispatch();
  return (
    <>
      <ul className="topbar__account">
        <li className="topbar__avatar"><Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" /></li>
        <li className="topbar_name"><NavLink to='/' className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>
        <li className="topbar_link"><a onClick={() => dispatch(signOut())} >Log Out</a></li>
      </ul>
    </>
  )
}

export default SignedInLinks