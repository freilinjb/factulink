import React,{useContext, useEffect, useState} from "react";

import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget } from "../Widgets";

import CustomerContext from "../../context/customer/CustomerContext";
import SupplierContext from "../../context/supplier/SupplierContext";

import validarCustomer from "../../validation/validarCustomer";

const CustomerForm = (props) => {
  const { addToast } = useToasts();
  const customerContext = useContext(CustomerContext);
  const supplierContext = useContext(SupplierContext);

  const { addCustomer, getComprobantes, getIdentification, comprobantes, identificaciones, mensajeCliente, estado } = customerContext;
  const { getCity, getProvince, ciudades, provincias } = supplierContext;

  const [campos, setCampos] = useState({
    nombre: "",
    tipoIdentificacion: "",
    identificacion: "",
    telefono: "",
    correo: "",
    sitioWeb: "",
    tipoComprobante: "",
    vendedor: "",
    plazoPago: "",
    limiteCredito: "",
    imagen: null,
    provincia: "",
    ciudad: "",
    direccion: "",
    estado: "",
    observacion: "",
    creado_por: 1
  });

  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);

  const [errores, setErrores] = useState({});


  const vendedor = [
    { value: 1, label: "Juan Mendoza" },
    { value: 2, label: "Guillermo Suarez" },
    { value: 3, label: "Luperon" },
  ];

  const plazoPago = [
    { value: 0, label: "De Contado" },
    { value: 8, label: "8 Días" },
    { value: 15, label: "15 Días" },
    { value: 30, label: "30 Días" },
    { value: 60, label: "60 Días" },
  ];



  const consultar = async () => {
    await getComprobantes();
    await getIdentification();
    await getCity();
    await getProvince();
  }

  useEffect ( () => {
    consultar();
  },[])

  useEffect (() => {
    addToast(mensajeCliente, {
      appearance: 'info',
      autoDismiss: true,
    });
    console.log('mensaje: ', mensajeCliente);
  },[mensajeCliente]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(`${e.target.name}`, e.target.value);
    setCampos({
      ...campos,
      [name]: value,
    });
  };

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

  const onChangePicture = e => {
      const file = e.target.files[0];
      setPicture(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setCampos({
          ...campos,
          imagen: file
        })
      });
      reader.readAsDataURL(file);
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    const resultados = validarCustomer(campos);
    console.log('resultados: ',resultados);

    if(Object.entries(resultados).length === 0) {
      addCustomer(campos);
      console.log('se ha registrado con exito');
      return;
    }

    setErrores(resultados);

  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} xl={8}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>New Client</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Row>
                      <Form.Group
                        id="nombre"
                        className="col-lg-12 col-md-6 col-sm-6"
                      >
                        <Form.Label>Nombre / Razon Social</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="nombre"
                          autoComplete="off"
                          placeholder="Nombre del producto"
                          value={campos.nombre}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="tipoIdentificacion" className="col-6 pt-3">
                        <Form.Label>Tipo de Identificacion</Form.Label>
                        <Select
                          options={identificaciones}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="tipoIdentificacion"
                          value={campos.tipoIdentificacion}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione"
                        />
                      </Form.Group>

                      <Form.Group id="identificacion" className="col-6 pt-3">
                        <Form.Label>Identificacion</Form.Label>
                        <Form.Control
                          type="text"
                          name="identificacion"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.identificacion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>  

                    </Row>
                  </Col>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Col md={12}>
                      <ChoosePhotoWidget
                        title="Agregar una foto"
                        photo={imgData ? imgData : Profile3}
                        onChangePicture={onChangePicture}
                      />
                    </Col>
                  </Col>

                  <hr className="m-0 p-0" />


                  <Form.Group id="telefono" className="col-4 pt-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          autoComplete="off"
                          placeholder="809-1234-5678"
                          value={campos.telefono}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                   
                      <Form.Group id="correo" className="col-4 pt-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                          type="text"
                          name="correo"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.descripcion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="sitioWeb" className="col-4 pt-3">
                        <Form.Label>Sitio Web</Form.Label>
                        <Form.Control
                          type="text"
                          name="sitioWeb"
                          autoComplete="off"
                          placeholder="www.example.com"
                          value={campos.sitioWeb}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                      <hr className="mt-3 p-0"/>
      

                  <Form.Group id="tipoComprobante" className="col-lg-3 pt-3">
                    <Form.Label>Tipo de comprobante</Form.Label>
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
                      placeholder="Seleccione"
                    />
                  </Form.Group>

                  <Form.Group id="vendedor" className="col-lg-3 pt-3">
                    <Form.Label>Vendedor</Form.Label>
                    <Select
                      options={vendedor}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="vendedor"
                      value={campos.vendedor}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>

                  <Form.Group id="plazoPago" className="col-lg-3 pt-3">
                    <Form.Label>Plazo de pago</Form.Label>
                    <Select
                      options={plazoPago}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="plazoPago"
                      value={campos.plazoPago}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>

                  <Form.Group id="limiteCredito" className="col-3 pt-3">
                    <Form.Label>Limite de Credito</Form.Label>
                    <InputGroup>
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        name="limiteCredito"
                        
                        value={campos.limiteCredito}
                        onChange={handleChange}
                        autoComplete="off"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span className="input-group-text">.00</span>
                    </InputGroup>
                  </Form.Group>

                  <hr className="mt-3 p-0"/>
                  <Form.Group id="tipoComprobante" className="col-lg-3 pt-3">
                    <Form.Label>Provincia</Form.Label>
                    <Select
                      options={provincias}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="provincia"
                      value={campos.provincia}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>
                  
                  <Form.Group id="tipoComprobante" className="col-lg-3 pt-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Select
                      options={ciudades}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="ciudad"
                      value={campos.ciudad}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>
                  
                  <Form.Group id="correo" className="col-6 pt-3">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.direccion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>



                  <Form.Group className="mb-3" className="col-9">
                    <Form.Label>Observación</Form.Label>
                    <Form.Control as="textarea" rows="1" name="observacion" value={campos.observacion} onChange={handleChange} autoComplete="off"/>
                  </Form.Group>

                  
                  <Form.Group id="estado" className="col-3 pt-1">
                    <Form.Label>Estado</Form.Label>
                    <Select
                      options={estado}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="estado"
                      onChange={handleChangeSelect}
                      value={campos.estado}
                    />
                  </Form.Group>

                  <div className="mt-3 col-auto">
                    <Button variant="primary" type="submit">
                      Guardar
                    </Button>
                  </div>
                  <div className="mt-3 col-auto">
                    <Button variant="secondary" type="submit"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerForm;
