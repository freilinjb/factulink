import React,{ useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import cookie from "js-cookie";
import clienteAxios from "../../config/axios";

import {
  Row,
  Form,
  Button,
  Modal,
  Card,
  Table
} from "@themesberg/react-bootstrap";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PagoHistorialModalCXP = ({handleClosePago, mostrarModalPagos, isEdit, idPago, compra}) => {
  const unidContext = useContext(UnidContext);
  const {  updateUnid, addUnid, getUnidByID, unidadEditar } = unidContext;
  const [campos, setCampos] = useState({
    nombre: "",
    estado: "",
  })

  const [pagos, setPagos] = useState([]);

  const [errores, setErrores] = useState({});

  useEffect(() => {
    console.log('PAGO CAMBIADO', compra.idCompra);
    if(compra.idCompra > 0) {
      consultarPagos(compra.idCompra);
    }
  }, [compra]);

  const consultarPagos = async (id) => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    clienteAxios.get(`/api/cxp_pagos/${id}`).then(async (resultados) => {
      console.log('consultarPagos: ', resultados.data.data);
      setPagos(resultados.data.data);
    }).catch((error)=> {
      console.log('Error: ', error);
    })
  }


  useEffect(() => {

    if(Object.entries(unidadEditar).length !== 0) {
        // console.log('asdfasdf');
        setCampos({
          ...campos,
          nombre: unidadEditar.unidad,
          estado: unidadEditar.estado == 'activo' ? { value: 1, label: "Activo" } : { value: 0, label: "Inactivo" }
        })
      }
  },[unidadEditar]);
  
  const handleSubmit =(e)=> {
    e.preventDefault();
  }  

  return (
    <Modal as={Modal.Dialog} size="lg"  centered show={mostrarModalPagos} onHide={handleClosePago}>
      <Modal.Header>
        <Modal.Title className="h6"> Registros de pagos </Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClosePago} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <div className="col-12">
            <Card border="light" className="shadow-sm mb-0 mt-4">
            <Card.Body className="pb-0 row">
              <div className="col-6">
              <h3>Compra: {pagos.length > 0 && pagos[0].cliente }</h3>
              </div>

              <div className="col-6">
              <h3>Factura: # {pagos.length > 0 && pagos[0].numFactura }</h3>
              </div>
              <hr/>

            </Card.Body>
            </Card>
            </div>
          <div className="col-12">
            {pagos.length == 0 ? (
            <h5 className="text-center">Agregar producto para crear la factura de veta</h5>) : 
            (
              <>
  <Card border="light" className="shadow-sm mb-0 mt-4">
            <Card.Body className="pb-0">
                <Table responsive className="table-striped table-centered table-nowrap rounded mb-0">
                <thead className="thead-light">
                    <tr>
                    <th className="border-0">Bolante</th>
                    <th className="border-0">Fecha</th>
                    <th className="border-0">Forma de pago</th>
                    <th className="border-0">Monto</th>
                    <th className="border-0">%</th>
                    <th className="border-0">estadoFactura</th>
                    </tr>
                </thead>
                <tbody>
                    {pagos.map((pago, index) => (
                        <tr key={index +'-'+ pagos.idProducto}>
                            <td
                              onClick={() => window.open(`/#/report/pay/${pago.idPago}`)}
                            >
                              <a>
                                <FontAwesomeIcon icon={faPrint} className="me-2" />{pago.idPago}
                              </a>
                             </td>
                            <td>{pago.fechaPago.substring(0,10)}</td>
                            <td>{pago.formaPago}</td>
                            <td>{pago.monto}</td>
                            <td>{(compra.monto/pago.monto).toFixed(2) * 100} % </td>
                            <td>{pago.estadoFactura}</td>
                            <td>{pago.observacion}</td>
                          </tr>   
                    ))}
                </tbody>
                </Table>
                <div className="col-12 bg-primary text-white text-center">
                    <h2>{pagos[0].estadoFactura}</h2>
                </div>
            </Card.Body>
            </Card>

            <div className="row">
                  </div>
              </>
            )
            }
        </div>

          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePago}>
          Imprimir
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClosePago}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PagoHistorialModalCXP;
