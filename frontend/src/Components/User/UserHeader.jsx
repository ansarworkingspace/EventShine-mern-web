import { Navbar, Nav, Container, NavDropdown, Badge,Image } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../Slice/User/UserApiSlice';
import { logout } from '../../Slice/User/AuthSlice';
import '../User/css/userHeader.css'


const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar className="custom-navbar"  variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand className="brand">
          <Image
    src="/logo/logo5.png"
    alt="Event Shine Logo"
    fluid
    style={{ maxWidth: '150px' }} // Adjust the max width as needed
  />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  {/* <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown> */}
          
          <Nav.Link className="text-white" onClick={logoutHandler}>
            Logout
          </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                       Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>

            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
