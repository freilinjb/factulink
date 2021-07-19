import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";

import cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import {Col,Row,Form,Button, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";

// import CustomerForm from "../../../components/forms/CustomerForm";
import CustomerContext from "../context/customer/CustomerContext";

import TableReporteCuentaPorCobrar from "../components/table/TableReporteCuentaPorCobrar";

import clienteAxios from "../config/axios";


const CuentaPorCobrar = () => {
  const customerContext = useContext(CustomerContext);

  const { getCustomer, clientesSelect } = customerContext;
  // const { getReportFactura } = comprobanteContext;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total_page, setTotal_page] = useState('');
  const [totalRow, setTotalRow] = useState(0);
  const [facturas, setFacturas] = useState([]);

  const [campos, setCampos] = useState({
    tipoFactura:"",
    cliente: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  const consultarDatos = async (limit, page, cliente = 0, tipoFactura = 0, desde = '', hasta = '') => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios
    .get(`/api/report/cuentaPorCobrar/?page=${page > 0 ? page : 1}&limit=${limit} ${cliente > 0 ? '&cliente=' + cliente : ''}${tipoFactura > 0 ? '&tipoFactura=' + tipoFactura : ''} 
    ${desde != '' ? '&fechaDesde=' + desde : ''}${hasta != '' ? '&fechaHasta=' + hasta : ''}
    `)
    .then(async (respuesta) => {
      console.log("getReportFactura: ", respuesta.data.data.total_page);
      setFacturas(respuesta.data.data.results);
      setTotalRow(respuesta.data.data.total_rows);
      setTotal_page(respuesta.data.data.total_page);
    })
    .catch((error) => {
      console.log("error: ", error);
    })
    
  }

  const consultar = async () => {
    await getCustomer();
    await consultarDatos(10,1);

  }
  
  useEffect(() => {
    let date = new Date();
    let currentDate = date.toISOString().substring(0,10);
    document.getElementById('fechaFinal').value = currentDate;

    date.setDate(date.getDate() + 7);
    currentDate = date.toISOString().substring(0,10);
    document.getElementById('fechaInicio').value = currentDate;


    consultar();
    // const someDate = new Date();
    // const numberOfDaysToAdd = 3;
    // const date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    // console.log('Prueba: ', date);
    // setCampos({
    //   ...campos,
    //   fechaInicio : date
    // })
  },[]);


  useEffect(() => {
    console.log('Facturacion: ', facturas);
  },[facturas]);

  const handleClick = (e) => {
    console.log('prueba: ', e.target.text);
    setLimit(Number(e.target.text));
  }

  const handlePress =(e)=> {
    if(e.key == 'Enter') {
      // getReportFactura(limit, page, search);
    }
  }

  useEffect(() => {
    let fechaFinal = document.getElementById('fechaFinal').value;
    let fechaInicio = document.getElementById('fechaInicio').value;
    console.log('fechaFinal: ', fechaFinal);
    console.log('fechaInicio: ', fechaInicio);
    consultarDatos(limit, page, campos.cliente.value, campos.tipoFactura.value, fechaInicio, fechaFinal);
  },[page, limit]);
  
  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    const { value } = valorSeleccionado;
    // console.log("s: ", s);
    // console.log("valor Seleciconado:", valorSeleccionado);
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
            <Breadcrumb.Item active> Reportes de Facturación </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Form.Group className="col-3">
              <Form.Label>Cliente</Form.Label>
              <Select
                options={clientesSelect}
                
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

      <TableReporteCuentaPorCobrar limit={limit} page={page} setPage={setPage} search={search} facturas={facturas} total_page={total_page} consultarDatos={consultarDatos}/>

    </>
  );
};

export default CuentaPorCobrar;
