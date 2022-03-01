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

      <h4 className="mb-4">Or</h4>
      
      <Row className="mb-4">
        <Col xs={{span: '8', offset: '2' }}>
          <Form >
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
          </Form>
        </Col>
      </Row>
      
      <h4 className="mb-4">Or</h4>

      <Row>
        <Col xs={{span: '8', offset: '2' }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <Button type="submit" variant="outline-secondary">Current Location</Button>
                  <FormControl placeholder="Enter start location"></FormControl>
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                  <FormControl placeholder="Enter Destination Location"></FormControl>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="align-items-center">
                  <Button type="submit">Submit</Button>
              </Col>
            </Row>
            
          </Form>
        </Col>
      </Row>
      
    </Container>
  )
}

export default CityInput;