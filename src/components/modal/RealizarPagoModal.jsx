import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faSave, faWindowClose} from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import {
  Row,
  Form,
  Button,
  Modal,
  InputGroup
} from "@themesberg/react-bootstrap";

const RealizarPagoModal = ({handleClose, showModal}) => {
  const unidContext = useContext(UnidContext);
  const {  updateUnid, addUnid, getUnidByID, unidadEditar, estado } = unidContext;
  const [campos, setCampos] = useState({
    nombre: "",
    estado: "",
  })

  const [errores, setErrores] = useState({});

  const formaPago = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Transferencia", label: "Transferencia" },
    { value: "Cheque", label: "Cheque" },
  ];

  const handleChange = (e) => {
    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [e.target.name]: e.target.value,
    });
  };



  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    const validacion = ValidarUnid(campos);
    // handleClose();
    setErrores(validacion);

  }  

  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6"><FontAwesomeIcon icon={faMoneyBill}/> REALIZAR PAGO </Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group>
              <Form.Label>Fecha de pago</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                autoComplete="off"
                placeholder="fecha"
                value={campos.fecha}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Forma de pago</Form.Label>
              <Select
                options={formaPago}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="formaPago"
                value={campos.formaPago}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>

            <Form.Group className="col-6 mt-1">
              <Form.Label>Monto</Form.Label>
              <InputGroup>
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  name="precioVenta"
                  
                  value={campos.precioVenta}
                  onChange={handleChange}
                  autoComplete="off"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-6 mt-1">
              <Form.Label>Deuda total</Form.Label>
              <InputGroup>
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  name="precioVenta"
                  
                  value={campos.precioVenta}
                  onChange={handleChange}
                  autoComplete="off"
                  aria-label="Amount (to the nearest dollar)"
                />
                <span className="input-group-text">.00</span>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Forma de pago</Form.Label>
              <Select
                options={formaPago}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="formaPago"
                value={campos.formaPago}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>

            
            <Form.Group>
              <Form.Label>Observacion</Form.Label>
              <Form.Control
                type="text"
                name="observacion"
                autoComplete="off"
                placeholder="observacion"
                value={campos.observacion}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSave}/> Guardar
        </Button>
        <Button
          variant="link"
          className="text-gray ms-auto"
          onClick={handleClose}
        >
          <FontAwesomeIcon icon={faWindowClose}/>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RealizarPagoModal;
