import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faShoppingCart, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Form, Nav, Card, Image, Button, Table, Dropdown, InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import ProductContext from "../../context/product/ProductContext";

const TableProductoFacturacion = ({limit, page, setPage, search, addProduct, varificarsiExiste}) => {
  const [campos, setCampos] = useState({});
  const productContext = useContext(ProductContext);
  const { getAllProduct, productos, total_page } = productContext;
  
  useEffect(() => {
    getAllProduct(limit,1);
  },[]);

  useEffect(() => {
    getAllProduct(limit, page, search);
  },[limit, page]);

  const handleChangePage =e=> {
    const value = e.target.value;
    console.log('handleChange: ', e.target.text);

    setPage(e.target.text);
  }

  const previousPage = (e) => {
    console.log('prueba:', e.target);
  }

  const nextPage = () => {
    setPage(page+1);
  }

  let items = [];
  for (let number = 1; number <= total_page.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChangePage}>
        {number}
      </Pagination.Item>,
    );
  }

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

  const TablaRowProducto = ({producto, index}) => {


    return (
      <>
        <tr key={index +'-'+ producto.idProducto}>
          <td>{(index)}</td>
          <td>{producto.nombre + ' ' + producto.marca} {(producto.urlFoto != null  &&  <Image src={producto.urlFoto} className="image-sm rounded-circle me-2" /> )} </td>
          <td>   
            <Form.Group controlId="formBasicEmail">
            <Form.Control type="number" name={`cantidad-${producto.idProducto}`} onChange={handleChange} size="sm" min="1" placeholder="Ingrese la Cantidad" value="1" value={campos[`cantidad-${producto.idProducto}`] ? campos[`cantidad-${producto.idProducto}`] : 1 } />
          </Form.Group>

          </td>
          <td>{producto.precioVenta}</td>
          <td>
              {producto.stockInicial > 0 ? (
                varificarsiExiste(producto.idProducto) ? 
                  (
                    <Dropdown.Item className="text-secondary"
                    onClick={ e=> addProduct(producto, campos[`cantidad-${producto.idProducto}`] ? campos[`cantidad-${producto.idProducto}`] : 1)}
                >
                  
                    <FontAwesomeIcon icon={faEdit} className="me-2" 
                    />  Actualizar
                  </Dropdown.Item>
                  ) : 
                  (
                    <Dropdown.Item className="text-info"
                    onClick={ e=> addProduct(producto, campos[`cantidad-${producto.idProducto}`] ? campos[`cantidad-${producto.idProducto}`] : 1)}
                >
                  
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" 
                    />  Agregar
                  </Dropdown.Item>
                  )
              ) 
              :
              (
                <p class="text-danger bg-light p-1">Productgo Agotado</p>
              )}
          </td>
        </tr>
      </>
    )
    
  }

  return ( 
    <>
          <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
          {productos.length > 0 ? (
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Nombre</th>
                 <th className="border-bottom">Categoria</th>
                 <th className="border-bottom">Precio</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {productos.map((producto, index) => <TablaRowProducto producto={producto} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={producto.idProducto+'-'+index}/>)}
          </tbody>
        </Table>

          )
          :
          (
            <div className="alert alert-danger"> Sin Informacion</div>
          )}
          
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0" >
              <Pagination.Prev page={page} onClick={previousPage}>
                Previous
              </Pagination.Prev>
              {items}
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
    </>
   );
}
 
export default TableProductoFacturacion;