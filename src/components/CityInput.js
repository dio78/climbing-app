import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getWayPoint1, getWayPoint2, getRouteData, setWaypoint1, setWaypoint2, resetRouteData } from '../actions';
import L, {latLngBounds} from 'leaflet'

const CityInput = (props) => {
  // useful map instance state
  const mapRef = useSelector((state) => state.mapRef);
  
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
    if (searchStart.length > 0) {
      dispatch(getWayPoint1(searchStart));  
    }
    
    // console.log(searchStart);
  }, [searchStart]);

  useEffect(() =>{
    if (searchEnd.length > 0) {
      dispatch(getWayPoint2(searchEnd));
    }

    // console.log(searchEnd);
  }, [searchEnd]);

  useEffect(() => {
    if (startingWaypoint.length > 0 && endingWaypoint.length > 0) {
      console.log([[startingWaypoint], [endingWaypoint]])
      console.log(typeof startingWaypoint[0])

      const routeStart = [startingWaypoint[0].toString(), startingWaypoint[1].toString()]
      const routeEnd = [endingWaypoint[0].toString(), endingWaypoint[1].toString()]

      dispatch(getRouteData(routeStart, routeEnd));
    }

  }, [startingWaypoint, endingWaypoint])

  // Validating start location input
  const validateStart = (e) => {
    setStartInput(e.target.value)
    //If these are not right, do something here (ex. "must include a letter" message)
  };

    // Validating end location input
    const validateEnd = (e) => {
      setEndInput(e.target.value)
      //If these are not right, do something here (ex. "must include a letter" message)
    };

  
  // Sets search values
  const handleSubmit = (e) => {
    e.preventDefault();
    if(startInput && !endInput) {
      setSearchStart(startInput);
    } else if (startInput && endInput) {
      setSearchStart(startInput);
      setSearchEnd(endInput);
    } else if (!startInput && endInput) {
      setSearchEnd(endInput);
    } else {
      alert('Enter a starting location, use current location, or click to set a starting point')
    }
  }

  const handleClickThis = (e) => {
    e.preventDefault()
    if(mapRef) {
      mapRef.map.locate().on('locationfound', function(e) {
        mapRef.map.getZoom(14)
        setStartInput(`${e.latlng.lat}, ${e.latlng.lng}`)
        setSearchStart(`${e.latlng.lat}, ${e.latlng.lng}`)
      })
    }
  }

  const resetHandler = (e) => {
    dispatch(resetRouteData());
    setStartInput('');
    setEndInput('');
    setSearchStart('');
    setSearchEnd('');
    dispatch(setWaypoint1([]));
    dispatch(setWaypoint2([]));
    mapRef.map.flyTo([0, 0], 2, {
      animate: true,
      duration: 1.5
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <Button type="submit" disabled={startingWaypoint.length} variant="outline-secondary" onClick={ handleClickThis }>Current Location</Button>
                  <FormControl disabled={startingWaypoint.length} value={startInput} placeholder="Enter start location, use Current Location, or click the map" onChange={validateStart}></FormControl>
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                  <FormControl disabled={!startingWaypoint.length} value={endInput} placeholder="Enter Destination Location, or click the map to set a destination" onChange={validateEnd}></FormControl>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col className="align-items-center">
                  <Button className="bt" type="submit" variant="success">Go</Button>
                  <Button className="bt" type="button" variant="warning" onClick={resetHandler}>Reset Searches</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CityInput;