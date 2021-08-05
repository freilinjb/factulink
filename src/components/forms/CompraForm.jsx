import React,{useContext, useEffect, useState} from "react";

import clienteAxios from "../../config/axios";
import cookie from "js-cookie";
import Swal from "sweetalert2";


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
  const { getSupplierByID, updateSupplier, addSupplier, proveedorSeleccionado, getCity, getProvince, ciudades, provincias, getSupplier, proveedoresSelect } = supplierContext;

  // const [productosCompras, setProductoComporas] = useState([
  //   {idProducto: 1, nombre: "Arenque",marca: "ARENQUE", categoria: "Hola Mundo", precio: 55, cantidad: 544}
  // ]);

  const [productosCompras, setProductoComporas] = useState([]);


  const [productosSelect, setProductoSelect] = useState([]);
  const [campos, setCampos] = useState({
    tipoCompra: "",
    documento: "",
    fecha: "2021-08-02",
    proveedor: "",
    almacen: "",
    garantia: "",
    producto: "",
    cantidad: 1,
    precio: 500,
    estado: "",
  });

  const [errores, setErrores] = useState({});
  const [consultando, setConsultando] = useState(false);

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

  useEffect(() => {
    // console.log('Cambio el producto');

    let filtro = productosSelect.filter(i => i.idProducto == campos.producto.value);

    console.log('Ejecutar: ', filtro);
    console.log('Ejecutar2: ', productosSelect);
    if(filtro.length > 0) {
      //--prueba
      console.log('Ejecutando metodo');
      const productoTemp = productosCompras;
      console.log('Producto agregar: ', productoTemp);
        let filtro2 = productoTemp.filter(i => i.idProducto == campos.producto.value);
        if(filtro2.length > 0) {
        // {idProducto: 1, nombre: "Arenque",marca: "ARENQUE", categoria: "Hola Mundo", precio: 55, cantidad: 544}
          console.log('encontrado');
        
        productoTemp.push({
            idProducto: filtro[0].idProducto,
            nombre: filtro[0].nombre,
            marca: filtro[0].marca,
            categoria: filtro[0].categoria,
            precio: filtro[0].precioCompra,
            cantidad: campos.cantidad,
          });
          setProductoComporas(productoTemp);
          console.log('Producto agregado: ', productoTemp);
          //--fin prueba
        } else {
          console.log('encontrado2');

          productoTemp.push({
            idProducto: filtro[0].idProducto,
            nombre: filtro[0].nombre,
            marca: filtro[0].marca,
            categoria: filtro[0].categoria,
            precio: filtro[0].precioCompra,
            cantidad: campos.cantidad,
          });
          setProductoComporas(productoTemp);
        }
      setCampos({
        ...campos,
        precio: filtro[0].precioCompra 
      });
    }
    


  },[campos.producto]);

  // const procesar = e=> {
  //   if(e.key === 'Enter') {
  //     // agregarProducto();
  //     console.log('Agregando producto');
  //     console.log('e:key: ', e.key);
  //   }
  // }
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

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log('Enviando datos');
    //ESTRUCTURANDO LOS DATOS DEL FORMULARIO
    let product_arr = [];
    productosCompras.forEach((key, index) => {
      console.log('El precio generado: ', document.getElementById(`idProductoPrecio${key.idProducto}`).value);

      let precio = Number(document.getElementById(`idProductoPrecio${key.idProducto}`).value) ? Number(document.getElementById(`idProductoPrecio${key.idProducto}`).value) : Number(key.precioCompra);
      let cantidad = Number(document.getElementById(`idProductoCantidad${key.idProducto}`).value) ? Number(document.getElementById(`idProductoCantidad${key.idProducto}`).value) : Number(campos.cantidad);
      product_arr.push({
        idProducto: key.idProducto, 
        nombre: key.nombre,
        marca: key.marca,
        categoria: key.categoria,
        precio: Number(precio),
        cantidad: Number(cantidad),
      })
    })
    let datos = {
        documento: campos.documento,
        fecha: document.getElementById('fecha').value,
        idProveedor: campos.proveedor.value,
        idTipoFactura: campos.tipoCompra.value,
        idAlmacen: campos.almacen.value,
        garantia: true,
        diasGarantia: campos.garantia.value,
        idEstadoCompra: 1,
        productos: product_arr
    };
    // console.log('Datos del forumario: ', datos);
    // return;
    const resultados = validarSupplier(campos);
    ///Enviando datos;

    console.log('Datos enviados: ', productosCompras);
    const productos = productosCompras;
    productosCompras.forEach((key, index) => {
      if(productos[index].idProducto === key.idProducto) {
        const cantidad = document.getElementById(`idProductoCantidad${key.idProducto}`).value;
        productos[index].cantidad = Number(cantidad);
      } 
      if(productos[index].idProducto === key.idProducto) {
        const precio = document.getElementById(`idProductoPrecio${key.idProducto}`).value;
        productos[index].cantidad = Number(precio);
      } 
    });

    await clienteAxios.post('/api/report/compra',{
      documento: campos.documento,
      fecha: campos.fecha,
      idProveedor: campos.proveedor.value,
      idTipoFactura: campos.tipoCompra.value,
      idAlmacen: campos.almacen.value,
      garantia: true,
      diasGarantia: campos.garantia.value,
      idEstadoCompra: 1,
      productos: productosCompras
      }).then(async (respuesta) => {
         
          console.log("respuesta: ", respuesta.data.data);
          if(respuesta.data.data.status === 200) {
            Swal.fire(
              'Good job!',
              'Se ha guardado de forma correcta!',
              'success'
            ).then((respuesta2) => {
              //Redireccionar
              // history.replace("/product/category");
              console.log('prueba: ', respuesta2);
              setProductoComporas([]);
              setCampos({
                ...campos,
                tipoCompra: "",
                documento: "",
                fecha: "2021-08-02",
                proveedor: "",
                almacen: "",
                garantia: "",
                producto: "",
                cantidad: 1,
                precio: 500,
                estado: "",
              });
            });
          }

        })
        .catch((error) => {
          console.log("error: ", error);
        })

    // console.log('resultados: ',resultados);

    return;
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

  useEffect(() => {
    console.log('Cambio el producto');
  },[productosCompras]);

  const agregarProducto = () => {
    console.log('Ejecutando metodo');
    const producto = productosSelect.filter(i => i.idProducto == campos.producto.value);
    const productoTemp = productosCompras;
    console.log('Producto agregar: ', producto);
    if(producto.length > 0) {
      // {idProducto: 1, nombre: "Arenque",marca: "ARENQUE", categoria: "Hola Mundo", precio: 55, cantidad: 544}
      productoTemp.push({
        idProducto: producto[0].idProducto,
        nombre: producto[0].nombre,
        marca: producto[0].marca,
        categoria: producto[0].categoria,
        precio: producto[0].precioVenta,
        cantidad: campos.cantidad,
      });
      setProductoComporas(productoTemp);

      console.log('Producto agregado: ', productoTemp);
    }
  }


  const filterProducto = async (inputValue) => {
    if(inputValue.length >= 4) {
      clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

      return new Promise((resolve, reject) => {
        clienteAxios.get(`/api/product?search=${inputValue}`)
         .then(function ({data}) {
          console.log('ResoyestaR: ', data.data);
          // return;
          let resultados = [];
          setProductoSelect(data.data);
          data.data.forEach((key, index) => {
            resultados.push({
              value: key.idProducto,
              label: key.nombre
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
      //utilizando callback
      // await clienteAxios
      //   .get(`/api/product?search=${inputValue}`)
      //   .then(async (respuesta) => {
      //     console.log('ResoyestaR: ', respuesta.data.data);
      //     // return;
      //     let resultados = [];
      //     respuesta.data.data.forEach((key, index) => {
      //       resultados.push({
      //         value: key.idProducto,
      //         label: key.nombre
      //       });
      //     })
      //     console.log("getReportFactura: ", resultados);
      //     return(resultados);
      //   })
      //   .catch((error) => {
      //     console.log("error: ", error);
      //   })
    }

    // return proveedoresSelect.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
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
              <Form>
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
                          placeholder="Seleccione"
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
                          name="producto"
                          value={campos.producto}
                          onChange={handleChangeSelect}
                          placeholder="Seleccione un producto"
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
                          type="number"
                          name="precio"
                          autoComplete="off"
                          placeholder="Precio"
                          value={campos.precio}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                  <div className="w-100"></div>
                  <div className="mt-3 col-auto">
                    <Button variant="primary" type="button"
                      onClick={handleSubmit}
                    >
                      Guardar
                    </Button>
                  </div>
                  <div className="mt-3 col-auto">
                    <Button variant="secondary"
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
            <TableRegistroCompras productosCompras={productosCompras} setProductoComporas={setProductoComporas}/>
        </Col>
      </Row>
    </>
  );
};

export default CompraForm;
