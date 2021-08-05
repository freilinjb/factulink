import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faShoppingCart, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Form, Nav, Card, Image, Button, Table, Dropdown, InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import ProductContext from "../../context/product/ProductContext";

const TableRegistroCompras = ({productosCompras, setProductoComporas}) => {
  const [campos, setCampos] = useState({});

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

  const eliminarProducto = (product) => {
    console.log('Eliminando producto');
    const resultados = productosCompras.filter(p => p.idProducto !== product.idProducto);

    setProductoComporas(resultados);
  };

  // const actualizarCantidadProducto = (produco, cantidad) => {
  //   const resultados = productosCompras.filter(p => p.idProducto !== produco.idProducto);
  //   producto.

  // }

  const TablaRowProducto = ({producto, index}) => {

    return (
      <>
        <tr key={index +'-'+ producto.idProducto}>
          <td>{(index)}</td>
          <td>{producto.nombre} </td>
          <td>{producto.marca}   </td>
          <td>   
              <Form.Group>
              <Form.Control onChange={handleChange} type="number" name={`precio-${producto.idProducto}`} id={`idProductoPrecio${Number(producto.idProducto)}`} size="sm" min="1" placeholder="Ingrese el precio" value="1" value={campos[`precio-${producto.idProducto}`] ? campos[`precio-${producto.idProducto}`] : producto.precio } />
            </Form.Group>
          </td>

          <td>   
              <Form.Group>
              <Form.Control onChange={handleChange} type="number" name={`cantidad-${producto.idProducto}`} id={`idProductoCantidad${Number(producto.idProducto)}`}  size="sm" min="1" placeholder="Ingrese la Cantidad" value="1" value={campos[`cantidad-${producto.idProducto}`] ? campos[`cantidad-${producto.idProducto}`] : producto.cantidad } />
            </Form.Group>
          </td>
          <td>{(producto.precio * producto.cantidad).toFixed(2)} </td>
          <td>
            {/* <a className="text-info"
              // onClick={() => mostrarModalEditarProducto(product)}
            ><FontAwesomeIcon icon={faEdit} className="me-2" /></a> */}
            <a className="text-danger"
              onClick={() => eliminarProducto(producto)}
            ><FontAwesomeIcon icon={faTrashAlt} size="lg"  /></a>
            </td>
        </tr>
      </>
    )
    
  }

  return ( 
    <>
          <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
          {productosCompras.length > 0 ? (
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Producto</th>
                 <th className="border-bottom">Marca</th>
                 <th className="border-bottom">Precio</th>
                 <th className="border-bottom">Cantidad</th>
                 <th className="border-bottom">Importe</th>
                 <th className="border-bottom">Accion</th>
               </tr>
             </thead>
            <tbody>
            {productosCompras.map((producto, index) => <TablaRowProducto producto={producto} index={index} key={producto.idProducto+'-'+index}/>)}
          </tbody>
        </Table>

          )
          :
          (
            <div className="alert alert-danger"> Sin Informacion</div>
          )}
          
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          {/* <Nav>
            <Pagination className="mb-2 mb-lg-0" >
              <Pagination.Prev page={page} onClick={previousPage}>
                Previous
              </Pagination.Prev>
              {items}
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav> */}
          <small className="fw-bold">
            Showing <b>{}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
    </>
   );
}
 
export default TableRegistroCompras;