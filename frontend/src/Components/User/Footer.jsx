import React from 'react';


const Footer = () => {
  return (
    <div className=" container my-5">
      <footer className="text-center text-white" >
        <div className="container">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                {/* <h6 className="text-uppercase font-weight-bold">
                  <a href="#!" className="text-white">About us</a>
                </h6> */}
              </div>
              {/* Repeat similar code for other columns */}
            </div>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p style={{color:"white"}}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-5">
            <a href="" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            {/* Repeat similar code for other social icons */}
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',fontFamily:"poppins" ,borderRadius:"2rem"}}
        >
          © 2023 Copyright: 
          <a className="text-white" href="https://mdbootstrap.com/">EventShine.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

