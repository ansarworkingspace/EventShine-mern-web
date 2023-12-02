// import React, { useState,useEffect} from 'react'
// import { Link,useNavigate,useParams } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import FormContainer from '../../Components/FormContainer';
// import { useDispatch, useSelector } from 'react-redux';
// import { useVerifyOTPMutation,useResendOTPMutation } from '../../Slice/User/UserApiSlice';
// import { setCredentials } from '../../Slice/User/AuthSlice';

// const OtpEmail = () => {

// const [otp,setOtp] = useState()
// const [email, setEmail] = useState('');
// const { email: routeEmail } = useParams();

// const dispatch = useDispatch();
// const navigate = useNavigate();

// const { userInfo } = useSelector((state) => state.auth);
// const [verifyOTP] = useVerifyOTPMutation();
// const [resendOTP] = useResendOTPMutation();

// const [isTimerExpired, setIsTimerExpired] = useState(false);
// const [remainingTime, setRemainingTime] = useState(60);



// useEffect(() => {
//   if (remainingTime > 0) {
//     const timer = setTimeout(() => {
//       setRemainingTime(remainingTime - 1);
//     }, 1000); // Update every second
//     return () => clearTimeout(timer);
//   } else {
//     setIsTimerExpired(true);
//   }
// }, [remainingTime]);



// const handleResendClick = async () => {
//   try {
//     // Send a request to backend to resend OTP
//     const res = await verifyOTP({ email: routeEmail }).unwrap();

//     if (res.status === 200) { // Check if the response status is 200 (success)
//       // Reset timer and enable submit button
//       setRemainingTime(60);
//       setIsTimerExpired(false);
//     } else {
//       console.error('Error while resending OTP:', res.data.message);
//     }
//   } catch (error) {
//     console.error('Error while resending OTP:', error);
//   }
// };




// const submitHandler = async (e) => {
//   e.preventDefault();

//   try {
//     // Send OTP for verification
//     const response = await verifyOTP({ email: routeEmail, otp }).unwrap();


//       // Dispatch user information to Redux
//       dispatch(setCredentials({ ...response }));

  

//     navigate('/');

//   } catch (error) {

  
//   toast.error(error?.data?.message || error.message);

//   }
// };


//   return (
//     <FormContainer>
//       <h1>OTP Verification</h1>

//       <Form onSubmit={submitHandler}>
//         <Form.Group className='my-2' controlId='email'>
//           <Form.Label>Otp have limited expire time</Form.Label>
//           <Form.Control
//             type='text' 
//             placeholder='Enter OTP'
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
       
//         <Button type='submit' variant='primary' className='mt-3'>
//          Verify
//         </Button>
//       </Form>

  
//     </FormContainer>
//   );


// }

// export default OtpEmail




import React, { useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../Components/FormContainer';
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useVerifyOTPMutation,useResendOTPMutation } from '../../Slice/User/UserApiSlice';
import { setCredentials } from '../../Slice/User/AuthSlice';


const OtpEmail = () => {
  const [otp, setOtp] = useState('');
  const { email: routeEmail } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyOTP] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000); // Update every second
      return () => clearTimeout(timer);
    } else {
      setIsTimerExpired(true);
    }
  }, [remainingTime]);


  const handleResendClick = async () => {
    try {
      const res = await resendOTP({ email: routeEmail }).unwrap();
  
      console.log('Resend response:', res);
  
      if (res.message === 'OTP resent successfully') {
        // Reset timer and enable submit button
        setRemainingTime(30);
        setIsTimerExpired(false);
      } else {
        console.error('Error while resending OTP:', res.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error while resending OTP:', error.message);
    }
  };
  


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOTP({ email: routeEmail, otp }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };



  const handleBOTHsubmit = async (e) => {
    e.preventDefault();
  
    if (isTimerExpired) {
      await handleResendClick();
    } else {
      await submitHandler(e);
    }
  };
  


  return (
    <FormContainer>
      <h1 style={{fontSize:"1.3rem"}}>OTP Verification</h1>
      <Form onSubmit={handleBOTHsubmit}>
        <Form.Group className='my-2' controlId='otp'>
          <Form.Control
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
        {isTimerExpired ? (
          <Button
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Resend
          </Button>
        ) : (
          <Button type='submit' variant='primary' className='mt-3'>
            Verify
          </Button>
        )}
        <div className='timer' style={{ color: 'rgb(5, 80, 73)', marginLeft: '1.7rem', marginTop: '0.5rem', fontFamily: 'Sora' }}>
          {Math.floor(remainingTime / 60)} min {remainingTime % 60} sec
        </div>
      </Form>
    </FormContainer>
  );
};

export default OtpEmail;
