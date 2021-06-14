import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';


import CategoryContext from "../../context/category/CategoryContext";
import SubCategoryContext from "../../context/subcategory/SubCategoryContext";


const TableSubCategory = ({limit, page, setPage, search, showModalEditCategory, deleteCategoryfn}) => {
  const categoryContext = useContext(CategoryContext);
  const subCategoryContext = useContext(SubCategoryContext);
  const { getAllCategory, categorias, mensajeCategory } = categoryContext;
  const { getASubCategoryPaged, subCategorias, mensajeSubCategory, total_page, total_rows } = subCategoryContext;

  useEffect(() => {
    getASubCategoryPaged(limit,1);
  },[]);

  useEffect(() => {
    getASubCategoryPaged(limit, page, search);
  },[limit, page, mensajeSubCategory]);

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

  const TablaRowSubCategoria = ({subcategoria, index}) => {

    return (
      <>
        <tr key={index +'-'+ subcategoria.idSubCategoria}>
          <td>{(index)}</td>
          <td>{subcategoria.subCategoria}</td>
          <td>{subcategoria.categoria}</td>
          <td>{subcategoria.creado_por ? subcategoria.creado_por : ' - '}</td>
          <td>{subcategoria.creado_en}</td>
          <td>{subcategoria.estado}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => showModalEditCategory(subcategoria.idSubCategoria)}
              >         
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger"
                // onClick={deleteCategoryfn(categoria.idCategoria)}
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
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="p-0">
       
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">SubCategoria</th>
                 <th className="border-bottom">Categoria</th>
                 <th className="border-bottom">Creado por</th>
                 <th className="border-bottom">Creado En</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {subCategorias.map((subcategoria, index) => <TablaRowSubCategoria subcategoria={subcategoria} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={subcategoria.idSubCategoria+'-'+index}/>)}
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
            Showing <b>{categorias.length}</b> out of <b>{total_rows}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableSubCategory;