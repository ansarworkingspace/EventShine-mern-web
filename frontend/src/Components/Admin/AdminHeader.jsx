import { Navbar, Nav, Container, NavDropdown, Badge,Image } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminLogoutMutation } from '../../Slice/Admin/AdminApiSlice';
import { adminLogout } from '../../Slice/Admin/AuthSlice';
import '../User/css/userHeader.css'


const Header = () => {

  const { adminInfo } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [logoutApi] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(adminLogout());
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
              {adminInfo ? (
                <>
                
          
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
                  {/* <LinkContainer to='/register'>
                    <Nav.Link>
                       Sign Up
                    </Nav.Link>
                  </LinkContainer> */}
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