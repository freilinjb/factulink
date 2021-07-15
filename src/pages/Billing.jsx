import React,{ useState, useContext, useEffect } from 'react';
import Select from "react-select";

import {Col, Card,Row,Form,Button,InputGroup, ButtonGroup, Table, Image, Dropdown} from "@themesberg/react-bootstrap";
import { faSearch, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerContext from "../context/customer/CustomerContext";

import TableProductoFacturacion from "../components/table/TableProductoFacturacion";

import ComprobanteContext from "../context/comprobante/ComprobanteContext";
import ProductContext from "../context/product/ProductContext";
import PagoFacturacionModal from '../components/modal/PagoFacturacionModal';
import FacturarModal from '../components/modal/FacturarModal';

import { useToasts } from 'react-toast-notifications';


const Billing = () => {
  const { addToast } = useToasts();

    const productContext = useContext(ProductContext);
    const comprobanteContext = useContext(ComprobanteContext);
    const {  addFactura } = comprobanteContext;
    const {  getAllProduct } = productContext;
    const customerContext = useContext(CustomerContext);
    const { getCustomer, clientesSelect } = customerContext;
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalFacturar, setMostrarModalFacturar] = useState(false);
    const [productBilling, setProductBilling] = useState([]);

    const [isEdit, setIsEdit] = useState(0);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [campos, setCampos] = useState({
        cliente: "",
        tipoFactura: "",
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
    const handleCloseFacturar = () => setMostrarModalFacturar(false);

    const facturar =() => {

      let datos = {};
      datos.idUsuario = 1;
      datos.idCliente = campos.cliente.value;
      datos.idTipoFactura = campos.tipoFactura.value;
      datos.descuento = 0;
      datos.observacion = document.getElementById('observacionFacturacion').value;
      datos.productos = productBilling;
      addFactura(datos);
      setMostrarModalFacturar(false);
      setProductBilling([]);
      console.log('Facturando: ....', datos);
    }


    const handleChangeSelect = (valorSeleccionado, s) => {
        const { name } = s;
        setCampos({
            ...campos,
            [name]: valorSeleccionado,
        });
    }; 

  const tipoFactura = [
    { value: 13, label: "Contado" },
    { value: 14, label: "Credito" },
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

    console.log('AddProduct: ', producto);
    if(cantidad > producto.stockInicial) {
      addToast(`Solo quedan ${producto.stockInicial} ${producto.nombre} disponible, no puedes vender ${cantidad}`, {
        appearance: 'error',
        autoDismiss: true,
      });

      return;
    }
    
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
  }

  const varificarsiExiste = (id) => {
    return productBilling.some(el => el.idProducto == id );
  }


  const mostrarModalEditarProducto = (producto) => {
    setMostrarModal(true);
    console.log('producto: ', producto);
    setIsEdit(producto.idProducto);

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
                        <Form.Group id="tipoFactura" className="mt-1 col-4">
                            <Select
                                options={tipoFactura}
                                theme={(theme) => ({
                                ...theme,
                                borderRadius: 8,
                                colors: { ...theme.colors, primary: "#333152" },
                                })}
                                name="tipoFactura"
                                value={campos.tipoFactura}
                                onChange={handleChangeSelect}
                                placeholder="Tipo de Venta"
                            />  
                        </Form.Group>

                        <div className="col-auto">
                        <Button className="m-1 btn-primary"
                          onClick={e => setMostrarModalFacturar(true) }
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-2" /> Facturar
                        </Button>
                        </div>
                        
                        <div className="col-12">
                            
                        
                            {productBilling.length == 0 ? (
                            <h5 className="text-center">Agregar producto para crear la factura de veta</h5>) : 
                            (
                              <>
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

                            <div className="row">
                            {/* <!-- accepted payments column --> */}
                            <div className="col-6">
                              <p className="lead">Metodos de pagos:</p>
                              <Image src="http://pngimg.com/uploads/visa/visa_PNG30.png" alt="Visa" style={{height: "15px", weigth: "15px"}}/>
                              <Image src="https://upload.wikimedia.org/wikipedia/commons/7/72/MasterCard_early_1990s_logo.png" alt="Mastercard" style={{height: "15px", weigth: "15px"}}/>
                              <Image src="https://logos-marcas.com/wp-content/uploads/2020/11/American-Express-Logo.png" alt="American Express" style={{height: "15px", weigth: "15px"}}/>
                              <Image src="http://pngimg.com/uploads/visa/visa_PNG30.png" alt="Paypal" style={{height: "15px", weigth: "15px"}}/>

                              <p className="text-muted well well-sm shadow-none" >
                                
                              </p>
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-6">
                              <div className="table-responsive">
                                <table className="table">
                                  <tbody><tr>
                                    <th >SUBTOTAL:</th>
                                    <td><div id="subTotal">{sumatoria.subTotal.toFixed(2)}</div></td>
                                  </tr>
                                  <tr>
                                    <th>ITBIS (18%)</th>
                                    <td> RD$ <div id="itbisTotal">{sumatoria.itbis.toFixed(2) } </div> </td>
                                  </tr>
                                  <tr>
                                    <th>TOTAL:</th>
                                    <td> <div id="total">{sumatoria.total.toFixed(2)} </div>  </td>
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

                            <PagoFacturacionModal handleClose={handleClose} showModal={mostrarModal} isEdit={isEdit}/>
                            <FacturarModal handleClose={handleCloseFacturar} showModal={mostrarModalFacturar} facturar={facturar}/>
                              </div>
                              </>
                            )
                            }
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
      </>
     );
}
 
export default Billing;