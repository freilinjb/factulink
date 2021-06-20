import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';

// import { Link } from 'react-router-dom';

import UnidContext from "../../context/unid/UnidContext";


const TableUnid = ({limit, page, setPage, search, showModalEditUnid}) => {
  const unidContext = useContext(UnidContext);
  const {getUnidPaged, unidades, mensajeUnidad, total_page, total_rows} = unidContext;

  useEffect(() => {
    getUnidPaged(limit,1);
  },[]);

  useEffect(() => {
    getUnidPaged(limit, page, search);
  },[limit, page, mensajeUnidad]);

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

  const TablaRowUnid = ({unidad, index}) => {

    return (
      <>
        <tr key={index +'-'+ unidad.idCategoria}>
          <td>{(index)}</td>
          <td>{unidad.unidad}</td>
          <td>{unidad.creado_por ? unidad.creado_por : ' - '}</td>
          <td>{unidad.creado_en}</td>
          <td>{unidad.estado}</td>
          <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => showModalEditUnid(unidad.idUnidad)}
              >         
                  <FontAwesomeIcon icon={faEdit} className="me-2" />Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger"
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
                 <th className="border-bottom">Unidad</th>
                 <th className="border-bottom">Creado por</th>
                 <th className="border-bottom">Creado En</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {unidades.map((unidad, index) => <TablaRowUnid unidad={unidad} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={unidad.idUnidad+'-'+index}/>)}
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
            Showing <b>{unidades.length}</b> out of <b>{total_rows}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableUnid;