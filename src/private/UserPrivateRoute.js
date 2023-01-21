import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserPrivateRoute = ({children}) => {
  const { user } = useSelector(state => state.auth);
  return user ? (
    children
  ) :
  <Navigate to = "/"/>
}

export default UserPrivateRoute