// import { Container, Row, Col } from 'react-bootstrap';

// const FormContainer = ({ children }) => {
//   return (
//     <Container>
//       <Row className='justify-content-md-center mt-5'>
//         <Col xs={12} md={4} className='card p-5' style={{ 
//           color:"white",
//           background: 'rgba(255, 255, 255, 0.4)',
//           borderRadius: '10px',
//           backdropFilter: 'blur(10px)',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
//         }}>
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default FormContainer;




import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5' >
        <Col xs={12} md={4} className='card p-3' style={{ 
          color: 'white',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          
        }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
