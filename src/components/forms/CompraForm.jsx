import React,{useContext, useEffect, useState} from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { useToasts } from 'react-toast-notifications';

import TableRegistroCompras from "../table/TableRegistroCompras";

import ProductContext from "../../context/product/ProductContext";
// import SupplierContext from "../../context/supplier/SupplierContext";

import validarSupplier from "../../validation/ValidarSupplier";

import SupplierContext from "../../context/supplier/SupplierContext";


const CompraForm = ({id}) => {
  // const supplierContext = useContext(SupplierContext);
  // const { getSupplier, proveedoresSelect } = supplierContext;

  const { addToast } = useToasts();
  const productContext = useContext(ProductContext);
  const supplierContext = useContext(SupplierContext);
  const { estado, mensaje} = productContext;
  const { getSupplierByID, updateSupplier, addSupplier, proveedorSeleccionado, getCity, getProvince, ciudades, provincias, getSupplier, proveedoresSelect } = supplierContext;

  const [productosCompras, setProductoComporas] = useState([
    {idProducto: 1, nombre: "Arenque",marca: "ARENQUE", categoria: "Hola Mundo", precio: 55, cantidad: 544}
  ]);
  const [campos, setCampos] = useState({
    tipoCompra: "",
    documento: "",
    // fecha: "",
    proveedor: "",
    almacen: "",
    garantia: "",
    producto: "",
    cantidad: 1,
    precio: "",
    estado: "",
  });

  const [errores, setErrores] = useState({});

  const consultar = async () => {
    await getCity();
    await getSupplier();
    await getProvince();
    if(id > 0) {
      await getSupplierByID(id);
    }
  }

  const tipoCompra = [
    {value: 13, label: "Credito"},
    {value: 14, label: "Contado"}
  ]

  const garantias = [
    {value: 0, label: "Sin Garancia"},
    {value: 15, label: "15 días"},
    {value: 30, label: "30 días"},
    {value: 60, label: "60 días"}
  ]

  useEffect ( () => {
    let date = new Date();
    // date.setDate(date.getDate() - 7);
    let currentDate = date.toISOString().substring(0,10);
    document.getElementById('fecha').value = currentDate;

    consultar();
  },[])

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
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

  const filterColors = (inputValue) => {
    console.log('Valor de la busqueda: ', inputValue);
    proveedoresSelect.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  }
  


  return (
    <>
      <Row className="justify-content-center">
        <Col xs={5} xl={5}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>Registro de Compras</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="col-4">
                      <Form.Label>Tipo de Compra</Form.Label>
                        <Select
                          options={tipoCompra}
                          
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 8,
                            colors: { ...theme.colors, primary: "#333152" },
                          })}
                          name="tipoCompra"
                          value={campos.tipoCompra}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione una opcion"
                        />
                      </Form.Group>

                      <Form.Group
                        className="col-lg-4 col-md-3 col-sm-6"
                      >
                        <Form.Label>Documento</Form.Label>
                        <Form.Control
                          type="text"
                          name="documento"
                          autoComplete="off"
                          placeholder="Numero de documento"
                          value={campos.documento}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group
                        id="razonSocial"
                        className="col-lg-4 col-md-3 col-sm-6"
                      >
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                          id="fecha"
                          type="date"
                          name="fecha"
                          autoComplete="off"
                          placeholder=""
                          value={campos.fecha}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="col-4">
                      <Form.Label>Proveedor</Form.Label>
                      <Select
                        options={proveedoresSelect}
                        
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: { ...theme.colors, primary: "#333152" },
                        })}
                        name="proveedor"
                        value={campos.proveedor}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione"
                      />
                    </Form.Group>
                    
                    <Form.Group className="col-4">
                    <Form.Label>Almacen</Form.Label>
                      <Select
                        options={[{value: 1, label: "GENERAL"}]}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: { ...theme.colors, primary: "#333152" },
                        })}
                        name="almacen"
                        value={campos.almacen}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione"
                      />
                    </Form.Group>

                    <Form.Group className="col-4">
                    <Form.Label>Garancia</Form.Label>
                    <Select
                      options={garantias}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="garantia"
                      value={campos.garantia}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione"
                    />
                  </Form.Group>

                      <hr className="mt-3"/>

                    <Form.Group className="col-6">
                    <Form.Label>Producto</Form.Label>
                      <Select
                        options={provincias}
                        
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 8,
                          colors: { ...theme.colors, primary: "#333152" },
                        })}
                        name="almacen"
                        value={campos.almacen}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione una opcion"
                      />
                    </Form.Group>

                      <Form.Group
                          className="col-lg-3 col-md-3 col-sm-6"
                        > 
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                          type="text"
                          name="cantidad"
                          autoComplete="off"
                          placeholder="Cantidad"
                          value={campos.cantidad}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group
                          className="col-lg-3 col-md-3 col-sm-6"
                        > 
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                          type="text"
                          name="precio"
                          autoComplete="off"
                          placeholder="Precio"
                          value={campos.precio}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>


                      <Form.Group className="col-12">
                    <Form.Label>Producto</Form.Label>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        // options={provincias}
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
                        name="almacen"
                        value={campos.almacen}
                        onChange={handleChangeSelect}
                        placeholder="Seleccione una opcion"
                      />
                    </Form.Group>

                  {/* <Form.Group className="mb-3" className="col-9">
                    <Form.Label>Observación</Form.Label>
                    <Form.Control as="textarea" rows="1" name="observacion" value={campos.observacion} onChange={handleChange} autoComplete="off"/>
                  </Form.Group> */}

                  
                
                  {/* <Form.Group id="estado" className="col-3">
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
                  </Form.Group> */}

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
      
        <Col xs={7}>
            <TableRegistroCompras productosCompras={productosCompras}/>
        </Col>
      </Row>
    </>
  );
};

export default CompraForm;
