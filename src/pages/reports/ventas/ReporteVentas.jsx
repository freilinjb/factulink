import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { faHome, faSearch, faCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import {Col,Row,Card,Form,Button,InputGroup, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";

// import CustomerForm from "../../../components/forms/CustomerForm";
import SupplierContext from "../../../context/supplier/SupplierContext";
import CustomerContext from "../../../context/customer/CustomerContext";

const ReporteVentas = () => {
  const supplierContext = useContext(SupplierContext);
  const customerContext = useContext(CustomerContext);

  const { getCustomer, clientesSelect } = customerContext;
  const { getSupplier, proveedoresSelect } = supplierContext;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [campos, setCampos] = useState({
    proveedor:"",
    cliente: "",
  });

  const consultar = async () => {
    await getSupplier();
    await getCustomer();
  }
  
  useEffect(() => {
    consultar();
  },[]);

  const handleClick = (e) => {
    console.log('prueba: ', e.target.text);
    setLimit(Number(e.target.text));
  }

  const handlePress =(e)=> {
    if(e.key == 'Enter') {
      // getAllSupplier(limit, page, search);
    }
  }
  
  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    const { value } = valorSeleccionado;
    console.log("s: ", s);
    console.log("valor Seleciconado:", valorSeleccionado);
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  };  

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
            <Breadcrumb.Item active> Admin Supplier </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Form.Group id="proveedor" className="col-3">
              <Form.Label>Cliente</Form.Label>
              <Select
                options={clientesSelect}
                
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="cliente"
                isMulti
                value={campos.cliente}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>
            <Form.Group id="proveedor" className="col-3">
              <Form.Label>Tipo de Factura</Form.Label>
              <Select
                options={proveedoresSelect}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="proveedor"
                isMulti
                value={campos.proveedor}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>
            <div className="form-group col-2">
              <label for="">Fecha Inicio</label>
              <input type="date" class="form-control" name="fechaInicio" id="fechaInicio" value="11/12/2021" placeholder=""/>
            </div>

            <div className="form-group col-2">
              <label for="">Fecha Final</label>
              <input type="date" class="form-control" name="fechaFinal" id="fechaFinal" value="11/12/2021" placeholder=""/>
            </div>
              
            <div className="col-1 mt-4">
              <Button>Buscar</Button>
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
    </>
  );
};

export default ReporteVentas;
