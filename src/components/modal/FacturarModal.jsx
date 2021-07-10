import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubCategoryContext from "../../context/subcategory/SubCategoryContext";
import CategoryContext from "../../context/category/CategoryContext";
import ValidarSubCategory from "../../validation/ValidarSubCategory";

import {
  Row,
  Form,
  Button,
  Modal,
  Col
} from "@themesberg/react-bootstrap";

const FacturarModal = ({handleClose, showModal, facturar}) => {
  const subCategoryContext = useContext(SubCategoryContext);
  const categoryContext = useContext(CategoryContext);

  const {  updateSubCategory, addSubCategory, getSubCategoryByID, subcategoriaEditar, estado } = subCategoryContext;
  
  const [campos, setCampos] = useState({
    nombre: "",
    efectivo: "",
    recibido: "",
    devuelto: 0,
    credito: 0,
    subTotal: 0,
    itbisTotal: 0,
    total: 0,
  })

  const [errores, setErrores] = useState({});
  const handleChange = (e) => {

    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = (valorSeleccionado, s) => {
    console.log('s:',s);
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    facturar();
    return;
    const validacion = ValidarSubCategory(campos);
    // console.log('Campos a registrar2: ', validacion);
    console.log('Campos validados: ', campos);
    // handleClose();
    setErrores(validacion);

  }  

  useEffect(() => {
    let subTotal = document.getElementById('subTotal').innerHTML;
    let itbisTotal = document.getElementById('itbisTotal').innerHTML;
    let total = document.getElementById('total').innerHTML;

    setCampos({
      ...campos,
      subTotal: subTotal,
      itbisTotal: itbisTotal,
      total: total
    });


    console.log('Datos de prueba: ', campos);
  }, [showModal])

  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6"> <h1 className="text-center">Factura de Venta</h1> </Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="justify-content-center">
            <div className="col-12">
              <div className="text-center">
                <h4>Total RD$ {campos.subTotal}</h4>
                <h4>Itbis(%18) RD$ {campos.itbisTotal}</h4>
                <h4>Itbis(%18) RD$ {campos.total}</h4>
              </div>
            </div>
          <hr/>
            <Form.Group as={Row} >
              <Form.Label column sm="4">
                Monto a pagar
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" disabled placeholder="Ingrese el monto" name="efectivo" value={Number(campos.total)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm="4">
                Monto recibido
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" placeholder="Ingrese el monto" name="recibido" value={campos.recibido}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm="4">
                Devuelto
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" disabled name="devuelto" value={Number(campos.recibido - campos.total).toFixed(2)}/>
              </Col>
            </Form.Group>
            
            <hr className="mt-1"/>
            
            <Form.Group id="observacion" className="col-12">
              <Form.Label>Observacion</Form.Label>
              <Form.Control
                type="text"
                name="precio"
                autoComplete="off"
                placeholder="Observacion"
                id="observacionFacturacion"
                value={campos.observacion}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Procesar
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FacturarModal;
