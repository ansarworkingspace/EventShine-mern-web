

import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from 'react';

import React from 'react'

function AdminPrivateRoute() {



const { adminInfo } = useSelector((state) => state.adminAuth);
return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;

}

export default AdminPrivateRoute