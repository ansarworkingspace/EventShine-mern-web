import { Container } from 'react-bootstrap';
import Header from '../src/Components/User/UserHeader';
import { Outlet,useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Footer from '../src/Components/User/Footer'
import AdminHeader from "./Components/Admin/AdminHeader";

const App = () => {

  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin"); 

  return (
    <>
      {isAdminPage ? <AdminHeader /> : <Header/>}
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
      <Footer/>
    </>
  );
};

export default App;