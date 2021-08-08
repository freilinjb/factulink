import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerContext from "../../context/customer/CustomerContext";
import ComprobanteContext from "../../context/comprobante/ComprobanteContext";
import CategoryContext from "../../context/category/CategoryContext";
import ValidarComprobante from "../../validation/ValidarComprobante";

import {
  Row,
  Form,
  Button,
  Modal,
  InputGroup
} from "@themesberg/react-bootstrap";

const ComprobanteModal = ({handleClose, showModal, isEdit}) => {
  const comprobanteContext = useContext(ComprobanteContext);
  const customerContext = useContext(CustomerContext);

  const { getComprobantes,  comprobantes} = customerContext;
  const {  addComprobante, updateComprobante, getComprobanteByID, comprobanteEditar, estado } = comprobanteContext;
  const [campos, setCampos] = useState({
    tipoComprobante: "",
    fechaVencimiento: "",
    inicio: "",
    final: "",
    secuencia: "",
    sucursal: "",
    estado: "",
  })

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [e.target.name]: e.target.value,
    });
  };

  const sucursal = [
    { value: "0", label: "General" },
  ];

  useEffect(() => {
    getComprobantes();
  },[]);

  useEffect(() => {
    if(isEdit > 0) {
      getComprobanteByID(isEdit);
    } else {
      setCampos({
        ...campos,
        tipoComprobante: "",
        fechaVencimiento: "",
        inicio: "",
        final: "",
        secuencia: "",
        sucursal: "",
        estado: "",
      });
    }
  }, [isEdit]);

  useEffect(() => {

    // if(Object.entries(comprobanteEditar).length !== 0) {
    //     // console.log('asdfasdf');
    //     setCampos({
    //       ...campos,
    //       tipoComprobante: comprobanteEditar.tipoComprobante,
    //       sucursal: { value: comprobanteEditar.idCategoria, label: comprobanteEditar.categoria, },
    //       estado: comprobanteEditar.estado == 'activo' ? { value: 1, label: "Activo" } : { value: 0, label: "Inactivo" }
    //     })
    //   }
  },[comprobanteEditar]);



  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    const validacion = ValidarComprobante(campos);
    // console.log('Campos a registrar2: ', validacion);
    // return;
    if(Object.entries(validacion).length === 0) {
      if(isEdit > 0) {
        // console.log('Campos a actualizado: ', campos);
        campos.tipoComprobante = isEdit;
        console.log('Actualizando');
        // return;
        updateComprobante(campos);
        
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha actualizado con exito: ', campos);
        // return;
      } else {
        // console.log('Campos a registrar: ', campos);
        console.log('Registrando');
        addComprobante(campos);
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha registrado con exito');
        return;
      }
      
    }
    // handleClose();
    setErrores(validacion);

  }  

  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose}>
      <Modal.Header className="bg-dark text-white">
        <Modal.Title className="h6"> { isEdit > 0 ? 'Registrar nuevos Comprobantes' : 'Actualizar Comprobantes' }</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>

            <label htmlFor="">En esta pantalla se definen los parametros para ingresar 
            el NFC(Numero de comprobante fiscal). Estos codigos son asignados por la
             direccion general de Impuestos Internos (DGII) y deben se solicitados 
             por su empresa.</label>
             <hr className="my-2"/>
            <Form.Group id="tipoComprobante" className="mt-1 col-6">
              <Form.Label>Tipo de Comprobante</Form.Label>
              <Select
                options={comprobantes}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="tipoComprobante"
                value={campos.tipoComprobante}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />  
            </Form.Group>
            <Form.Group id="inicio" className="col-6">
                <Form.Label>Fecha de vencimiento</Form.Label>
                <InputGroup>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaVencimiento"
                    value={campos.fechaVencimiento}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  </InputGroup>
            </Form.Group>
            <hr className="mt-3"/>
            <Form.Group id="inicio" className="col-6">
                <Form.Label>Secuencia de Inicio</Form.Label>
                <InputGroup>
                  <span className="input-group-text">#</span>
                  <input
                    type="number"
                    className="form-control"
                    name="inicio"
                    min="0"
                    value={campos.inicio}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  </InputGroup>
            </Form.Group>
            <Form.Group id="final" className="col-6">
                <Form.Label>Secuencia Final</Form.Label>
                <InputGroup>
                  <span className="input-group-text">#</span>
                  <input
                    type="number"
                    className="form-control"
                    min="10"
                    name="final"
                    value={campos.final}
                    onChange={handleChange}
                    autoComplete="off"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </InputGroup>
            </Form.Group>
            <Form.Group id="cantidadAprobada" className="col-6">
                <Form.Label>Cantidad de Comprobantes</Form.Label>
                <InputGroup>
                  <span className="input-group-text">#</span>
                  <input
                    type="cantidadAprobada"
                    disabled
                    min="0"
                    className="form-control"
                    name="secuencia"
                    value={campos.inicio > 0 ? (campos.final - campos.inicio) : 0}
                    autoComplete="off"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </InputGroup>
            </Form.Group>
            <Form.Group id="proximoComprobante" className="col-6">
                <Form.Label>Proximo NFC a Emitir</Form.Label>
                <InputGroup>
                  <span className="input-group-text">#</span>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="proximoComprobante"
                    value={(campos.inicio - campos.final) > 0 ? campos.inicio+1 : 0}
                    autoComplete="off"
                    aria-label="Amount (to the nearest dollar)"
                  />
                </InputGroup>
            </Form.Group>
            <Form.Group id="sucursal" className="col-6">
              <Form.Label>Sucursal</Form.Label>
              <Select
                options={sucursal}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="sucursal"
                value={campos.sucursal}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>
            <Form.Group id="estado" className="col-6">
              <Form.Label>Estado</Form.Label>
              <Select
                options={estado}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: { ...theme.colors, primary: "#333152" },
                })}
                name="estado"
                value={campos.estado}
                onChange={handleChangeSelect}
                placeholder="Seleccione una opción"
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Save
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

export default ComprobanteModal;
