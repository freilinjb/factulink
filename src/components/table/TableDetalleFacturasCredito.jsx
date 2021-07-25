import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, ButtonGroup, Button, Table, Dropdown, Pagination, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';


import CustomerContext from "../../context/customer/CustomerContext";
import ComprobanteContext from "../../context/comprobante/ComprobanteContext";

const TableDetalleFacturasCredito = ({limit, page, setPage, search, facturas, total_page, setIdPago, mostrarModalPago}) => {
  const customerContext = useContext(CustomerContext);
  const { getCustomerPage, clientes } = customerContext;
  // const { getReportFactura } = comprobanteContext;

  useEffect(() => {
    // getCustomerPage(limit,1);
    // getReportFactura(limit, 1);
    // console.log('TableReporteCuentaPorCobrar: ', consultarDatos(limit, 1));
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

  const cargarListasPagos = (id) => {
    setIdPago(id);
    mostrarModalPago();
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

    const porcentaje = Number(((factura.pagado / factura.total) * 100).toFixed(2));

    return (
      <>
        <tr key={index +'-'+ factura.idCliente}>
          <td>{(index)}</td>
          <td>{factura.numFactura}</td>
          <td>{factura.NFC}</td>
          <td>{factura.fecha.substring(0,10)}</td>
          <td>{factura.vencimiento.substring(0,10)}</td>
          <td>{factura.diferencia}</td>
          <td>{factura.total}</td>
          <td>{factura.pagado.toFixed(2)}</td>
          <td>{<Badge bg={porcentaje == 100 ? 'success' : 'danger'} className="me-1">{porcentaje + '%'}</Badge>}</td>
          <td>{<Badge bg={factura.estado == 'pagada' ? 'success' : 'danger'} className="me-1">{factura.estado}</Badge>}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="text-primary"
                onClick={ () => cargarListasPagos(factura.numFactura)}
              >
                <FontAwesomeIcon icon={faEye} className="me-2" /> Consultar Historial de abonos
              </Dropdown.Item>
              {/* <Dropdown.Item className="text-secondary">
                <Link to={`/cuentaPorCobrar/${factura.idCliente}`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Realizar Pago
                </Link>
              </Dropdown.Item> */}
              <Dropdown.Item className="text-info">
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
                 <th className="border-bottom">Factura</th>
                 <th className="border-bottom">NCF</th>
                 <th className="border-bottom">Fecha</th>
                 <th className="border-bottom">Vencimiento</th>
                 <th className="border-bottom">Dias</th>
                 <th className="border-bottom">Monto</th>
                 <th className="border-bottom">Pago</th>
                 <th className="border-bottom">%</th>
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

export default TableDetalleFacturasCredito;
