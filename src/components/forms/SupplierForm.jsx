import React,{useContext, useEffect, useState} from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget } from "../Widgets";

import ProductContext from "../../context/product/ProductContext";
import SupplierContext from "../../context/supplier/SupplierContext";

import validarSupplier from "../../validation/ValidarSupplier";

const SupplierForm = ({id}) => {
  const { addToast } = useToasts();
  const productContext = useContext(ProductContext);
  const supplierContext = useContext(SupplierContext);
  const { estado, mensaje} = productContext;
  const { getSupplierByID, updateSupplier, addSupplier, proveedorSeleccionado, getCity, getProvince, ciudades, provincias } = supplierContext;

  const [campos, setCampos] = useState({
    nombre: "",
    razonSocial: "",
    rnc: "",
    correo: "",
    telefono: "",
    ciudad: "",
    provincia: "",
    direccion: "",
    observacion: "",
    creado_por: 1,
    estado: "",
  });

  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);

  const [errores, setErrores] = useState({});

  const consultar = async () => {
    await getCity();
    await getProvince();
    if(id > 0) {
      await getSupplierByID(id);
    }
  }

  useEffect ( () => {
    consultar();
  },[])

  // useEffect (() => {
  //   addToast(mensaje, {
  //     appearance: 'info',
  //     autoDismiss: true,
  //   });
  //   console.log('mensaje: ', mensaje);
  // },[mensaje]);

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
    const resultados = validarSupplier(campos);
    console.log('resultados: ',resultados);

    if(Object.entries(resultados).length === 0) {

      console.log('Campos: ', campos);
      if(id > 0) {
        // console.log('Editando');
        updateSupplier(campos);
      } else {
        addSupplier(campos);
      }
      return;
    }

    setErrores(resultados);

  }

  // const editar = async () => {
  //   console.log('Estas editando: ', id);
  // }

  useEffect(() => {
    if(proveedorSeleccionado.length > 0) {
      const proveedor = proveedorSeleccionado[0];
      setCampos({
        ...campos,
        idProveedor: proveedor.idProveedor,
        nombre: proveedor.nombre,
        razonSocial: proveedor.razonSocial,
        rnc: proveedor.RNC,
        correo: proveedor.correo,
        telefono: proveedor.telefono,
        ciudad: { value: proveedor.idCiudad, label: proveedor.ciudad},
        provincia: { value: proveedor.idProvincia, label: proveedor.provincia},
        direccion: proveedor.direccion,
        observacion: proveedor.observacion,
        estado: (proveedor.estado == 1) ? { value: 1, label: 'Activo'} : { value: 0, label: 'Inactivo'},
      })
    }
  },[proveedorSeleccionado]);



  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} xl={8}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>Register of Supplier</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Row>
                      <Form.Group
                        id="nombre"
                        className="col-lg-4 col-md-4 col-sm-6"
                      >
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

                      <Form.Group
                        id="razonSocial"
                        className="col-lg-8 col-md-8 col-sm-6"
                      >
                        <Form.Label>Razon Social</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="razonSocial"
                          autoComplete="off"
                          placeholder=""
                          value={campos.razonSocial}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="rnc" className="col-12 pt-3">
                        <Form.Label>RNC</Form.Label>
                        <Form.Control
                          type="text"
                          name="rnc"
                          autoComplete="off"
                          placeholder="Ingrese el RNC"
                          value={campos.rnc}
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

                  
                  <Form.Group id="correo" className="col-4 pt-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                          type="text"
                          name="correo"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.correo}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group id="telefono" className="col-4 pt-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                          type="text"
                          name="telefono"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.telefono}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                  <Form.Group id="categoria" className="col-4 pt-3">
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
                      placeholder="Seleccione una opción"
                    />
                  </Form.Group>

                  <Form.Group id="provincia" className="col-3 pt-3">
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
                      placeholder="Seleccione una opcion"
                    />
                  </Form.Group>

                  <Form.Group id="rnc" className="col-9 pt-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          autoComplete="off"
                          placeholder="Ingrese la dirección"
                          value={campos.direccion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <hr className="mt-3"/>

                  <Form.Group className="mb-3" className="col-12">
                    <Form.Label>Observación</Form.Label>
                    <Form.Control as="textarea" rows="1" name="observacion" value={campos.observacion} onChange={handleChange} autoComplete="off"/>
                  </Form.Group>

                  
                
                  <Form.Group id="estado" className="col-3">
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
                  <div className="w-100"></div>
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

export default SupplierForm;
