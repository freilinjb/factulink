import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import {
  Row,
  Form,
  Button,
  Modal,
} from "@themesberg/react-bootstrap";

const UnidModal = ({handleClose, showModal, isEdit}) => {
  const unidContext = useContext(UnidContext);
  const {  updateUnid, addUnid, getUnidByID, unidadEditar, estado } = unidContext;
  const [campos, setCampos] = useState({
    nombre: "",
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

  useEffect(() => {
    if(isEdit > 0) {
      getUnidByID(isEdit);
    } else {
      setCampos({
        ...campos,
        nombre: "",        
        estado: ""
      });
    }
  }, [isEdit]);

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
    // console.log('Campos a registrar2: ', validacion);
    console.log('Campos validados: ', campos);
    // return;
    if(Object.entries(validacion).length === 0) {
      if(isEdit > 0) {
        // console.log('Campos a actualizado: ', campos);
        campos.idUnidad = isEdit;
        console.log('Actualizando');
        // return;
        updateUnid(campos);
        
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha actualizado con exito: ', campos);
        // return;
      } else {
        // console.log('Campos a registrar: ', campos);
        console.log('Registrando');
        addUnid(campos);
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
      <Modal.Header>
        <Modal.Title className="h6"> { isEdit > 0 ? 'Update Unid' : 'New Unid' }</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group id="nombre">
              <input type="hidden" name="idSubCategoria" id="idSubCategoria" value={isEdit}/>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                autoComplete="off"
                placeholder="nombre"
                value={campos.nombre}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="codigo">
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

export default UnidModal;
