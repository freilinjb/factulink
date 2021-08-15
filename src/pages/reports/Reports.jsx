import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClipboardList, faCommentDollar, faSearchDollar, faUsers, faWarehouse } from "@fortawesome/free-solid-svg-icons";

import { ListGroupItem, Card, ListGroup } from "@themesberg/react-bootstrap";

const Reports = () => {
  return (
    <>
      <div className="row justify-content-center">
        <Card style={{ width: "18rem" }} className="col-12 m-4 ">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} size="3x" /> Inventario
            </Card.Title>
            {/* <Card.Text>
    </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="#">Reportes de Entrada</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Reportes de Salida</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Producto en Stock</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Reportes de Entrada</Card.Link>
            </ListGroupItem>
          </ListGroup>
        </Card>
    
        <Card style={{ width: "18rem" }} className="m-4 hover-zoom">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faCommentDollar} size="3x" /> Ventas
            </Card.Title>
            {/* <Card.Text>
    </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="/#/reports/billing">Reportes de Facturas</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/billing/sales">Reportes de Facturas POS</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Producto en Stock</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Reportes de Entrada</Card.Link>
            </ListGroupItem>
          </ListGroup>
        </Card>

        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faSearchDollar} size="3x" /> Compras
            </Card.Title>
            {/* <Card.Text>
    </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="/#/compras">Reportes de Compras</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/cuentasPorPagarProveedor">Cuentas por Pagar</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/cuentasPorPagar">Cuenta por Pagar por proveedor</Card.Link>
            </ListGroupItem>
          </ListGroup>
        </Card>

        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faWarehouse} size="3x" /> Supplier/Client
            </Card.Title>
            {/* <Card.Text>
    </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="/#/customer">Reportes Clientes</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/admin/supplier">Reportes Proveedores</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/product/category">Producto Categorias</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/product/subCategory">Reportes SubCategorias</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/product/unid">Reportes Unidades</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/comprobantes">Catalogo de NCF</Card.Link>
            </ListGroupItem>
          </ListGroup>
        </Card>
    
      </div>
    </>
  );
};

export default Reports;
