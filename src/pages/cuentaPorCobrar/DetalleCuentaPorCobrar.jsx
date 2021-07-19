import React from "react";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { Link } from 'react-router-dom';

const DetalleCuentaPorCobrar = () => {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active> Cuenta por Cobrar </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Administracion de Cuentas por Cobrar</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Enviar</Button>
            <Button variant="outline-primary" size="sm">Imprimir</Button>
            <Button variant="outline-primary" size="sm">
              <Link to={'/product/add'}>+ Cambiar Cliente</Link>
             </Button>
          </ButtonGroup>
        </div>
      </div>

      <Row>
        <div className="col-3">
        <h6 className="bg-primary p-1 rounded-3 text-white text-center">Datos Generales</h6>
          {/* <Form.Group>
            <Form.Label>Cliente</Form.Label>
            <Select
              // options={clientesSelect}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: { ...theme.colors, primary: "#333152" },
              })}
              name="cliente"
              id="cliente"
              // value={campos.cliente}
              // onChange={handleChangeSelect}
              placeholder="Seleccione una opción"
            />
          </Form.Group> */}

          <Form>
            <Form.Group as={Row} className="mb-3 ">
              <Form.Label column sm="3">Cliente</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue="Juan de los palotes"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Vendedor</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue="Juan de los palotes"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                RNC
              </Form.Label>
              <Col sm="9">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="auto">
                Facturas Pendientes
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="password" placeholder="RD $19000.99" readOnly plaintext />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="auto">
                Monto total
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="password" placeholder="RD $19000.99" readOnly plaintext />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword">
              <Form.Label column sm="auto">
                Observacion
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="password" placeholder="Ob servacion del cliente" readOnly plaintext />
              </Col>
            </Form.Group>

          </Form>
        </div>
        <div className="col-8">
            <h6 className="bg-primary p-1 rounded-3 text-white text-center">Facturas</h6>
        </div>
      </Row>
    </>
  );
};

export default DetalleCuentaPorCobrar;
