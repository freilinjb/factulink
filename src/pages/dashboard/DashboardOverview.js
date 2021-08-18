
import React, {useState, useEffect} from "react";

import cookie from "js-cookie";
import clienteAxios from "../../config/axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {

  const [datos, setDatos] = useState({
    categoriasMasVendidas: [],
    clientesCantidad: 0,
    ventasActuales: 0,
  });

  useEffect(() => {
    consultarDatos();

  },[]);
  const consultarDatos = async () => {
    clienteAxios.defaults.headers.common['authorization'] = `Bearer ${cookie.get("token")}`;

    await clienteAxios
    .get('/api/report/dashboard/categorias_ventas')
    .then(async (respuesta) => {
      // console.log("getReportFactura: ", respuesta.data.data);
      setDatos({
        ...datos,
        categoriasMasVendidas: respuesta.data.data,
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });

    await clienteAxios
    .get('/api/report/dashboard/ventas_actual')
    .then(async (respuesta) => {
      console.log("getReportFactura: ", respuesta.data.data);
      setDatos({
        ...datos,
        ventasActuales: respuesta.data.data[0].precio,
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Montos de ventas"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Montos de ventas"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Clientes"
            title={datos.clientesCantidad}
            period="Agost 1 - Agost 18"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Venta del mes"
            title={datos.ventasActuales.toLocaleString('en-US', {style: 'currency',currency: 'USD',})}
            period="Agos 1 - Agos 18"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Categorias de ventas"
            data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Orden total"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
