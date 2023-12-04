import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75' style={{border:"dotted",borderColor:"gray",borderRadius:"2rem"}}>
        <h1 className='text-center mb-4'>
            {userInfo ? `Welcome ${userInfo.name} 👋` : 'Welcome to Event Shine 👋'}
          </h1>
          <p className='text-center mb-4'>
          Dive into the pulse of live moments with our event streaming platform, connecting enthusiasts worldwide in real-time exhilaration.
          </p>
          {/* <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div> */}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;