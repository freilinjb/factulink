import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {Col,Row,Form,Button,ButtonGroup, Card, Table, Dropdown, Badge} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faEye, faEdit, faHome, faEllipsisH, faPrint, faBackward, faPlus} from "@fortawesome/free-solid-svg-icons";
import cookie from "js-cookie";
import clienteAxios from "../../config/axios";

import RealizarPagoModalCXP from "../../components/modal/RealizarPagoModalCXP";
import PagoHistorialModalCXP from "../../components/modal/PagoHistorialModalCXP";

const DetalleCuentaPorCobrar = () => {

  const [datos, setDatos] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [cliente, setCliente] = useState({});
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [mostrarModalPagos, setMostrarModalPagos] = useState(false);
  const [idPago, setIdPago] = useState(0);
  const [compra, setCompra] = useState({
    idCompra: 0,
    monto: 0,
  });

  const handleClose = () => setShowModal(false);
  
  const mostrarModal = () => {
    setCompra({
      ...compra,
      idCompra: 0,
    });

    setShowModal(true);
  };

  const mostrarModalCompra = (compra) => {
    setCompra({
      ...compra,
      idCompra: compra.idCompra,
      monto: compra.total - compra.pagado
    });
    setShowModal(true);
  };
  const handleClosePago = () => setMostrarModalPagos(false);
  const mostrarModalPago = (compra) => {
    console.log('Compra: ', compra);
    setCompra({
      ...compra,
      idCompra: compra.idCompra,
      monto: compra.total - compra.pagado
    });
    
    setMostrarModalPagos(true);
  };

  const consultarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    clienteAxios.get(`/api/cxp/${id}`).then(async (resultados) => {
      console.log('consultarDatos: ', resultados.data.data);
      setDatos(resultados.data.data);
      setCliente(resultados.data.data[0]);
    }).catch((error)=> {
      console.log('Error: ', error);
    })
    handleClose();
  }
  useEffect(() => {
    consultarDatos();
    // const fecha = new Date();
    // // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
    // document.getElementById('fecha').value = fecha.toISOString().substring(0,10);
  },[]);

  useEffect(() => {
    if(datos.length > 0 && compra.idCompra === 0) {
      let sum = 0;
      datos.forEach((key) => {
        if(key.estado === 'pendiente') {
          sum += Number(key.total) - Number(key.pagado);
          console.log('Total: ', key.total);
        }
      })

      setMontoTotal(sum);
    } else if(compra.idCompra > 0) {
      setMontoTotal(compra.monto);

    }
  },[datos, compra]);

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
            <Breadcrumb.Item active> Cuenta por Pagar </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Administracion de Cuentas por Pagar</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" href="/#/cuentaPorCobrar" size="sm"><FontAwesomeIcon icon={faBackward} />Volver</Button>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPlus} />Enviar</Button>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPrint} />Imprimir</Button>
            <Button variant="outline-primary" size="sm">
              <Link to={'/product/add'}><FontAwesomeIcon icon={faPlus}/> Cambiar Proveedor</Link>
             </Button>
          </ButtonGroup>
        </div>
      </div>

      <Row>
        <div className="col-3">
        <h6 className="bg-primary p-1 rounded-3 text-white text-center">Datos Generales</h6>
          <Form>
            {datos.length > 0 && (
              <Form.Group as={Row} className="mb-3 ">
              <Form.Label column sm="3">Proveedor</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue={datos[0].proveedor}/>
              </Col>
            </Form.Group>
            )} 
            

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">Vendedor</Form.Label>
              <Col sm="9">
                <Form.Control readOnly defaultValue=""/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                RNC
              </Form.Label>
              <Col sm="9">
                <Form.Control disabled defaultValue={cliente.identificacion}/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" className="justify-content-between">
              <Form.Label column sm="auto">
                Facturas Pendientes
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="text" value={datos.length} readOnly plaintext />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"controlId="formPlaintextPassword" className="justify-content-between">
              <Form.Label column sm="auto">
                Deuda total
              </Form.Label>
              <Col sm="auto">
                <Form.Control type="text" readOnly plaintext value={"RD$" + montoTotal} />
              </Col>
            </Form.Group>

            <Button
              onClick={mostrarModal}
            >Realizar pago</Button>

          </Form>
        </div>
        <div className="col-9">
            <h6 className="bg-primary p-1 rounded-3 text-white text-center">Facturas por pagar</h6>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="p-0">
                <Table hover className="user-table align-items-center" style={{minHeight: "40vh"}}>
                  <thead className="thead-dark">
                    <tr>
                      <th className="border-bottom">#</th>
                      <th className="border-bottom">Bolante</th>
                      <th className="border-bottom">Fecha</th>
                      <th className="border-bottom">Total</th>
                      <th className="border-bottom">Pagodo</th>
                      <th className="border-bottom">%</th>
                      <th className="border-bottom">Estado</th>
                      <th className="border-bottom">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                  {datos.map((dato, index) => (
                      <tr key={index}>
                          <td>{1+index}</td>
                          <td>{dato.idCompra}</td>
                          <td>{dato.fecha.substring(0,10)}</td>
                          <td>{new Intl.NumberFormat("en-IN").format(dato.total)}</td>
                          <td>{new Intl.NumberFormat("en-IN").format(dato.pagado)}</td>
                          <td> {((dato.pagado / dato.total) * 100).toFixed(2)}  %</td>
                          <td>{<Badge bg={dato.estado == 'pagada' ? 'success' : 'danger'} className="me-1">{dato.estado}</Badge>}</td>

                          <td>
                            <Dropdown as={ButtonGroup}>
                              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm">
                                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => mostrarModalPago(dato)}
                                >
                                  <FontAwesomeIcon icon={faEye} className="me-2" /> Consultar pagos
                                </Dropdown.Item>
                                {dato.estado == 'pendiente' && (
                                  <Dropdown.Item
                                    onClick={() => mostrarModalCompra(dato)}
                                    >
                                      <FontAwesomeIcon icon={faEdit} className="me-2" />Realizar Pago
                                    </Dropdown.Item>
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
                </Card.Body>
              </Card>
        </div>
      </Row>
      <RealizarPagoModalCXP handleClose={handleClose} showModal={showModal} montoTotal={montoTotal} idCliente={id} consultarDatos={consultarDatos} compra={compra}/>
      <PagoHistorialModalCXP handleClosePago={handleClosePago} mostrarModalPagos={mostrarModalPagos} idPago={idPago} compra={compra}/>

    </>
  );
};

export default DetalleCuentaPorCobrar;
