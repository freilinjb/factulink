import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Image, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import transactions from "../../data/transactions";

import CustomerContext from "../../context/customer/CustomerContext";
import UserContext from "../../context/user/UserContext";

const TableUser = ({limit, page, setPage, search}) => {
  const customerContext = useContext(CustomerContext);
  const userContext = useContext(UserContext);

  const { getUsersPage, usuarios, total_page } = userContext;

  useEffect(() => {
    getUsersPage(limit,1);
  },[]);

  useEffect(() => {
    getUsersPage(limit, page, search);
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
  for (let number = 1; number <= total_page.length; number++) {
    items.push(
      <Pagination.Item key={number} active={number == page} onClick={handleChange}>
        {number}
      </Pagination.Item>,
    );
  }

  const TablaRowUser = ({usuario, index}) => {


    return (
      <>
        <tr key={index +'-'+ usuario.idUsuario}>
          <td>{(index)}</td>
          <td>{usuario.nombre} {(usuario.urlFoto != null  &&  <Image src={usuario.urlFoto} className="image-sm rounded-circle me-2" /> )} </td>
          <td>{usuario.telefono}</td>
          <td>{usuario.correo}</td>
          <td>{usuario.RNC}</td>
          <td>{usuario.ciudad}</td>
          <td>{usuario.estado == 1 ? 'Activo' : 'Inactivo' }</td>
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
                <Link to={`/user/edit/${usuario.idUsuario}`}>
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
       
          {usuarios.length > 0 ? (
             <Table hover className="user-table align-items-center">
             <thead className="thead-dark">
               <tr>
                 <th className="border-bottom">#</th>
                 <th className="border-bottom">Nombre</th>
                 <th className="border-bottom">Telefono</th>
                 <th className="border-bottom">Correo</th>
                 <th className="border-bottom">RNC</th>
                 <th className="border-bottom">Ciudad</th>
                 <th className="border-bottom">Estado</th>
                 <th className="border-bottom">Acción</th>
               </tr>
             </thead>
            <tbody>
            {usuarios.map((usuario, index) => <TablaRowUser usuario={usuario} index={Number(page) > 1 ? ((Number(page)*Number(limit))+index) : (index+1)} key={usuario.idUsuario+'-'+index}/>)}
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
            Showing <b>{usuarios.length}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default TableUser;
