
import React,{useContext, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';


import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import AuthContext from "../../context/auth/AuthContext";

import useValidacion from "../../hooks/useValidacion";
import validarSignIn from "../../validation/validarSignIn";

const Signin = () => {
  const { addToast } = useToasts();
  const authContext = useContext(AuthContext);
  const { iniciarSesion, mensaje } = authContext;

  const STATE_INICIAL = {
    usuario: "freilinjb",
    clave: "1423",
    recordarme: false
  };

      useEffect(() => {
        console.log(`addToast: ${mensaje}`);
        if(mensaje) {
          addToast(mensaje, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
        
      }, [mensaje]);
  
  const onSubmit = async () => {
    console.log("valores222: ", valores);
    iniciarSesion(valores.usuario, valores.clave);
  }


  const {  valores, handleSubmit, handleChange } = useValidacion(STATE_INICIAL, validarSignIn, onSubmit);

  const { usuario, clave } = valores;

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Volver a Home
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Inicia sesi??n #</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Correo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="Enter your username" name="usuario" value={usuario} onChange={handleChange}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Contrase??a</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" name="clave" value={clave} onChange={handleChange}/>
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Recordarme</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Olvido su contrase??a</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesion
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">O iniciar Sesion con</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    No te has registrado?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Crear una Cuenta `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signin;