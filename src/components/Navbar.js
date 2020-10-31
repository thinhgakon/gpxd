import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLink";

function Navbar(props) {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  return (
    <>
        {auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />}
    </>
  );
}

export default Navbar;