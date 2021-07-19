import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, ButtonGroup, Button, Table, Dropdown, Pagination, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';


import CustomerContext from "../../context/customer/CustomerContext";
import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

const TableReporteCuentaPorCobrar = ({limit, page, setPage, search, facturas, total_page, consultarDatos}) => {
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

  const TableRowCuentaPorCobrar = ({factura, index}) => {


    return (
      <>
        <tr key={index +'-'+ factura.idCliente}>
          <td>{(index)}</td>
          <td>{factura.nombre}</td>
          <td>{factura.razonSocial}</td>
          <td>{factura.telefono}</td>
          <td>{factura.correo}</td>
          <td>{factura.identificacion}</td>
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
                <Link to={`/customer/edit/${factura.numFactura}`}>
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
       
          {facturas.length > 0 ? (
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Nombre</th>
                 <th className="border-bottom">RozonSocial</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">RNC</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {facturas.map((factura, index) => <TableRowCuentaPorCobrar factura={factura} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={factura.numFactura+'-'+index}/>)}
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
            Showing <b>{facturas.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableReporteCuentaPorCobrar;
