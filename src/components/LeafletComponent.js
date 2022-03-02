import { Map, MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import '../Leaflet.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const LeafletComponent = () => {

  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2)
  const geometry = useSelector((state) => state.routeData.geometry);

  // useEffect(() => {
  //   FlyHere()
  // },[startingWaypoint])

  const polyline = [
    [
    -87.624337,
    41.875563
    ],
    [
    -87.624327,
    41.875151
    ],
    [
    -87.62432,
    41.87478
    ],
    [
    -87.62431,
    41.874432
    ],
    [
    -87.625175,
    41.874418
    ],
    [
    -87.62518,
    41.875657
    ],
    [
    -87.62518,
    41.875745
    ],
    [
    -87.626023,
    41.875727
    ],
    [
    -87.626892,
    41.875708
    ],
    [
    -87.627061,
    41.875705
    ],
    [
    -87.62764,
    41.875699
    ],
    [
    -87.628701,
    41.875705
    ],
    [
    -87.628832,
    41.875704
    ],
    [
    -87.629234,
    41.875701
    ],
    [
    -87.629308,
    41.8757
    ],
    [
    -87.629689,
    41.875696
    ],
    [
    -87.630202,
    41.875691
    ],
    [
    -87.630704,
    41.875687
    ],
    [
    -87.631258,
    41.875681
    ],
    [
    -87.631356,
    41.87568
    ],
    [
    -87.631722,
    41.875676
    ],
    [
    -87.631804,
    41.875676
    ],
    [
    -87.632577,
    41.875677
    ],
    [
    -87.633072,
    41.875673
    ],
    [
    -87.633659,
    41.875675
    ],
    [
    -87.634742,
    41.875692
    ],
    [
    -87.635014,
    41.875697
    ],
    [
    -87.635292,
    41.875696
    ],
    [
    -87.635793,
    41.875703
    ],
    [
    -87.636139,
    41.875699
    ],
    [
    -87.636358,
    41.875696
    ],
    [
    -87.637176,
    41.875691
    ],
    [
    -87.637282,
    41.875689
    ],
    [
    -87.638035,
    41.875671
    ],
    [
    -87.639313,
    41.875694
    ],
    [
    -87.640623,
    41.875684
    ],
    [
    -87.641699,
    41.875661
    ],
    [
    -87.642582,
    41.875624
    ],
    [
    -87.643467,
    41.875688
    ],
    [
    -87.643829,
    41.87572
    ],
    [
    -87.644018,
    41.875738
    ],
    [
    -87.644303,
    41.875783
    ],
    [
    -87.644504,
    41.875846
    ],
    [
    -87.644775,
    41.875942
    ],
    [
    -87.645015,
    41.876112
    ],
    [
    -87.645142,
    41.876254
    ],
    [
    -87.645234,
    41.876493
    ],
    [
    -87.645325,
    41.876814
    ],
    [
    -87.645407,
    41.877192
    ],
    [
    -87.645439,
    41.87746
    ],
    [
    -87.645459,
    41.87759
    ],
    [
    -87.645474,
    41.877797
    ],
    [
    -87.645495,
    41.87825
    ],
    [
    -87.645571,
    41.878482
    ],
    [
    -87.645498,
    41.879722
    ],
    [
    -87.645496,
    41.879785
    ],
    [
    -87.645515,
    41.880834
    ],
    [
    -87.645555,
    41.881473
    ],
    [
    -87.645565,
    41.881628
    ],
    [
    -87.645561,
    41.881887
    ],
    [
    -87.645588,
    41.88302
    ],
    [
    -87.645593,
    41.883263
    ],
    [
    -87.64563,
    41.884204
    ],
    [
    -87.645654,
    41.884645
    ],
    [
    -87.645683,
    41.884996
    ],
    [
    -87.645735,
    41.885306
    ],
    [
    -87.645807,
    41.885574
    ],
    [
    -87.64591,
    41.885931
    ],
    [
    -87.646016,
    41.886212
    ],
    [
    -87.646101,
    41.886419
    ],
    [
    -87.646328,
    41.886906
    ],
    [
    -87.646458,
    41.887151
    ],
    [
    -87.646596,
    41.887382
    ],
    [
    -87.646825,
    41.887749
    ],
    [
    -87.647082,
    41.888098
    ],
    [
    -87.647109,
    41.888132
    ],
    [
    -87.647413,
    41.888491
    ],
    [
    -87.64764,
    41.888737
    ],
    [
    -87.648003,
    41.8891
    ],
    [
    -87.648317,
    41.889375
    ],
    [
    -87.64861,
    41.889615
    ],
    [
    -87.649098,
    41.889962
    ],
    [
    -87.649525,
    41.890248
    ],
    [
    -87.650048,
    41.890597
    ],
    [
    -87.650697,
    41.891004
    ],
    [
    -87.651186,
    41.891345
    ],
    [
    -87.651689,
    41.891703
    ],
    [
    -87.652457,
    41.892284
    ],
    [
    -87.653122,
    41.892765
    ],
    [
    -87.653539,
    41.893067
    ],
    [
    -87.653996,
    41.89338
    ],
    [
    -87.654511,
    41.893745
    ],
    [
    -87.655395,
    41.894302
    ],
    [
    -87.655982,
    41.89467
    ],
    [
    -87.656321,
    41.894892
    ],
    [
    -87.656723,
    41.895181
    ],
    [
    -87.657024,
    41.895403
    ],
    [
    -87.657382,
    41.895695
    ],
    [
    -87.657635,
    41.895924
    ],
    [
    -87.65785,
    41.896124
    ],
    [
    -87.658143,
    41.896429
    ],
    [
    -87.658396,
    41.896733
    ],
    [
    -87.6586,
    41.897003
    ],
    [
    -87.658783,
    41.897251
    ],
    [
    -87.659011,
    41.897622
    ],
    [
    -87.659161,
    41.897893
    ],
    [
    -87.65932,
    41.898217
    ],
    [
    -87.659551,
    41.898718
    ],
    [
    -87.660194,
    41.900116
    ],
    [
    -87.660483,
    41.900749
    ],
    [
    -87.66062,
    41.90111
    ],
    [
    -87.660726,
    41.901461
    ],
    [
    -87.660805,
    41.901753
    ],
    [
    -87.660864,
    41.902092
    ],
    [
    -87.660915,
    41.902476
    ],
    [
    -87.660932,
    41.90286
    ],
    [
    -87.66094,
    41.903121
    ],
    [
    -87.660923,
    41.903473
    ],
    [
    -87.660891,
    41.903793
    ],
    [
    -87.660859,
    41.904035
    ],
    [
    -87.660795,
    41.904443
    ],
    [
    -87.660759,
    41.904784
    ],
    [
    -87.66075,
    41.905036
    ],
    [
    -87.660776,
    41.905336
    ],
    [
    -87.660803,
    41.905559
    ],
    [
    -87.66087,
    41.905872
    ],
    [
    -87.660967,
    41.906186
    ],
    [
    -87.661061,
    41.906443
    ],
    [
    -87.661253,
    41.906799
    ],
    [
    -87.661536,
    41.907216
    ],
    [
    -87.661767,
    41.907506
    ],
    [
    -87.662227,
    41.907951
    ],
    [
    -87.662559,
    41.908253
    ],
    [
    -87.663652,
    41.909238
    ],
    [
    -87.664076,
    41.909684
    ],
    [
    -87.664439,
    41.910145
    ],
    [
    -87.664636,
    41.910428
    ],
    [
    -87.664955,
    41.910934
    ],
    [
    -87.665531,
    41.911851
    ],
    [
    -87.665874,
    41.912389
    ]];

    const polylineReal = polyline.map((latLon) => {
      return [latLon[1], latLon[0]]
    })

  // const polyline= [];
  // for (let i = 0; i < inputData.length; i++) {
  //   const input = inputData[i];
  //   polyline.push([input['lon'], input['lat']])
  // }

 

  function LocationMarker1() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
        console.log(position)
        map.flyTo(e.latlng, map.getZoom())
      }
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are ACTUALLY here</Popup>
      </Marker>
    )
  }

  function StartingMarker() {
    const map = useMap();
    map.flyTo(startingWaypoint, map.getZoom(14));
    console.log(endingWaypoint)
    return startingWaypoint === null || endingWaypoint === null ? null : (
      <>
      <Marker position={startingWaypoint}>
        <Popup>Starting Waypoint</Popup>
      </Marker>
      <Marker position={endingWaypoint}>
        <Popup>Ending Waypoint</Popup>
      </Marker>
      </>
    )
  }



  function NewPolyline() {
    return geometry === null ? null : (
      <Polyline pathOptions={{color: 'green'}} positions={polylineReal} />
    )
  }


  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <div>Click a location on the map to set a marker</div>
          <div>{startingWaypoint}</div>
          <div>{endingWaypoint}</div>
          <Button>Fly</Button>
        </Col>
      </Row>

      <MapContainer center={polylineReal[0]} zoom={12} className="mx-auto">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StartingMarker />
        <Marker position={polylineReal[polylineReal.length - 1]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <NewPolyline />
        <Polyline pathOptions={{color: 'red'}} positions={polylineReal} />
        <LocationMarker1 />
      </MapContainer>
    </Container>
  )
};

export default LeafletComponent;