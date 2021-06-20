import React,{useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import ProductFormEdit from "../../../components/forms/ProductFormEdit";

// import Profile3 from "../../assets/img/team/profile-picture-3.jpg";
// import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";


const ProductEdit = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(`IdProducto: `,id);
  });
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
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
            <Breadcrumb.Item><Link to={'/product'}><a>Admin Product</a></Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <ProductFormEdit id={id}/>
    </>
  );
};

export default ProductEdit;
