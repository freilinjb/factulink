import React,{useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget } from "../Widgets";

import CustomerContext from "../../context/customer/CustomerContext";
import SupplierContext from "../../context/supplier/SupplierContext";
import UserContext from "../../context/user/UserContext";

import validarUsuario from "../../validation/validarUsuario";

const CustomerForm = (props) => {
  const { id } = useParams();

  const { addToast } = useToasts();
  const customerContext = useContext(CustomerContext);
  const supplierContext = useContext(SupplierContext);
  const userContext = useContext(UserContext);

  const { getIdentification, identificaciones } = customerContext;
  const { getCity, getProvince, ciudades, provincias } = supplierContext;
  const { addUser, updateUser, getTypesUser, getUserByID, usaurioEditar, tiposUsuarios, mensajeUsuario, estado } = userContext;

  const [campos, setCampos] = useState({
    nombre: "Freilin",
    apellido: "Jerez",
    tipoIdentificacion: "",
    identificacion: "",
    sexo: "",
    tipoUsuario: "",
    usuario: "",
    clave: "",
    claveRepetir: "",
    telefono: "",
    correo: "",
    fechaNacimiento: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    estado: "",
    observacion: "",
    imagen: null,
    creado_por: 1
  });

  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);

  const [errores, setErrores] = useState({});


  const consultar = async () => {
    await getIdentification();
    await getTypesUser();
    await getCity();
    await getProvince();
  }

  const sexo = [
    { value: 1, label: "Hombre" },
    { value: 2, label: "Mujer" },
    { value: 3, label: "No Definino" },
  ];

  useEffect ( () => {
    if(id > 0) {
      getUserByID(id)
    }
    consultar();
  },[]);

  useEffect (() => {
    addToast(mensajeUsuario, {
      appearance: 'info',
      autoDismiss: true,
    });
    console.log('mensaje: ', mensajeUsuario);
  },[mensajeUsuario]);

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

  useEffect(() => {
    if(usaurioEditar.idCliente > 0 ) {
      console.log('prudcotEditar: ', usaurioEditar.stockMinimo);
      console.log('incluyeItbis: ', (usaurioEditar.incluyeItbis === "activo"));
      
      setCampos({
        ...campos,
        idCliente: usaurioEditar.idCliente,
        nombre: usaurioEditar.nombre,
        apellido: usaurioEditar.apellido,
        telefono: usaurioEditar.telefono,
        correo: usaurioEditar.correo,
        identificacion: usaurioEditar.RNC,
        tipoIdentificacion: {value: usaurioEditar.idTipoIdentificacion, label: usaurioEditar.tipoIdentificacion},
        direccion: usaurioEditar.direccion,
        observacion: usaurioEditar.observacion,
        ciudad: {value: usaurioEditar.idCiudad, label: usaurioEditar.ciudad},
        provincia: {value: usaurioEditar.idProvincia, label: usaurioEditar.provincia},
        estado: (usaurioEditar.estado === 1) ? {value: 1, label: 'Activo'} : {value: 0, label: 'Inactivo'},
      });
    }

  },[usaurioEditar]);

  const handleChangeSelect = (valorSeleccionado, s) => {
    const { name } = s;
    const { value } = valorSeleccionado;
    // console.log("s: ", s);
    // console.log("valor Seleciconado:", valorSeleccionado);
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
    const resultados = validarUsuario(campos);
    console.log('resultados: ',resultados);

    if(Object.entries(resultados).length === 0) {
      if(id > 0) {
        updateUser(campos);
      } else {
        addUser(campos);
      }
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
              <h5>New User</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={8} md={12}>
                    <Row>
                      <Form.Group
                        id="nombre"
                        className="col-lg-6 col-md-6 col-sm-12"
                      >
                        <Form.Label>Nombre</Form.Label>
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
                        id="apellido"
                        className="col-lg-6 col-md-6 col-sm-12"
                      >
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="apellido"
                          autoComplete="off"
                          placeholder="Apellido"
                          value={campos.apellido}
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
                  <Col sm={12} xs={12} lg={4} md={12}>
                    <Col md={12}>
                      <ChoosePhotoWidget
                        title="Agregar una foto"
                        photo={imgData ? imgData : Profile3}
                        onChangePicture={onChangePicture}
                      />
                    </Col>
                  </Col>

                  <hr className="m-0 p-0" />

                  <Form.Group id="tipoIdentificacion" className="col-4 py-3">
                        <Form.Label>Sexo</Form.Label>
                        <Select
                          options={sexo}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="sexo"
                          value={campos.sexo}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione"
                        />
                      </Form.Group>

                      <Form.Group id="tipoUsuario" className="col-4 pt-3">
                        <Form.Label>Tipo de Usuario</Form.Label>
                        <Select
                          options={tiposUsuarios}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="tipoUsuario"
                          value={campos.tipoUsuario}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione"
                        />
                      </Form.Group>

                  <Form.Group id="usuario" className="col-4 pt-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                          type="text"
                          name="usuario"
                          autoComplete="off"
                          placeholder="Ingrese el nombre de usuario"
                          value={campos.usuario}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                   
                      <Form.Group id="correo" className="col-6 pt-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="clave"
                          autoComplete="off"
                          placeholder="Ingrese la contraseña"
                          value={campos.clave}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="correo" className="col-6 pt-3">
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="claveRepetir"
                          autoComplete="off"
                          placeholder="Ingrese la contraseña"
                          value={campos.claveRepetir}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                  <Form.Group id="telefono" className="col-4 pt-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          autoComplete="off"
                          placeholder="Ingrese el numero telefonico"
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
                          placeholder="Ingrese el correo electronico"
                          value={campos.correo}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="fechaNacimiento" className="col-4 pt-3">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaNacimiento"
                          autoComplete="off"
                          value={campos.identificacion}
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
