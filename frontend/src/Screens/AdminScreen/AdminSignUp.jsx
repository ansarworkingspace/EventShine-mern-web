import { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminRegisterMutation } from '../../Slice/Admin/AdminApiSlice';
import { setAdminCredentials } from '../../Slice/Admin/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';


const AdminSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const { adminInfo } = useSelector((state) => state.adminAuth || {});

  const [adminRegister, { isLoading }] = useAdminRegisterMutation();
 


  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/adminHome');
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
      
        const res = await adminRegister({ name, email, password}).unwrap();
    
        dispatch(setAdminCredentials({ ...res }));
        
        navigate('/admin/adminHome');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  return (
    <FormContainer>
      <h1 style={{fontSize:"1.3rem"}}>Admin Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col style={{fontFamily:"Poppins"}}>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminSignUp ;