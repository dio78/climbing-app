import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getWayPoint1, getWayPoint2, getRouteData } from '../actions';

const CityInput = (props) => {

  // Allowing for use of "dispatch"
  const dispatch = useDispatch();

  // Getting access to state objects from redux store
  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2);
  const geometry = useSelector((state) => state.routeData.geometry);

  // Setting up some useful state objects
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [searchStart, setSearchStart] = useState('');
  const [searchEnd, setSearchEnd] = useState('');

  // Utilizing two "useEffect" functions to make sure our useful state objects are set before the dispatch goes off
  useEffect(() =>{
    dispatch(getWayPoint1(searchStart));
    // console.log(searchStart);
  }, [searchStart]);

  useEffect(() =>{
    dispatch(getWayPoint2(searchEnd));
    // console.log(searchEnd);
  }, [searchEnd]);

  useEffect(() => {
    if (startingWaypoint.length > 0 && endingWaypoint.length > 0) {
      console.log([[startingWaypoint], [endingWaypoint]]);
      dispatch(getRouteData([startingWaypoint], [endingWaypoint]));
      console.log(geometry)
    }
    
  }, [startingWaypoint, endingWaypoint])


  // Validating start location input
  const validateStart = (e) => {
    setStartInput([e.target.value])
    //If these are not right, do something here (ex. "must include a letter" message)
  };

    // Validating end location input
    const validateEnd = (e) => {
      setEndInput([e.target.value])
      //If these are not right, do something here (ex. "must include a letter" message)
    };

  
  // Sets search values
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('click');

    setSearchStart(startInput);
    setSearchEnd(endInput);
  }

  const renderMap = () => {
    if (startingWaypoint.length > 0) {
      return <div>{props.children}</div>
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={{span: '8', offset: '2' }}>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <Button type="submit" variant="outline-secondary">Current Location</Button>
                  <FormControl value={startInput} placeholder="Enter start location" onChange={validateStart}></FormControl>
                </InputGroup>
                <h1>{startInput}</h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                  <FormControl value={endInput} placeholder="Enter Destination Location" onChange={validateEnd}></FormControl>
                  <h1>{endInput}</h1>
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