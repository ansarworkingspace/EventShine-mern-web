import { Container } from 'react-bootstrap';
import Header from '../src/Components/User/UserHeader';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Footer from '../src/Components/User/Footer'

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
      <Footer/>
    </>
  );
};

export default App;