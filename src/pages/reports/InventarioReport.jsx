import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { Link } from 'react-router-dom';

import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faCog, faCheck, faPlus, faPrint,faEye, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {Col,Row,Form,Button, ButtonGroup, Dropdown, Card, Table} from "@themesberg/react-bootstrap";

import SupplierContext from "../../context/supplier/SupplierContext";

import clienteAxios from "../../config/axios";


const InventarioReport = () => {
  // const customerContext = useContext(CustomerContext);
  const supplierContext = useContext(SupplierContext);

  const { getSupplier, proveedoresSelect } = supplierContext;
  // const { getCustomer, clientesSelect } = customerContext;
  // const { getReportFactura } = comprobanteContext;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total_page, setTotal_page] = useState('');
  const [totalRow, setTotalRow] = useState(0);
  const [datos, setDatos] = useState([]);

  const [campos, setCampos] = useState({
    tipoFactura:"",
    cliente: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  const consultarDatos = async (limit, page, cliente = 0, tipoFactura = 0, desde = '', hasta = '') => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios.get(`api/cuentaPorPagarProveedor`)
    .then(async (respuesta) => {
      console.log("getReportFactura: ", respuesta.data.data);
      setDatos(respuesta.data.data);
      setTotalRow(respuesta.data.data.total_rows);
      setTotal_page(respuesta.data.data.total_page);
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

  const handleClick = (e) => {
    console.log('prueba: ', e.target.text);
    setLimit(Number(e.target.text));
  }

//   const handlePress =(e)=> {
//     if(e.key == 'Enter') {
//       // getReportFactura(limit, page, search);
//     }
//   }

  useEffect(() => {
    let fechaFinal = document.getElementById('fechaFinal').value;
    let fechaInicio = document.getElementById('fechaInicio').value;
    console.log('fechaFinal: ', fechaFinal);
    console.log('fechaInicio: ', fechaInicio);
    consultarDatos(limit, page, campos.cliente.value, campos.tipoFactura.value, fechaInicio, fechaFinal);
  },[page, limit]);
  
  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
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
    consultarDatos(limit, page, campos.cliente.value, campos.tipoFactura.value, fechaInicio, fechaFinal);
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
            <Breadcrumb.Item active> Reportes de Inventario </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Reportes de Inventario</h4>
        </div>

      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Form.Group className="col-3">
              <Form.Label>Proveedor</Form.Label>
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
                placeholder="Seleccione una opci??n"
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
          </ButtonGroup>
        </div>

          <Col xs={2} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right" onClick={handleClick}>
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="fw-bold">5 {limit == 5 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 {limit == 10 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)}
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20 {limit == 20 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="fw-bold">30 {limit == 30 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          </Row>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="p-0">
        <Table hover className="user-table align-items-center" >
             <thead className="thead-dark" style={{minHeight: "80px"}}>
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Proveedor</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Facturas</th>
                 <th className="border-bottom">Monto</th>
                 <th className="border-bottom">Acci??n</th>
               </tr>
             </thead>
            <tbody>
            {datos.map((dato, index) => (
              <tr>
                <td>{1+index}</td>
                <td>{dato.proveedor}</td>
                <td>{dato.correo}</td>
                <td>{dato.telefono}</td>
                <td>{dato.facturasPendientes}</td>
                <td>{new Intl.NumberFormat("en-IN").format(dato.montoPendiente)}</td>
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
    </>
  );
};

export default InventarioReport;
