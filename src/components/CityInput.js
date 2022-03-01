import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

const CityInput = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click');
  } 

  return (
    <Container>
      <Row>
        <Col xs={{span: '8', offset: '2' }}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4">
              <FormControl placeholder="Enter start location"></FormControl>
              <FormControl placeholder="Enter destination "></FormControl>
              <Button type="submit">Search</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Form className="mb-4">
        <Row>
          <Col xs={{span: '8', offset: '2' }}>
            <Row className="align-items-center">
              <Col xs={8}>
                <Form.Control placeholder="City" />
              </Col>
              <Col>
                <Form.Control placeholder="State" />
              </Col>
              <Col xs="auto">
                <Button xs="auto">Search</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default CityInput;