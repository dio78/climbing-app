import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import '../Leaflet.css'
import { latLngBounds } from 'leaflet';
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setWaypoint2, setMapInstance } from "../actions";
import Information from "./Information";
import L from 'leaflet'
import { forwardRef} from "react";

const LeafletComponent = forwardRef((_, ref) => {

  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2)
  const geometry = useSelector((state) => state.routeData.geometry);
  const routeInfo = useSelector(state => state.routeData)
  const mapReference = useSelector(state => state.mapRef);
  

  const dispatch=useDispatch()

  // Clicked Ending Marker Component
  function LocationMarker1() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
        setPosition(e.latlng)
      }
    })

    useEffect(() => {
      if (position && startingWaypoint.length > 0) {
        dispatch(setWaypoint2([position.lat, position.lng]));
      }
    }, [position]);

    return position === null ? null : (
      <Marker position={position}>
      </Marker>
    )
  }

  function StartingMarker() {
    const map = useMap();
    if (startingWaypoint.length > 0){
      map.flyTo(startingWaypoint, 14);
      return (
        <>
        <Marker position={startingWaypoint}>
          <Popup>Starting Waypoint</Popup>
        </Marker>
        </>
      )
    }
    return null
  }


  function EndingMarker() {
    if (startingWaypoint.length > 0 && endingWaypoint.length > 0) {
      return (
        <>
        <Marker position={endingWaypoint}>
          <Popup>Ending Waypoint</Popup>
        </Marker>
        </>
      )
    }
    return null
  }

  function NewStepMarkers() {
    
    const stepMarkers = routeInfo.stepInfo.map((step, index) => {
      const circle = <CircleMarker key={index + 1} center={step.latlng} radius={5}>
        <Tooltip>Step {index + 1}: {step.instruction}</Tooltip>
      </CircleMarker>
      return circle;
    });

    return stepMarkers;
  }
  
  // Polyline Stuff
  function NewPolyline() {
    const map = useMap();
    if (geometry.length > 0) {
      let markerBounds = latLngBounds([]);
      markerBounds.extend(startingWaypoint);
      markerBounds.extend(endingWaypoint);
      map.flyToBounds(markerBounds, {padding: [40, 40]})
    }
    console.log(endingWaypoint)
    if (geometry.length > 0) {
      function truncateToDecimals(num, dec = 2) {
        const calcDec = Math.pow(10, dec);
        return Math.trunc(num * calcDec) / calcDec;
      }
    const lastGeo = [truncateToDecimals(geometry[geometry.length - 1][0]), truncateToDecimals(geometry[geometry.length - 1][1])];
    const endCheck = [truncateToDecimals(endingWaypoint[0]), truncateToDecimals(endingWaypoint[1])]
      if (lastGeo[0] === endCheck[0] && lastGeo[1] === endCheck[1]) {
        return (
          <div>
            <Polyline pathOptions={{color: 'green'}} positions={geometry} />
            <NewStepMarkers />
          </div>
        )
      }
    }
    return null
  }

  const renderInfo = () => {
    if (geometry.length > 0) {
      return <Information info={routeInfo}/>
    }

    return null;
  }

  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <div id="welcome-message">Click a location on the map to set a marker.</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <MapContainer center={[0, 0]} zoom={2} className="mx-auto" whenCreated={map => dispatch(setMapInstance(map))}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <StartingMarker />
            <EndingMarker />
            <LocationMarker1 />
            <NewPolyline />
            {/* <CurrentMarker /> */}
          </MapContainer>
        </Col>
      </Row>
      {renderInfo()}
    </Container>
  )
});

export default LeafletComponent;