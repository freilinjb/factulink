import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';

// import { Link } from 'react-router-dom';

import ComprobanteContext from "../../context/comprobante/ComprobanteContext";
import ComprobanteDetalleTablaModal from '../modal/ComprobanteDetalleTablaModal';

const TableComprobante = ({limit, page, setPage, search, showModalEditComprobante, deleteCategoryfn}) => {
  const comprobanteContext = useContext(ComprobanteContext);
  const { getAllComprobante, comprobantes, total_page, total_rows, mensajeComprobante} = comprobanteContext;
  const [mostrarModalDetalle, MostrarModalDetalle] = useState(false);
  const [tipoComprobante, setTipoComprobante] = useState(0);

  const handleOpen = (id) => {
    setTipoComprobante(id);
    MostrarModalDetalle(true);
  }
  const handleClose = () => {
    setTipoComprobante(0);
    MostrarModalDetalle(false);
  }

  useEffect(() => {
    getAllComprobante(limit,1);
  },[]);

  useEffect(() => {
    getAllComprobante(limit, page, search);
  },[limit, page, mensajeComprobante]);

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

  const TablaRowComprobante = ({comprobante, index}) => {

    return (
      <>
        <tr key={index +'-'+ comprobante.TipoCliente}>
          <td>{(index)}</td>
          <td>{comprobante.descripcion}</td>
          <td>{comprobante.tipo}</td>
          <td>{comprobante.encabezado}</td>
          <td>{comprobante.mostrarCliente ? 'Verdadero' : 'Falso'}</td>
          <td>{comprobante.vencimiento ? comprobante.vencimiento : 0 }</td>
          <td>{comprobante.encabezado}</td>

          <td>{comprobante.creado_por ? comprobante.creado_por : ' - '}</td>
          <td>{comprobante.creado_en}</td>
          <td>{comprobante.estado}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => showModalEditComprobante(comprobante.tipoComprobante)}
              >         
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOpen(comprobante.tipoComprobante)}>         
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Detalles comprobates
              </Dropdown.Item>
              <Dropdown.Item className="text-danger"
                // onClick={deleteCategoryfn(comprobante.idCategoria)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        </tr>
      </>
    )
    
  }

  return (
    <>
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Comprobante</th>
                 <th className="border-bottom">Tipo Comprobante</th>
                 <th className="border-bottom">Encabezado</th>
                 <th className="border-bottom">Mostrar al Cliente</th>
                 <th className="border-bottom">Secuencia</th>
                 <th className="border-bottom">Vencimiento</th>
                 <th className="border-bottom">Creado por</th>
                 <th className="border-bottom">Creado En</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {comprobantes.map((comprobante, index) => <TablaRowComprobante comprobante={comprobante} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={comprobante.idCategoria+'-'+index}/>)}
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
            Showing <b>{comprobantes.length}</b> out of <b>{total_rows}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>

    <ComprobanteDetalleTablaModal handleClose={handleClose} mostrarModalDetalle={mostrarModalDetalle} tipoComprobante={tipoComprobante}/>
    </>
  );
};

export default TableComprobante;