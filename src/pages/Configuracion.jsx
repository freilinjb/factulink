import React,{useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';

import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget } from "../components/Widgets";

import CustomerContext from "../context/customer/CustomerContext";
import SupplierContext from "../context/supplier/SupplierContext";

import validarCustomer from "../validation/validarCustomer";

import clienteAxios from "../config/axios";
import cookie from "js-cookie";

const Configuracion = (props) => {

  const { addToast } = useToasts();
  const customerContext = useContext(CustomerContext);
  const supplierContext = useContext(SupplierContext);

  const { getIdentification, identificaciones, mensajeCliente, estado } = customerContext;
  const { getCity, getProvince, ciudades, provincias } = supplierContext;

  const [campos, setCampos] = useState({
    nombre: "",
    razonSocial: "",
    tipoIdentificacion: { value: 0, label: "RNC" },
    identificacion: "",
    telefono: "",
    correo: "",
    slogan: "",
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

  const consultar = async () => {
    await getIdentification();
    await getCity();
    await getProvince();
  }

  useEffect ( () => {
    consultar();
    consultarDatos();
  },[]);

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

  const guardarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios.post('http://localhost:4000/api/bussiness',{
      nombre : campos.nombre,
      razonSocial : campos.razonSocial,
      slogan: campos.slogan,
      telefono: campos.telefono,
      correo: campos.correo,
      RNC: campos.identificacion,
      idProvincia: campos.provincia.value,
      idCiudad: campos.ciudad.value,
      direccion: campos.direccion,
    })
    .then( async (respuesta) => {
      console.log('guardarDatos: ', respuesta.data.data[0]);
      if(respuesta.data.success == 1) {
        addToast('Se ha guardado de forma correcta', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    })
    .catch((error) => {
      console.log('Error: ', error);
    })
  } 

  const consultarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios.get('http://localhost:4000/api/bussiness')
    .then( async (respuesta) => {
      console.log('Error: ', respuesta.data.data[0]);

      setCampos({
        ...campos,
        nombre: respuesta.data.data[0].nombre,
        razonSocial: respuesta.data.data[0].razonSocial,
        telefono: respuesta.data.data[0].telefono,
        correo: respuesta.data.data[0].correo,
        slogan: respuesta.data.data[0].slogan,
        identificacion: respuesta.data.data[0].identificacion,
        provincia: {value: respuesta.data.data[0].idProvincia, label: respuesta.data.data[0].provincia},
        ciudad: {value: respuesta.data.data[0].idCiudad, label: respuesta.data.data[0].ciudad},
        direccion: respuesta.data.data[0].direccion,
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    })
  }

  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    const { value } = valorSeleccionado;
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

    guardarDatos();

  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} xl={8}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>Parametros del Negocio</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Row>
                      <Form.Group
                        id="nombre"
                        className="col-lg-6 col-md-6 col-sm-6"
                      >
                        <Form.Label>Razon Social</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="nombre"
                          autoComplete="off"
                          placeholder="Nombre del producto"
                          value={campos.nombre}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="col-lg-6 col-md-6 col-sm-6"
                      >
                        <Form.Label>Razon Social</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="razonSocial"
                          autoComplete="off"
                          placeholder="Razon Social"
                          value={campos.razonSocial}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="col-6 pt-3">
                        <Form.Label>Tipo de Identificacion</Form.Label>
                        <Select
                          options={identificaciones}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="tipoIdentificacion"
                          isDisabled={true}
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
                          placeholder="Ingrese el numero de telefonico"
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
                          placeholder="Ingrese el correo del negocio"
                          value={campos.correo}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="slogan" className="col-4 pt-3">
                        <Form.Label>Slogan</Form.Label>
                        <Form.Control
                          type="text"
                          name="slogan"
                          autoComplete="off"
                          placeholder="Ingrese el slogan del negocio"
                          value={campos.slogan}
                          onChange={handleChange}
                        ></Form.Control>
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

export default Configuracion;
