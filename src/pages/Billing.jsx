import React,{ useState, useContext, useEffect } from 'react';
import Select from "react-select";

import {Col, Card,Row,Form,Button,InputGroup, ButtonGroup, Table, Image, Dropdown} from "@themesberg/react-bootstrap";
import { faSearch, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerContext from "../context/customer/CustomerContext";

import TableProductoFacturacion from "../components/table/TableProductoFacturacion";

import ProductContext from "../context/product/ProductContext";
import PagoFacturacionModal from '../components/modal/PagoFacturacionModal';

const Billing = () => {
    const productContext = useContext(ProductContext);
    const {  getProduct, productos, getAllProduct } = productContext;
    const customerContext = useContext(CustomerContext);
    const { getCustomer, clientesSelect } = customerContext;
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productBilling, setProductBilling] = useState([]);

    const [isEdit, setIsEdit] = useState(0);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [campos, setCampos] = useState({
        cliente: "",
        fechaVencimiento: "",
        inicio: "",
        final: "",
        secuencia: "",
        sucursal: "",
        estado: "",
      });

    const [sumatoria, setSumatoria] = useState({
      subTotal: 0,
      itbis: 0,
      total: 0,
    });
    
    useEffect(() => {
        getCustomer();
    },[]);

    const handleClick = (e) => {
        console.log('prueba: ', e.target.text);
        setLimit(Number(e.target.text));
    }

    const handlePress =(e)=> {
        if(e.key === 'Enter') {
            getAllProduct(limit, page, search);
        }
      }

    const handleClose = () => setMostrarModal(false);


    const handleChangeSelect = (valorSeleccionado, s) => {
        const { name } = s;
        setCampos({
            ...campos,
            [name]: valorSeleccionado,
        });
    }; 

  const tipoVenta = [
    { value: 1, label: "Contado" },
    { value: 2, label: "Credito" },
  ];

  useEffect(() => {
    let itbis = 0;
    let subTotal = 0;
    let total = 0;
    productBilling.forEach((key, index) => {
      console.log('key: ', key);
      itbis += key.itbis ? ((Number(key.precio) * Number(key.cantidad)) * 0.18) : 0;
      subTotal += (key.precio) * (key.cantidad);
      total += (key.precio + key.cantidad) * 1.18;
    });
    setSumatoria({
      ...sumatoria,
      itbis: itbis,
      subTotal: subTotal,
      total: total,
      });

      console.log('Sumatoria: ', sumatoria);

    console.log('productBilling: ', productBilling);

  },[productBilling]);
  const addProduct = (producto, cantidad) => {

    //Comprobar si el archivo existe
    const encontrado = productBilling.some(el => el.idProducto == producto.idProducto);
    // console.log('addProduct: ', cantidad);

    if(!encontrado) {
      console.log('verificando: ', producto)
        const product = {
            idProducto: producto.idProducto,
            codigo: producto.codigo,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precioVenta,
            categoria: producto.categoria,
            subcategoria: producto.subcategoria,
            cantidad: cantidad,
            itbis: producto.incluyeItbis == 'activo' ? true : false
        }
        setProductBilling([...productBilling, product]);
    } else {
      let indice = null;
      let resultados = [];
      productBilling.forEach((key, index) => {
        if(producto.idProducto == key.idProducto) {
          const product = {
            idProducto: key.idProducto,
            codigo: key.codigo,
            nombre: key.nombre,
            marca: key.marca,
            precio: key.precio,
            categoria: key.categoria,
            subcategoria: key.subcategoria,
            cantidad: Number(cantidad),
            itbis: key.itbis
          }

          resultados.push(product);
          
        } else {
          const product = {
            idProducto: key.idProducto,
            codigo: key.codigo,
            nombre: key.nombre,
            marca: key.marca,
            precio: key.precio,
            categoria: key.categoria,
            subcategoria: key.subcategoria,
            cantidad: Number(key.cantidad),
            itbis: key.itbis
          }
          resultados.push(product);

        }
      })
      setProductBilling(resultados);
      console.log('indice: ', resultados);
    }
    
    // setProductBilling(
    //     ...productBilling, product)

      // console.log('productBilling: ', productBilling);
  }

  const varificarsiExiste = (id) => {
    return productBilling.some(el => el.idProducto == id );
  }

  const mostrarModalEditarProducto = (producto) => {
    setMostrarModal(true);
    //No se va a editar
    console.log('producto: ', producto);
    setIsEdit(producto.idProducto);

    // console.log('Editando la categoria ID: ', producto);
  }

  const eliminarProducto = (product) => {
    const resultados = productBilling.filter(p => p.idProducto !== product.idProducto);

    setProductBilling(resultados);
  }

  
    return ( 
        <>
      <Row className="mx-2 mt-2">
        <Col lg={5} >
            <InputGroup>
                <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Buscar Producto" value={search} onChange={e=> setSearch(e.target.value)} onKeyPress={handlePress}/>
            </InputGroup>
            
            <TableProductoFacturacion limit={limit} page={page} setPage={setPage} search={search} addProduct={addProduct} varificarsiExiste={varificarsiExiste}/>
            </Col>
            <Col lg={7} >
                <h3 className="bg-primary p-1 rounded-3 text-white text-center">Ventas</h3>
                <Form style={{height: "100vh"}}>
                    <Row className="justify-content-between">
                        <Form.Group id="cliente" className="mt-1 col-6">
                            <Select
                                options={clientesSelect}
                                theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: { ...theme.colors, primary: "#333152" },
                                })}
                                name="cliente"
                                value={campos.cliente}
                                onChange={handleChangeSelect}
                                placeholder="Seleccione un Cliente"
                            />  
                        </Form.Group>
                        <Form.Group id="tipoVenta" className="mt-1 col-4">
                            <Select
                                options={tipoVenta}
                                theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: { ...theme.colors, primary: "#333152" },
                                })}
                                name="tipoComprobante"
                                value={campos.tipoComprobante}
                                onChange={handleChangeSelect}
                                placeholder="Tipo de Venta"
                            />  
                        </Form.Group>

                        <div className="col-auto">
                        <Button className="m-1 btn-primary">
                          <FontAwesomeIcon icon={faEdit} className="me-2" /> Facturar
                        </Button>
                        </div>
                        
                        <div className="col-12">
                            
                        <Card border="light" className="shadow-sm mb-0 mt-4">
                            <Card.Body className="pb-0">
                                <Table responsive className="table-striped table-centered table-nowrap rounded mb-0">
                                <thead className="thead-light">
                                    <tr>
                                    <th className="border-0">#</th>
                                    <th className="border-0">Producto</th>
                                    <th className="border-0">Unidad</th>
                                    <th className="border-0">Precio</th>
                                    <th className="border-0">Cantidad</th>
                                    <th className="border-0">Itbis</th>
                                    <th className="border-0">Importe</th>
                                    <th className="border-0">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productBilling.map((product, index) => (
                                        <tr key={index +'-'+ product.idProducto}>
                                            <td>{1+index}</td>
                                            <td>{product.nombre}</td>
                                            <td>{product.nombre}</td>
                                            <td>{(product.precio).toFixed(2)}</td>
                                            <td>{product.cantidad}</td>
                                            <td>{((product.precio * product.cantidad) * 0.18).toFixed(2)}</td>
                                            <td>{((product.precio * product.cantidad) * 1.18).toFixed(2)}</td>
                                            <td>
                                                    <a className="text-info"
                                                      onClick={() => mostrarModalEditarProducto(product)}
                                                    ><FontAwesomeIcon icon={faEdit} className="me-2" /></a>
                                                    <a className="text-danger"
                                                      onClick={() => eliminarProducto(product)}
                                                    ><FontAwesomeIcon icon={faTrashAlt} className="me-2" /></a>
                                            </td>
                                         </tr>   
                                    ))}
                                </tbody>
                                </Table>
                            </Card.Body>
                            </Card>
                            {productBilling.length == 0 && (<h5 className="text-center">Agregar producto para crear la factura de veta</h5>)}
                            {/* <h1 className="text-center p-1 bg-primary text-white">Venta:</h1> */}
                            <div className="row">
                {/* <!-- accepted payments column --> */}
                <div className="col-6">
                  <p className="lead">Payment Methods:</p>
                  <Image src="../../dist/img/credit/visa.png" alt="Visa"/>
                  <Image src="../../dist/img/credit/mastercard.png" alt="Mastercard"/>
                  <Image src="../../dist/img/credit/american-express.png" alt="American Express"/>
                  <Image src="../../dist/img/credit/paypal2.png" alt="Paypal"/>

                  <p className="text-muted well well-sm shadow-none" >
                    Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem
                    plugg
                    dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                  </p>
                </div>
                {/* <!-- /.col --> */}
                <div className="col-6">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody><tr>
                        <th >SUBTOTAL:</th>
                        <td>{sumatoria.subTotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>ITBIS (18%)</th>
                        <td> RD$ {sumatoria.itbis.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>TOTAL:</th>
                        <td>{sumatoria.total.toFixed(2)}</td>
                      </tr>
                    </tbody></table>
                  </div>
                </div>
                {/* <Button variant="outline-primary" className="m-1">
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Facturar
                </Button> */}
                <Button variant="outline-danger" className="m-1">
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Cancelar
                </Button>


                {/* <!-- /.col --> */}

                <PagoFacturacionModal handleClose={handleClose} showModal={mostrarModal} isEdit={isEdit}/>

              </div>
                            {/*  */}
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
      </>
     );
}
 
export default Billing;