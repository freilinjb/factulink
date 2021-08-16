import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';

import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faPlus, faPrint,faEye, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {Col,Row,Form,Button, ButtonGroup, Dropdown, Card, Table} from "@themesberg/react-bootstrap";

import NotaCreditoModal from '../../components/modal/NotaCreditoModal';
import SupplierContext from "../../context/supplier/SupplierContext";


import clienteAxios from "../../config/axios";


const NotaCredito = () => {
  const supplierContext = useContext(SupplierContext);

  const { getSupplier, proveedoresSelect } = supplierContext;

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [datos, setDatos] = useState([]);

  const [campos, setCampos] = useState({
    tipoFactura:"",
    cliente: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  const consultarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios.get(`api/nota_credito`)
    .then(async (respuesta) => {
      console.log("getReportFactura: ", respuesta.data.data);
      setDatos(respuesta.data.data);
    })
    .catch((error) => {
      console.log("error: ", error);
    })
    
  }

  const consultar = async () => {
    await getSupplier();
    await consultarDatos(10,1);

  }
  
  useEffect(() => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    let currentDate = date.toISOString().substring(0,10);
    document.getElementById('fechaInicio').value = currentDate;

    date.setDate(date.getDate() + 7);
    currentDate = date.toISOString().substring(0,10);
    document.getElementById('fechaFinal').value = currentDate;


    consultar();
  },[]);


  useEffect(() => {
    console.log('Facturacion: ', datos);
  },[datos]);

  // useEffect(() => {
  //   let fechaFinal = document.getElementById('fechaFinal').value;
  //   let fechaInicio = document.getElementById('fechaInicio').value;
  //   console.log('fechaFinal: ', fechaFinal);
  //   console.log('fechaInicio: ', fechaInicio);
  //   consultarDatos(limit, page, campos.cliente.value, campos.tipoFactura.value, fechaInicio, fechaFinal);
  // },[page, limit]);
  
  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    const { value } = valorSeleccionado;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  };  

  const buscarFacturas = async () => {
    let fechaFinal = document.getElementById('fechaFinal').value;
    let fechaInicio = document.getElementById('fechaInicio').value;
    console.log('fechaFinal: ', fechaFinal);
    console.log('fechaInicio: ', fechaInicio);
    consultarDatos();
  }

  const tipoFactura = [
    { value: 13, label: "Contado" },
    { value: 14, label: "Credito" },
  ];


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
            <Breadcrumb.Item active> Administracion de Notas de Credito </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Administracion de Notas de Credito</h4>
        </div>

      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Form.Group className="col-3">
              <Form.Label>Cliente</Form.Label>
              <Select
                options={proveedoresSelect}
                
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="cliente"
                id="cliente"
                value={campos.cliente}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>

            <div className="form-group col-2">
              <label for="">Fecha Inicio</label>
              <input type="date" class="form-control" name="fechaInicio" id="fechaInicio" defaultValue="10-09-2020" placeholder=""/>
            </div>

            <div className="form-group col-2">
              <label for="">Fecha Final</label>
              <input type="date" class="form-control" name="fechaFinal" id="fechaFinal" placeholder=""/>
            </div>
              
            <div className="col-1 mt-4">
              <Button onClick={e => buscarFacturas()}>Buscar</Button>
            </div>

            <div className="col-3 btn-toolbar mb-2 mb-md-0 mt-4">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm"><FontAwesomeIcon icon={faPrint} />Imprimir</Button>
            <Button variant="outline-primary" size="sm">
              <Link to={'/compras/add'}><FontAwesomeIcon icon={faPlus}/> Exportar</Link>
             </Button>
             <Button variant="outline-primary" size="sm"
              onClick={() => handleShowModal()}
             >
              <FontAwesomeIcon icon={faPlus}/> NC por devolucion de articulo
             </Button>
          </ButtonGroup>
        </div>
        </Row>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="p-0">
        <Table hover className="user-table align-items-center" style={{minHeight: "30vh"}}>
             <thead className="thead-dark" style={{minHeight: "80px"}}>
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">NFC</th>
                 <th className="border-bottom">Fecha</th>
                 <th className="border-bottom">Cliente</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">Facturas</th>
                 <th className="border-bottom">Cant. Articulos</th>
                 <th className="border-bottom">Monto</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {datos.map((dato, index) => (
              <tr>
                <td>{1+index}</td>
                <td>{dato.NCF}</td>
                <td>{dato.fecha.substring(0,10)}</td>
                <td>{dato.cliente}</td>
                <td>{dato.telefono}</td>
                <td>{dato.correo}</td>
                <td
                  onClick={() => window.open(`/#/billing/invoice/${dato.numFactura}`)}
                >
                  <a>
                    <FontAwesomeIcon icon={faPrint} className="me-2" />{dato.numFactura}
                  </a>
                </td>
                <td>{dato.cantidadArticulos}</td>
                <td>{new Intl.NumberFormat("en-IN").format(dato.total)}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                      <span className="icon icon-sm">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <FontAwesomeIcon icon={faEye} className="me-2" /> Consultar detalles
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={`/cxp/${dato.idProveedor}`}>
                          <FontAwesomeIcon icon={faEdit} className="me-2" />Realizar Pago
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card.Body>
      </Card>

      <NotaCreditoModal handleClose={handleClose} showModal={showModal} consultarDatos={consultarDatos}/>

    </>
  );
};

export default NotaCredito;
