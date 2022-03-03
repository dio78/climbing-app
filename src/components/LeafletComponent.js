import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import '../Leaflet.css'
import { latLngBounds } from 'leaflet';
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setWaypoint2, setMapInstance } from "../actions";
import L from 'leaflet'
import { forwardRef} from "react";

const LeafletComponent = forwardRef((_, ref) => {

  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2)
  const geometry = useSelector((state) => state.routeData.geometry);
  

  const dispatch=useDispatch()

  // Clicked Ending Marker Component
  function LocationMarker1() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng)
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log(map);
      }
    })

    useEffect(() => {
      if (position) {
        dispatch(setWaypoint2([position.lat, position.lng]));
      }
    }, [position]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are ACTUALLY here</Popup>
      </Marker>
    )
  }

  function StartingMarker() {
    const map = useMap();

    if (startingWaypoint.length > 0){
      // map.flyTo(startingWaypoint, 14); 
      return startingWaypoint === null || endingWaypoint === null ? null : (
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

  
  // Polyline Stuff
  function NewPolyline() {
    if (geometry.length > 0) {}
    const map = useMap();
    useEffect(() => {
      if (geometry.length > 0) {
        let markerBounds = latLngBounds([]);
        markerBounds.extend(startingWaypoint);
        markerBounds.extend(endingWaypoint);
        map.flyToBounds(markerBounds)
      }
    }, [])
    return geometry.length < 0 ? null : (
      <Polyline pathOptions={{color: 'green'}} positions={geometry} />
    )
  }


  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <div>Click a location on the map to set a marker</div>
          <div>{startingWaypoint}</div>
          <div>{endingWaypoint}</div>
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
    </Container>
  )
});

export default LeafletComponent;