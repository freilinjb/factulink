import React,{ useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import {Col,Row,Card,Form,Button,InputGroup, ButtonGroup, Dropdown} from "@themesberg/react-bootstrap";

import {TransactionsTable, RankingTable} from "../../components/table/TableProducts";
import ProductContext from "../../context/product/ProductContext";
const AdminProduct = () => {

    const productContext = useContext(ProductContext);
    const {  getProduct, productos, getAllProduct } = productContext;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect( () => {
        console.log('productos: ', productos);
    },[productos]);

    const handleClick = (e) => {
      console.log('prueba: ', e.target.text);
      setLimit(Number(e.target.text));
    }

    const handlePress =(e)=> {
      if(e.key == 'Enter') {
        getAllProduct(limit, page, search);
      }
    }



    return ( 
        <>
        <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active> Admin Product </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Product Management</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
            <Button variant="outline-primary" size="sm"><Link to={'/admin/add/Product'}>+ New Product</Link></Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" value={search} onChange={e=> setSearch(e.target.value)} onKeyPress={handlePress}/>
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right" onClick={handleClick}>
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="fw-bold">5 {limit == 5 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 {limit == 10 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)}
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20 {limit == 20 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
                <Dropdown.Item className="fw-bold">30 {limit == 30 && (<span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>)} </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          </Row>
      </div>

      <TransactionsTable limit={limit} page={page} setPage={setPage} search={search}/>
      {/* <RankingTable/> */}
      </>
     );
}
 
export default AdminProduct;