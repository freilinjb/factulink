import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, ButtonGroup, Button, Table, Dropdown, Pagination, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';


import CustomerContext from "../../context/customer/CustomerContext";
import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

const TableReporteCuentaPorPagar = ({limit, page, setPage, search, compras, total_page, consultarDatos}) => {
  const customerContext = useContext(CustomerContext);
  const { getCustomerPage, clientes } = customerContext;
  // const { getReportFactura } = comprobanteContext;

  useEffect(() => {
    // getCustomerPage(limit,1);
    // getReportFactura(limit, 1);
    console.log('TableReporteCuentaPorCobrar: ', consultarDatos(limit, 1));
  },[]);

  useEffect(() => {
    //  getCustomerPage(limit, page, search);
  },[limit, page]);

  const handleChange =e=> {
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
  for (let number = 1; number <= total_page; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChange}>
        {number}
      </Pagination.Item>,
    );
  }

  const TableRowCuentaPorPagar = ({factura, index}) => {


    return (
      <>
        <tr key={index +'-'+ factura.idCliente}>
          <td>{factura.idCompra}</td>
          <td>{factura.documento}</td>
          <td>{factura.fecha.substring(0,10)}</td>
          <td>{factura.almacen}</td>
          <td>{factura.proveedor}</td>
          <td>{factura.telefono}</td>
          <td>{factura.correo}</td>
          <td>{<Badge bg={factura.estado == 'pagada' ? 'success' : 'danger'} className="me-1">{factura.estado}</Badge>}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Ver Detalles
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={`/cuentaPorCobrar/${factura.idCliente}`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Realizar Pago
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Imprimir Estado
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        </tr>
      </>
    )
    
  }

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
          {compras.length > 0 ? (
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom"># Compra</th>
                 <th className="border-bottom">Documento</th>
                 <th className="border-bottom">Fecha</th>
                 <th className="border-bottom">Almacen</th>
                 <th className="border-bottom">Proveedor</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">Total</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {compras.map((factura, index) => <TableRowCuentaPorPagar factura={factura} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={factura.numFactura+'-'+index}/>)}
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
            Showing <b>{compras.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableReporteCuentaPorPagar;
