import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup, Image } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import transactions from "../../data/transactions";

import SupplierContext from "../../context/supplier/SupplierContext";


const TableSupplier = ({limit, page, setPage, search}) => {
  const supplierContext = useContext(SupplierContext);
  const { getAllSupplier, proveedores, total_page, total_rows } = supplierContext;
  const totalTransactions = transactions.length;

  useEffect(() => {
    getAllSupplier(limit,1);
  },[]);

  useEffect(() => {
    getAllSupplier(limit, page, search);
  },[limit, page]);

  const handleChange =e=> {
    const value = e.target.value;
    console.log('handleChange: ', e.target.text);

    setPage(e.target.text);
  }

  const previousPage = (e) => {
    console.log('prueba:', e.target);
  }

  let items = [];
  for (let number = 1; number <= total_page.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChange}>
        {number}
      </Pagination.Item>,
    );
  }

  const TablaRowProveedor = ({proveedor, index}) => {

    return (
      <>
        <tr key={index +'-'+ proveedor.idProveedor}>
          <td>{(index)}</td>
          <td>{proveedor.nombre} {(proveedor.urlFoto != null  &&  <Image src={proveedor.urlFoto} className="image-sm rounded-circle me-2" alt="Logo" /> )}  </td>
          <td>{proveedor.correo}</td>
          <td>{proveedor.telefono}</td>
          <td>{proveedor.ciudad}</td>
          <td>{proveedor.creado_por ? proveedor.creado_por : ' - '}</td>
          <td>{proveedor.estado == 1 ? 'activo' : 'inactivo'}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={`/supplier/edit/${proveedor.idProveedor}`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
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
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Nombre</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Ciudad</th>
                 <th className="border-bottom">Creado por</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {proveedores.map((proveedor, index) => <TablaRowProveedor proveedor={proveedor} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={proveedor.idProveedor+'-'+index}/>)}
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
            Showing <b>{proveedores.length}</b> out of <b>{total_rows}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableSupplier;