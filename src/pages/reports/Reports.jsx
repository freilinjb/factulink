import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { ListGroupItem, Card, ListGroup } from "@themesberg/react-bootstrap";

const Reports = () => {
  return (
    <>
      <div className="row justify-content-center">
        <Card style={{ width: "18rem" }} className="col-12 m-4">
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
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
    
        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} size="3x" /> Ventas
            </Card.Title>
            {/* <Card.Text>
    </Card.Text> */}
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="/#/reports/billing">Reportes de Facturas</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="/#/reports/billing">Reportes de Productos</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Producto en Stock</Card.Link>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Link href="#">Reportes de Entrada</Card.Link>
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} size="3x" /> Compras
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
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} size="3x" /> Clientes
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
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }} className="m-4">
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} size="3x" /> Proveedores
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
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
    
      </div>
    </>
  );
};

export default Reports;
