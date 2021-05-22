import React,{useContext, useEffect, useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col,Row,Card,Form,Button,InputGroup} from "@themesberg/react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget } from "../../components/Widgets";

import ProductContext from "../../context/product/ProductContext";

import validarProducto from "../../validation/validarProducto";

const ProductForm = (props) => {
  const { addToast } = useToasts();
  const productContext = useContext(ProductContext);
  const { updateProduct , getCategory, getBrand, getSubCategory, getUnidPresentation, marcas, categorias, subCategorias, unidadPresentacion, estado, mensaje} = productContext;

  const [campos, setCampos] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    subCategoria: "",
    marca: "",
    unidad: "",
    stockInicial: "",
    stockMinimo: "",
    precioVenta: "",
    precioCompra: "",
    reorden: "",
    proveedor: "",
    incluyeItbis: false,
    imagen: null,
    estado: "",
    observacion: "",
    creado_por: 1
  });

  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);

  const [errores, setErrores] = useState({});


  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const consultar = async () => {
    await getCategory();
    await getBrand();
    await getSubCategory();
    await getUnidPresentation();
  }

  useEffect ( () => {
    consultar();
  },[])

  useEffect (() => {
    addToast(mensaje, {
      appearance: 'info',
      autoDismiss: true,
    });
    console.log('mensaje: ', mensaje);
  },[mensaje]);

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
    const resultados = validarProducto(campos);
    console.log('resultados: ',resultados);

    if(Object.entries(resultados).length === 0) {
      updateProduct(campos);
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
              <h5>Editar de Producto</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                    <Row>
                      <Form.Group
                        id="codigo"
                        className="col-lg-4 col-md-4 col-sm-6"
                      >
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control
                          type="text"
                          name="codigo"
                          autoComplete="off"
                          placeholder="Codigo"
                          value={campos.codigo}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group
                        id="nombre"
                        className="col-lg-8 col-md-8 col-sm-6"
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

                      <Form.Group id="descripcion" className="col-12 pt-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          type="text"
                          name="descripcion"
                          autoComplete="off"
                          placeholder="Ingrese una descripcion del producto"
                          value={campos.descripcion}
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

                  <Form.Group id="categoria" className="col-6 pt-3">
                    <Form.Label>Categoria</Form.Label>
                    <Select
                      options={categorias}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="categoria"
                      value={campos.categoria}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione una Categoria"
                    />
                  </Form.Group>

                  <Form.Group id="subCategoria" className="col-6 pt-3">
                    <Form.Label>Sub Categoria</Form.Label>
                    <Select
                      options={subCategorias}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="subCategoria"
                      value={campos.subCategoria}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione una Sub Categoria"
                    />
                  </Form.Group>

                  <Form.Group id="marca" className="col-6 pt-3">
                    <Form.Label>Marca</Form.Label>
                    <Select
                      options={marcas}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="marca"
                      value={campos.marca}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione una Marca"
                    />
                  </Form.Group>

                  <Form.Group id="unidad" className="col-6 pt-3">
                    <Form.Label>Marca</Form.Label>
                    <Select
                      options={unidadPresentacion}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="unidad"
                      value={campos.unidad}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione una Marca"
                    />
                  </Form.Group>
                  <hr className="mt-3 p-0" />
                  <Form.Group id="stockInicial" className="col-3">
                    <Form.Label>Stock Inicial</Form.Label>
                    <Form.Control
                      
                      type="number"
                      name="stockInicial"
                      autoComplete="off"
                      placeholder="Nombre del producto"
                      value={campos.stockInicial}
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="nombre" className="col-3">
                    <Form.Label>Stock Minimo</Form.Label>
                    <Form.Control
                      
                      type="number"
                      name="stockMinimo"
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Nombre del producto"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="precioVenta" className="col-3">
                    <Form.Label>Precio de Venta</Form.Label>
                    <InputGroup>
                      <span className="input-group-text">$</span>
                      <input
                        type="text"
                        className="form-control"
                        name="precioVenta"
                        
                        value={campos.precioVenta}
                        onChange={handleChange}
                        autoComplete="off"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span className="input-group-text">.00</span>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="nombre" className="col-3">
                    <Form.Label>Precio de Compra</Form.Label>
                    <InputGroup>
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        name="precioCompra"
                        
                        value={campos.precioCompra}
                        onChange={handleChange}
                        autoComplete="off"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <span className="input-group-text">.00</span>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="reorden" className="col-3 pt-3">
                    <Form.Label>Punto de reorden</Form.Label>
                    <Form.Control
                      
                      type="number"
                      name="reorden"
                      autoComplete="off"
                      
                      value={campos.reorden}
                      onChange={handleChange}
                      placeholder="Nombre del producto"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="proveedor" className="col-3 pt-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Select
                      options={options}
                      
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: { ...theme.colors, primary: "#333152" },
                      })}
                      name="proveedor"
                      value={campos.proveedor}
                      onChange={handleChangeSelect}
                      placeholder="Seleccione una opción"
                    />
                  </Form.Group>

                  <Form.Group className="col-3 pt-4 pl-2">
                    <Form.Label></Form.Label>
                    <Form.Check
                      label="Incluye ITBIS"
                      name="incluyeItbis"
                      id="incluyeItbis"
                      value={campos.incluyeItbis}
                      onChange={handleChange}
                      htmlFor="incluyeItbis"
                    />
                  </Form.Group>

                  <Form.Group id="estado" className="col-3 pt-3">
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

                  <Form.Group className="mb-3" className="col-12 pt-4 pl-2">
                    <Form.Label>Observación</Form.Label>
                    <Form.Control as="textarea" rows="1" name="observacion" value={campos.observacion} onChange={handleChange} autoComplete="off"/>
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

export default ProductForm;
