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
} from "@themesberg/react-bootstrap";

const PagoFacturacionModal = ({handleClose, showModal, isEdit}) => {
  const subCategoryContext = useContext(SubCategoryContext);
  const categoryContext = useContext(CategoryContext);

  const {  updateSubCategory, addSubCategory, getSubCategoryByID, subcategoriaEditar, estado } = subCategoryContext;
  const { categoriasSelect, getCategory } = categoryContext;
  
  const [campos, setCampos] = useState({
    nombre: "",
    categoria: "",
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
    getCategory();
  },[]);

  useEffect(() => {
    if(isEdit > 0) {
      getSubCategoryByID(isEdit);
    } else {
      setCampos({
        ...campos,
        nombre: "",
        categoria: "",
        estado: ""
      });
    }
  }, [isEdit]);

  useEffect(() => {

    // if(Object.entries(subcategoriaEditar).length !== 0) {
    //     // console.log('asdfasdf');
    //     setCampos({
    //       ...campos,
    //       nombre: subcategoriaEditar.subCategoria,
    //       categoria: { value: subcategoriaEditar.idCategoria, label: subcategoriaEditar.categoria, },
    //       estado: subcategoriaEditar.estado == 'activo' ? { value: 1, label: "Activo" } : { value: 0, label: "Inactivo" }
    //     })
    //   }
  },[subcategoriaEditar]);



  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    setCampos({
      ...campos,
      [name]: valorSeleccionado,
    });
  }; 
  
  const handleSubmit =(e)=> {
    e.preventDefault();
    const validacion = ValidarSubCategory(campos);
    // console.log('Campos a registrar2: ', validacion);
    console.log('Campos validados: ', campos);
    // return;
    if(Object.entries(validacion).length === 0) {
      if(isEdit > 0) {
        // console.log('Campos a actualizado: ', campos);
        campos.idSubCategoria = isEdit;
        console.log('Actualizando');
        // return;
        updateSubCategory(campos);
        
        setTimeout(() => {
          handleClose();
        }, 300);
        // console.log('se ha actualizado con exito: ', campos);
        // return;
      } else {
        // console.log('Campos a registrar: ', campos);
        console.log('Registrando');
        addSubCategory(campos);
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
        <Modal.Title className="h6"> { isEdit > 0 ? 'Actualizar Producto' : 'New adfasdf' }</Modal.Title>
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
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group id="Marca" className="col-6">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                autoComplete="off"
                placeholder="categoria"
                value={campos.categoria}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group id="Categoria" className="col-6">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                autoComplete="off"
                placeholder="categoria"
                value={campos.categoria}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group id="Marca" className="col-6">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                autoComplete="off"
                placeholder="categoria"
                value={campos.categoria}
                disabled
              ></Form.Control>
            </Form.Group>
            <Form.Group id="precio" className="col-6">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="text"
                name="precio"
                autoComplete="off"
                placeholder="precio"
                value={campos.categoria}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit}>
          Actualizar
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

export default PagoFacturacionModal;
