import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// assets
import logo from '../../assets/logo.footer.svg';

// ui setting
import './footer.styles.css';

export default function Footer() {
  return <>
    <div className="row m-0 p-0 text-light">
      <div className="col p-0 m-0 footer">
        <footer>
          <div className="row p-0 m-0 px-2 py-2">
            <div className="col">
              <div className="row align-items-center">
                <div className="col-12 my-3">
                  <Link to="/"><img src={logo} width="32" alt="logo" /></Link>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6 my-3">
                      <div className="row flex-column align-items-start">
                        <div className="col">AIDAN DANG</div>
                        <div className="col-8"><small>Experienced Web Developer with a demonstrated history of working in the design industry. Skilled in General Management, Design and Web Development.</small></div>
                      </div>
                    </div>
                    <div className="col-md-3 my-3">
                      <div className="row flex-column align-items-start">
                        <div className="col">Contact Me</div>
                        <div className="col"><small><a className="footer-a" href="mailto:info@aidandang.com">info@aidandang.com</a></small></div>
                      </div>
                    </div>
                    <div className="col-md-3 my-3">
                      <div className="row flex-column align-items-start">
                        <div className="col">Social Media</div>
                        <div className="col">
                          <span className="mr-2"><a className="social-media" href="https://github.com/aidandang"><i className="fab fa-github"></i></a></span>
                          <span className="mr-2"><a className="social-media" href="https://www.linkedin.com/in/aidandang/"><i className="fab fa-linkedin"></i></a></span>
                          <span><a className="social-media" href="https://www.facebook.com/aidan2303"><i className="fab fa-facebook-f"></i></a></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col">
                      <hr className="footer-line"/>
                    </div>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <small>2020. Order Services Project, <a className="footer-a" href="https://aidandang.com">aidandang.com</a>.</small>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </>
}