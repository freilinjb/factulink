import React from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import ProductForm from "../../../components/forms/ProductForm";

const Product = () => {
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
            <Breadcrumb.Item>Admin Product</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <ProductForm />
    </>
  );
};

export default Product;
