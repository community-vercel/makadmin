import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import ServiceAreaTables from "../../components/dashboard/ServiceArea";

const ServiceArea = () => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <ServiceAreaTables />
      </Col>
   
    </Row>
  );
};

export default ServiceArea;
