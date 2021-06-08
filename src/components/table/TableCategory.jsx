import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup, Image } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import SupplierContext from "../../context/supplier/SupplierContext";
import CategoryContext from "../../context/category/CategoryContext";


const TableCategory = ({limit, page, setPage, search}) => {
  const supplierContext = useContext(SupplierContext);
  const categoryContext = useContext(CategoryContext);
  const { getAllSupplier, proveedores, total_page, total_rows } = supplierContext;
  const { getAllCategory, categorias } = categoryContext;

  useEffect(() => {
    getAllCategory(limit,1);
  },[]);

  useEffect(() => {
    getAllCategory(limit, page, search);
  },[limit, page]);

  const handleChange =e=> {
    console.log('handleChange: ', e.target.text);
    setPage(e.target.text);
  }

  const previousPage = (e) => {
    console.log('prueba:', e.target);
    setPage(page-1);
  }

  let items = [];
  for (let number = 1; number <= total_page.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChange}>
        {number}
      </Pagination.Item>,
    );
  }

  const TablaRowProveedor = ({categoria, index}) => {

    return (
      <>
        <tr key={index +'-'+ categoria.idCategoria}>
          <td>{(index)}</td>
          <td>{categoria.categoria}</td>
          <td>{categoria.creado_por ? categoria.creado_por : ' - '}</td>
          <td>{categoria.creado_en}</td>
          <td>{categoria.estado}</td>
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
                <Link to={`/supplier/edit/${categoria.idProveedor}`}>
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
                 <th className="border-bottom">Categoria</th>
                 <th className="border-bottom">Creado por</th>
                 <th className="border-bottom">Creado En</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {categorias.map((categoria, index) => <TablaRowProveedor categoria={categoria} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={categoria.idCategoria+'-'+index}/>)}
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

export default TableCategory;