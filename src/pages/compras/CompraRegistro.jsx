import React from "react";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import CompraForm from "../../components/forms/CompraForm";

const CompraRegistro = () => {
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
            <Breadcrumb.Item><Link to={'/admin/supplier'}><a>Administracion de Compras</a></Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Registrar Compra</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <CompraForm />
    </>
  );
};

export default CompraRegistro;
