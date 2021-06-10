import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryContext from "../../context/category/CategoryContext";
import validarCategory from "../../validation/ValidarCategory";

import {
  Row,
  Form,
  Button,
  Modal,
} from "@themesberg/react-bootstrap";

const CategoryModal = ({handleClose, showModal, isEdit}) => {
  const categoryContext = useContext(CategoryContext);
  const {  updateCategory, addCategory, getCategoryByID, categoriaEditar, estado } = categoryContext;
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
    // console.log('prueba');
    if(isEdit > 0) {
      getCategoryByID(isEdit);
    } else {
      setCampos({
        ...campos,
        nombre: "",
        estado: ""
      });
    }
  }, [isEdit]);

  useEffect(() => {
    // console.log('Prueba verificado: ', categoriaEditar);

    if(Object.entries(categoriaEditar).length !== 0) {
        // console.log('asdfasdf');
        setCampos({
          ...campos,
          nombre: categoriaEditar.categoria,
          estado: categoriaEditar.estado == 'activo' ? { value: 1, label: "Activo" } : { value: 0, label: "Inactivo" }
        })
      }
  },[categoriaEditar]);



  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    const validacion = validarCategory(campos);
    // console.log('Campos a registrar2: ', validacion);

    
    if(Object.entries(validacion).length === 0) {
      if(isEdit > 0) {
        // console.log('Campos a actualizado: ', campos);
        campos.idCategoria = isEdit;
        updateCategory(campos);
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha actualizado con exito: ', campos);
        return;
      } else {
        // console.log('Campos a registrar: ', campos);
        addCategory(campos);
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
        <Modal.Title className="h6"> { isEdit > 0 ? 'Update Category' : 'New Category' }</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group id="codigo">
              <input type="hidden" name="idCategoria" id="idCategoria" value={isEdit}/>
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

export default CategoryModal;
