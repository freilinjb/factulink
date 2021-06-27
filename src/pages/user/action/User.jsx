import React from "react";
import { useParams } from "react-router-dom";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import UserForm from "../../../components/forms/UserForm";

const User = () => {
  const { id } = useParams();

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
            <Breadcrumb.Item href="/#/user">Admin User</Breadcrumb.Item>
            <Breadcrumb.Item active>{id > 0  ? 'Update User' : 'Add User'}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{id > 0  ? 'Update User' : 'New User'}</h4>
        </div>
      </div>
      <UserForm />
    </>
  );
};

export default User;
