import React, { useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../Components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOTPMutation } from '../../Slice/User/UserApiSlice';
import { setCredentials } from '../../Slice/User/AuthSlice';

const OtpEmail = () => {

const [otp,setOtp] = useState()
const [email, setEmail] = useState('');
const { email: routeEmail } = useParams();

const dispatch = useDispatch();
const navigate = useNavigate();

const { userInfo } = useSelector((state) => state.auth);
const [verifyOTP, { isLoading }] = useVerifyOTPMutation();



useEffect(() => {
  console.log('Email from route parameters:', routeEmail);
}, [routeEmail]);



const submitHandler = async (e) => {
  e.preventDefault();

  try {
    // Send OTP for verification
    const response = await verifyOTP({ email: routeEmail, otp }).unwrap();


      // Dispatch user information to Redux
      dispatch(setCredentials({ ...response }));

  

    navigate('/');

  } catch (error) {

  
  toast.error(error?.data?.message || error.message);

  }
};


  return (
    <FormContainer>
      <h1>OTP Verification</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Otp have limited expire time</Form.Label>
          <Form.Control
            type='text' 
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></Form.Control>
        </Form.Group>
       
        <Button type='submit' variant='primary' className='mt-3'>
         Verify
        </Button>
      </Form>

  
    </FormContainer>
  );


}

export default OtpEmail
