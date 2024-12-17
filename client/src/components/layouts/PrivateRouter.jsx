// import React from 'react'
import cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRouter = () => {
  return (
    <>
      {cookies.get("token") ? <Outlet /> : <Navigate to="/signup" />  }
    </>
  )
}

export default PrivateRouter
