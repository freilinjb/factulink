import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup
} from "@themesberg/react-bootstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import Select from "react-select";

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";


const Product = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Admin Product</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} xl={8}>
          <Card border="ligh" className="bg-white shadow-sm mb-4 px-3 pb-3">
            <Card.Header>
              <h5>Registro de Producto</h5>
            </Card.Header>
            <Card.Body>

            <Form>

              <Row>
                  <Col sm={12} xs={12} lg={6} md={12}>
                  <Row>
                    <Form.Group id="codigo" className="col-lg-4 col-md-4 col-sm-6">
                        <Form.Label>Codigo</Form.Label>
                        <Form.Control type="text" name="codigo" autoComplete="off" placeholder="Codigo"></Form.Control>
                    </Form.Group>

                    <Form.Group id="nombre" className="col-lg-8 col-md-8 col-sm-6">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required type="text" name="nombre" autoComplete="off" placeholder="Nombre del producto"></Form.Control>
                    </Form.Group>

                    <Form.Group id="descripcion" className="col-12">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="descripcion" autoComplete="off" placeholder="Ingrese una descripcion del producto"></Form.Control>
                    </Form.Group>
                  </Row>
                  </Col>
                  <Col sm={12} xs={12} lg={6} md={12}>
                  <Col md={12}>

                        <ChoosePhotoWidget
                            title="Agregar una foto al producto"
                            photo={Profile3}
                        />
                        </Col>
                  </Col>

                  <hr className="m-0 p-0"/>

                  <Form.Group id="categoria" className="col-6 pt-3">
                    <Form.Label>Categoria</Form.Label>
                    <Select options={options} theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="categoria" placeholder="Seleccione una Categoria"/>
                  </Form.Group>

                  <Form.Group id="subCategoria" className="col-6 pt-3">
                    <Form.Label>Sub Categoria</Form.Label>
                    <Select options={options} required theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="subCategoria" placeholder="Seleccione una Sub Categoria"/>
                  </Form.Group>

                  <Form.Group id="marca" className="col-6 pt-3">
                    <Form.Label>Marca</Form.Label>
                    <Select options={options} required theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="marca" placeholder="Seleccione una Marca"/>
                  </Form.Group>

                  <Form.Group id="unidad" className="col-6 pt-3">
                    <Form.Label>Marca</Form.Label>
                    <Select options={options} required theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="unidad" placeholder="Seleccione una Marca"/>
                  </Form.Group>
                <hr className="mt-3 p-0"/>
                  <Form.Group id="stockInicial" className="col-3">
                    <Form.Label>Stock Inicial</Form.Label>
                    <Form.Control required type="text" name="stockInicial" autoComplete="off" placeholder="Nombre del producto"></Form.Control>
                  </Form.Group>

                  <Form.Group id="stockMinimo" className="col-3">
                    <Form.Label>Stock Minimo</Form.Label>
                    <Form.Control required type="text" name="stockMinimo" autoComplete="off" placeholder="Nombre del producto"></Form.Control>
                  </Form.Group>

                    <Form.Group id="precioVenta" className="col-3">
                    <Form.Label>Precio de Venta</Form.Label>
                    <InputGroup>
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" name="precioVenta" required aria-label="Amount (to the nearest dollar)"/>
                            <span className="input-group-text">.00</span>
                            </InputGroup>
                    </Form.Group>

                    <Form.Group id="precioCompra" className="col-3">
                    <Form.Label>Precio de Compra</Form.Label>
                    <InputGroup>
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" name="precioCompra" required aria-label="Amount (to the nearest dollar)"/>
                            <span className="input-group-text">.00</span>
                            </InputGroup>
                    </Form.Group>

                    <Form.Group id="reorden" className="col-3 pt-3">
                    <Form.Label>Punto de reorden</Form.Label>
                    <Form.Control required type="text" name="reorden" autoComplete="off" required placeholder="Nombre del producto"></Form.Control>
                  </Form.Group>

                  <Form.Group id="proveedor" className="col-3 pt-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Select options={options} required theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="proveedor" placeholder="Seleccione una opción"/>
                  </Form.Group>

                  <Form.Group className="col-3 pt-4 pl-2">
                    <Form.Label></Form.Label>
                    <Form.Check label="Incluye ITBIS" name="incluyeItbis" id="incluyeItbis" htmlFor="incluyeItbis" />
                  </Form.Group>

                  <Form.Group id="estado" className="col-3 pt-3">
                    <Form.Label>Estado</Form.Label>
                    <Select options={options} theme={theme => ({...theme,borderRadius: 8,colors: {...theme.colors,primary: '#333152',}})} name="estado" placeholder=""/>
                  </Form.Group>

                    <Form.Group className="mb-3" className="col-12 pt-4 pl-2">
                        <Form.Label>Observación</Form.Label>
                        <Form.Control as="textarea" rows="1" name="observacion"/>
                    </Form.Group>
                    <div className="mt-3 col-auto">
                        <Button variant="primary" type="submit">Guardar 222</Button>
                    </div>
                    <div className="mt-3 col-auto">
                        <Button variant="secondary" type="submit">Cancelar</Button>
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

export default Product;
