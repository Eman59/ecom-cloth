import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRef, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import database from '../../Firebase';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [ dataRegister, setDataRegister ] = useState([]);
  const [ dataLogin, setDataLogin ] = useState([]);
  const [ loginState, setLoginState ] = useState(false);
  const formRef = useRef()
  const username = useRef();
  const password = useRef();
  const email = useRef();
  let history = useHistory()

  const loginUsername = useRef();
  const loginPassword = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredUsername = username.current.value;
    const enteredPassword = password.current.value;
    const enteredEmail = email.current.value;
    const enteredLoginUsername = loginUsername.current.value;
    const enteredLoginPassword = loginPassword.current.value;
    let saveToFirebase = database.firestore();
    if(enteredUsername && enteredPassword && enteredEmail){
      saveToFirebase.collection("register").add({
        Name: enteredUsername,
        Password: enteredPassword,
        Email: enteredEmail,
      })
    }
    if (enteredLoginUsername && enteredLoginPassword) {
      saveToFirebase.collection("login").add({
        LoginName: enteredLoginUsername,
        LoginPass: enteredLoginPassword
      })
    }
    if (enteredUsername && enteredPassword && enteredEmail) {
      username.current.value = '';
      password.current.value = '';
      email.current.value = '';
    }
    if (enteredLoginUsername && enteredLoginPassword) {
      loginUsername.current.value = '';
      loginPassword.current.value = '';
    }
  }

  useEffect(() => {
    async function getData() {
      let saveToFirebase = database.firestore();
      const response = saveToFirebase.collection('login');
      const response2 = saveToFirebase.collection('register');
      const data = await response.get();
      const data2 = await response2.get();
      data.docs.forEach(user => {
        setDataLogin(user.data())
      })
      data2.docs.forEach(user => {
        setDataRegister(user.data())
      })
    }
    getData();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    if( loginUsername.current.value === dataRegister.Name && loginPassword.current.value === dataRegister.Password ){
      setLoginState(true)
      loginUsername.current.value = ""
      loginPassword.current.value = ""
    }else if( loginUsername.current.value.length > 5 && loginPassword.current.value > 3 ){
      alert("Wrong Credentials")
    }
  }

  console.log("imran", loginState)

  if(loginState){
    history.push("/")
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={submitHandler} ref={formRef}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                ref={loginUsername}
                                required
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                ref={loginPassword}
                                required
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit" onClick={handleClick}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={submitHandler} ref={formRef}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                ref={username}
                                required
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                ref={password}
                                required
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                ref={email}
                                required
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
