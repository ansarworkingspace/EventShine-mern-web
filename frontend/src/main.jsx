import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screens/UserScreen/HomeScreen.jsx';
import LoginScreen from './Screens/UserScreen/LoginScreen.jsx';
import RegisterScreen from './Screens/UserScreen/RegisterScreen.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './Components/User/UserPrivetRouter.jsx';
import OtpEmailScreen from './Screens/UserScreen/OtpEmailScreen.jsx';

import AdminLoginScreen from './Screens/AdminScreen/AdminLogin.jsx';
import AdminRegisterScreen from './Screens/AdminScreen/AdminSignUp.jsx'
import AdminHomeScreen from './Screens/AdminScreen/AdminHome.jsx'
import AdminPrivetRouter from './Components/Admin/AdminPrivetRouter.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>



      <Route index={true}  element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} /> 
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/otpverification/:email' element={<OtpEmailScreen />} />

      {/* <Route path='' element={<PrivateRoute />}>

      </Route> */}


      <Route path="/admin/register" element={<AdminRegisterScreen/>} />
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route path="/admin" element={<AdminLoginScreen />} /> 

      <Route path='' element={<AdminPrivetRouter />}>
      <Route path="/admin/adminHome" element={<AdminHomeScreen />} /> 
      </Route>

   
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
