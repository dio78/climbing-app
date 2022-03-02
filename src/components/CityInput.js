import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getWayPoint1, getWayPoint2, getRouteData } from '../actions';

const CityInput = (props) => {
  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const geometry = useSelector((state) => state.routeData.geometry);

  const dispatch = useDispatch();

  const [searchLocation, setSearchLocation] = useState('');

  const [searchData, setSearchData] = useState('')

  const validateInput = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    setSearchData(searchLocation)
    // ACTION
    // dispatch(getRouteData([25, 30], [25.1, 30.1]));
    dispatch(getWayPoint1(searchData))
  }

  const renderMap = () => {
    if (searchData.length > 0) {
      return <div>{props.children}{geometry}</div>
    }
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
                  <FormControl value={searchLocation} placeholder="Enter start location" onChange={validateInput}></FormControl>
                </InputGroup>
                <h1>{searchLocation}</h1>
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
      {renderMap()}
    </Container>
  )
}

export default CityInput;