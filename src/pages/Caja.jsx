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

const Caja = (props) => {

  const { addToast } = useToasts();
  const customerContext = useContext(CustomerContext);
  const supplierContext = useContext(SupplierContext);

  const { getIdentification } = customerContext;
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

  useEffect ( () => {
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

  const modoPos = [
    {value: 0, label: "Normal"},
    {value: 1, label: "POS"},
  ]

  const impresion = [
    {value: "Sayaying", label: "Sayaying"},
    {value: "Moral", label: "Mortal"},
  ]

  const mostrarCambios = [
    {value: 0, label: "Mostrar"},
    {value: 1, label: "No Mostrar"},
  ]

  const mostrarDevuelto = [
    {value: 0, label: "Mostrar"},
    {value: 1, label: "No Mostrar"},
  ]

  const redondear = [
    {value: 0, label: "Si"},
    {value: 1, label: "No"},
  ]

  const guardarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios.post('http://localhost:4000/api/bussiness',{
      mensajeImpresion : campos.mensajeImpresion,
      formatoImpresion : campos.formatoImpresion,
      mensajePrincipalTickets: campos.mensajePrincipalTickets,
      modoPos: campos.modoPos.value,
      redondearCambio: campos.redondearCambio.value,
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

    await clienteAxios.get('/api/bussiness/config')
    .then( async (respuesta) => {
      console.log('Error: ', respuesta.data.data[0]);

      setCampos({
        ...campos,
        mensajeImpresion: respuesta.data.data[0].mensajeImpresion,
        formatoImpresion: {value: respuesta.data.data[0].formatoImpresion, label: respuesta.data.data[0].formatoImpresion},
        mensajePrincipalTickets: respuesta.data.data[0].mensajePrincipalTickets,
        modoPos: {value:  respuesta.data.data[0].modoPos, label:  respuesta.data.data[0].modoPos == 1 ? "POS" : "Normal"},
        redondearCambio: {value:  respuesta.data.data[0].redondearCambio, label:  respuesta.data.data[0].redondearCambio == 1 ? "Si" : "No"},
        mostrarDevuelto: respuesta.data.data[0].mostrarDevuelto,
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
      <Row className="justify-content-center mt-5">
        <Col xs={12} xl={8}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>Parametros de Caja</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Row>
                    <Form.Group id="tipoComprobante" className="col-lg-6">
                      <Form.Label>Moto de facturación</Form.Label>
                      <Select
                        options={modoPos}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: { ...theme.colors, primary: "#333152" },
                        })}
                        name="modoPos"
                        value={campos.modoPos}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione un modo"
                      />
                    </Form.Group>

                    <Form.Group className="col-lg-6">
                      <Form.Label>Formato de Impresión</Form.Label>
                      <Select
                        options={impresion}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: { ...theme.colors, primary: "#333152" },
                        })}
                        name="formatoImpresion"
                        value={campos.formatoImpresion}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione un modo"
                      />
                    </Form.Group>
                    

                      <Form.Group className="col-lg-6 col-md-6 col-sm-6 mt-3">
                        <Form.Label>Mensaje de impresion</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="mensajeImpresion"
                          autoComplete="off"
                          placeholder="Ingrese el mensaje"
                          value={campos.mensajeImpresion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="col-6 pt-3">
                        <Form.Label>Mostrar el cambio</Form.Label>
                        <Select
                          options={mostrarCambios}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="mostrarDevuelto"
                          isDisabled={true}
                          value={campos.mostrarDevuelto}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione"
                        />
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

                  <Form.Group className="col-lg-3 pt-3">
                    <Form.Label>Tipo de moneda</Form.Label>
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
                  
                  <Form.Group className="col-lg-3 pt-3">
                    <Form.Label>Redondear cambio</Form.Label>
                    <Select
                      options={redondear}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="redondearCambio"
                      value={campos.redondearCambio}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>
                  
                  <Form.Group id="correo" className="col-6 pt-3">
                        <Form.Label>Mensaje principal de tickets</Form.Label>
                        <Form.Control
                          type="text"
                          name="mensajePrincipalTickets"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.mensajePrincipalTickets}
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

export default Caja;
