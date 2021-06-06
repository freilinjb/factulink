import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import ProductFormEdit from "../../../components/forms/ProductFormEdit";
import SupplierForm from "../../../components/forms/SupplierForm";

const SupplierEdit = () => {
  const { id } = useParams();

  // useEffect(() => {
  //   if(id > 0) {
  //       console.log(`idProvedor: `,id);

  //   }
  // },[]);

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
            <Breadcrumb.Item><Link to={'/admin/supplier'}><a>Admin Supplier</a></Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Supplier</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <SupplierForm id={id}/>
    </>
  );
};

export default SupplierEdit;
