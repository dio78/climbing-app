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
    </Container>
  )
}

export default CityInput;