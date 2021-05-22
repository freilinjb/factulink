import React from 'react';
import { Row, Col, Card, Form } from '@themesberg/react-bootstrap';
import Table from "react-bootstrap-table-next";
import Pagination from "react-bootstrap-table2-paginator";
import * as Paginator from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const TableProducts = () => {

  const columns = [
    { dataField: "id", text: "ID", hidden: true },
    { dataField: "name", text: "Name" },
    { dataField: "position", text: "Position" },
    { dataField: "office", text: "Office" },
    { dataField: "age", text: "Age" },
    { dataField: "startDate", text: "Start date" },
    { dataField: "salary", text: "Salary", formatter: (cell) => <span>${cell}</span> }
  ];

  const customTotal = (from, to, size) => (
    <div>
      Showing {from} to {to} of {size} entries
    </div>
  );

  const customSizePerPage = (props) => {
    const { options, currentSizePerPage, onSizePerPageChange } = props;
  
    const onPageChange = (e) => {
      const page = e.target.value;
      props.onSizePerPageChange(page);
    }

    return ( 
        <h1>Hola 2</h1>
     );
}
 
export default TableProducts;