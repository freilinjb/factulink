import React,{ useContext, useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import clienteAxios from "../../config/axios";
import cookie from "js-cookie";
import Swal from "sweetalert2";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnidContext from "../../context/unid/UnidContext";
import ValidarUnid from "../../validation/ValidarUnid";

import {
  Row,
  Form,
  Button,
  Modal,
} from "@themesberg/react-bootstrap";

const NotaCreditoModal = ({handleClose, showModal, isEdit}) => {

  const [productosSelect, setProductoSelect] = useState([]);
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
  
  const LoadingMessage  = props => {
    return (
      <div
        {...props.innerProps}
        style={props.getStyles('loadingMessage', props)}
      >
        {props.children}
      </div>
    )
  }

  const promiseOptions = inputValue =>
  new Promise(resolve => {

    // setTimeout(() => {
      resolve(filterProducto(inputValue));
    // }, 1000);
  });

  const filterProducto = async (inputValue) => {
    if(inputValue.length >= 2) {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

      return new Promise((resolve, reject) => {
        clienteAxios.get(`/api/nota_credito/facturas/${Number(inputValue)}`)
         .then(function ({data}) {
          console.log('ResoyestaR: ', data.data);
          // return;
          let resultados = [];
          setProductoSelect(data.data);
          data.data.forEach((key, index) => {
            resultados.push({
              value: key.fecha,
              label: key.fecha
            });
          })
          console.log("getReportFactura: ", resultados);
          // return(resultados);

          resolve(resultados);
         })
         .catch(function (error) {
          resolve();
         });
       });

      return;
    }
  }


  return (
    <Modal as={Modal.Dialog} centered show={showModal} onHide={handleClose} size="xl">
      <Modal.Header>
        <Modal.Title className="h6"> Registro de Notas de Credito</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group id="nombre" className="col-6">
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
            <Form.Group className="col-6">
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

            <Form.Group className="col-6">
              <Form.Label>Factura</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  styles={{
                    loadingMessage: base => ({
                      ...base,
                      color: 'white',
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 8,
                    colors: { ...theme.colors, primary: "#333152" },
                  })}
                  components={{ LoadingMessage }}
                  loadOptions={promiseOptions}
                  name="factura"
                  value={campos.factura}
                  onChange={handleChangeSelect}
                  placeholder="Seleccione un factura"
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

export default NotaCreditoModal;
