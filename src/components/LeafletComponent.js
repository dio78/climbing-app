import { Map, MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import '../Leaflet.css'
import { latLngBounds } from 'leaflet';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setWaypoint2 } from "../actions";

const LeafletComponent = () => {

  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2)
  const geometry = useSelector((state) => state.routeData.geometry);
  

  const dispatch=useDispatch()

  function LocationMarker1() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
        console.log(position);
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
    map.flyTo(startingWaypoint, map.getZoom(14));
    return startingWaypoint === null || endingWaypoint === null ? null : (
      <>
      <Marker position={startingWaypoint}>
        <Popup>Starting Waypoint</Popup>
      </Marker>
      </>
    )
  }

  function EndingMarker() {
    return startingWaypoint === null || endingWaypoint === null ? null : (
      <>
      <Marker position={endingWaypoint}>
        <Popup>Ending Waypoint</Popup>
      </Marker>
      </>
    )
  }

  function NewPolyline(props) {
    const map = useMap();
    useEffect(() => {
      let markerBounds = latLngBounds([]);
      markerBounds.extend(startingWaypoint);
      markerBounds.extend(endingWaypoint);
      map.fitBounds(markerBounds);
    })
    
    return geometry.length === 0 ? null : (
      <Polyline pathOptions={{color: 'green'}} positions={geometry} />
    )
  }

  

  if (geometry.length > 0) {
    return (
      <Container className="mb-4">
        <Row>
          <Col>
            <div>Click a location on the map to set a marker</div>
            {/* {<div>{startingWaypoint}</div>
            <div>{endingWaypoint}</div>
            <Button>Fly</Button>} */}
          </Col>
        </Row>
  
        <MapContainer center={startingWaypoint} zoom={12} className="mx-auto">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <StartingMarker />
          <EndingMarker />
          <LocationMarker1 />
          <NewPolyline />
        </MapContainer>
      </Container>
    )
  } 
  return (
    <div>Loading</div>
  )
};

export default LeafletComponent;