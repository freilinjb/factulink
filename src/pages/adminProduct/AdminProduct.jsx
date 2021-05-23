import React,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import {Col,Row,Card,Form,Button,InputGroup, ButtonGroup} from "@themesberg/react-bootstrap";

import {TransactionsTable, RankingTable} from "../../components/table/TableProducts";
import ProductContext from "../../context/product/ProductContext";
const AdminProduct = () => {

    const productContext = useContext(ProductContext);
    const {  getProduct, productos } = productContext;
    
    // useEffect(  () => {
    //      getProduct();
    // },[]);

    useEffect( () => {
        console.log('productos: ', productos);
    },[productos]);




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
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          </Row>
      </div>

      <TransactionsTable/>
      <RankingTable/>
      </>
     );
}
 
export default AdminProduct;