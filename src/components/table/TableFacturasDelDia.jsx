import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";


const TableFacturasDelDia = ({limit, page, setPage, search, showModalEditCategory}) => {
  const comprobanteContext = useContext(ComprobanteContext);
  const { getInvoiceForDay, facturas_del_dia, total_page, total_rows, getInvoice } = comprobanteContext;

  useEffect(() => {
    getInvoiceForDay(limit,1);
  },[]);

  useEffect(() => {
    getInvoiceForDay(limit, page, search);
  },[limit, page]);

  const handleChange =e=> {
    // console.log('handleChange: ', e.target.text);
    setPage(e.target.text);
  }

  const previousPage = (e) => {
    // console.log('prueba:', e.target);
    setPage(page-1);
  }

  let items = [];
  console.log('TOTAL_PAGE: ', total_page);
  for (let number = 1; number <= total_page.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChange}>
        {number}
      </Pagination.Item>,
    );
  }

  const TablaRowFactura = ({factura, index}) => {

    return (
      <>
        <tr key={index +'-'+ factura.idCategoria}>
          <td>{factura.numFactura}</td>
          <td>{factura.tipoFactura}</td>
          <td>{factura.NFC}</td>
          <td>{(factura.fecha.substring(10,factura.fecha.length)).trim() }</td>
          <td>{factura.cliente}</td>
          <td>{factura.estatus}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => getInvoice(factura.numFactura)}
              >         
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Consultar Factura
              </Dropdown.Item>
              <Dropdown.Item className="text-danger"
                // onClick={deleteCategoryfn(categoria.idCategoria)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Anular Factura
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
       
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">Factura</th>
                 <th className="border-bottom">Tipo</th>
                 <th className="border-bottom">NCF</th>
                 <th className="border-bottom">Fecha</th>
                 <th className="border-bottom">Cliente</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Total</th>
               </tr>
             </thead>
            <tbody>
            {facturas_del_dia.map((factura, index) => <TablaRowFactura factura={factura} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={factura.numFactura+'-'+index}/>)}
          </tbody>
        </Table>

          
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
            Showing <b>{facturas_del_dia.length}</b> out of <b>{total_rows}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableFacturasDelDia;