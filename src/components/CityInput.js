import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getWayPoint1, getWayPoint2, getRouteData } from '../actions';
import Information from "./Information";
import L from 'leaflet'

const CityInput = (props) => {

  const mapRef = useSelector((state) => state.mapRef);

  // Allowing for use of "dispatch"
  const dispatch = useDispatch();

  // Getting access to state objects from redux store
  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2);
  const geometry = useSelector((state) => state.routeData.geometry);
  const routeInfo = useSelector(state => state.routeData)

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
    setSearchStart(startInput);
    setSearchEnd(endInput);
  }

  const handleClickThis = () => {
    console.log('happening')
    if(mapRef) {
      mapRef.map.locate().on('locationfound', function(e) {
        mapRef.map.flyTo(e.latlng, 14)
       
        console.log(e.latlng)
        L.marker(e.latlng).addTo(mapRef.map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
  
        mapRef.map.getZoom(14)
        setStartInput(`${e.latlng.lat}, ${e.latlng.lng}`)
      })
    }
  }
  

  const renderInfo = () => {
    if (geometry.length > 0) {
      return <Information info={routeInfo}/>
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                  <Button type="submit" variant="outline-secondary" onClick={ handleClickThis }>Current Location</Button>
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
      {renderInfo()}
    </Container>
  )
}

export default CityInput;