import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import '../Leaflet.css'
import { latLngBounds } from 'leaflet';
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setWaypoint2, setMapInstance, setWaypoint1 } from "../actions";
import Information from "./Information";
import { forwardRef} from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Handler } from "leaflet";


Chart.register(...registerables);

const LeafletComponent = forwardRef((_, ref) => {

  const startingWaypoint = useSelector((state) => state.waypoints.point1);
  const endingWaypoint = useSelector((state) => state.waypoints.point2)
  const geometry = useSelector((state) => state.routeData.geometry);
  const routeInfo = useSelector(state => state.routeData)
  
  const [showGraph, setShowGraph] = useState(true);
  const [graph, setGraph] = useState(false);

  const dispatch=useDispatch()

  // Clicked Ending Marker Component
  function LocationMarker1() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng)
      }
    })

    useEffect(() => {
      if (position && startingWaypoint.length > 0) {
        dispatch(setWaypoint2([position.lat, position.lng]));
      } 
      if (position && startingWaypoint.length === 0) {
        dispatch(setWaypoint1([position.lat, position.lng]));
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


  

  const handleShowGraph = (e) => {
    e.preventDefault();
    if (!showGraph) {
      setShowGraph(true)
    } else {
      setShowGraph(false)
    }
    console.log(showGraph)
  }

  function LineGraph () {
    if(routeInfo.elevationData.length > 0) {
      const labels = []
      const data = []
      routeInfo.elevationData.forEach((point) => {
        labels.push(point[0])
        data.push(point[1])
      })

      // Optimizing array size if two points are about the same
      const labelsOptimized = [];
      const dataOptimized = [];
      const minDist = 5;
      const minHeight = 2

      labels.forEach((distance, index) => {
        if (index === 0 || index === labels.length - 1 || (distance - labelsOptimized[labelsOptimized.length - 1]) > minDist || Math.abs(data[index] - dataOptimized[dataOptimized.length - 1]) > minHeight) {
          labelsOptimized.push(distance);
          dataOptimized.push(data[index]);
        }
      });

      const chartData = {
        labels: labelsOptimized, // this is test data
        datasets: [{
          data: dataOptimized, // this is test data
          fill: true,
          borderColor: '#66ccff',
          backgroundColor: '#66ccff66',
          tension: 0.1,
          pointRadius: 0,
          spanGaps: false
        }]
      };
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        onHover: function (e,item) {
          if(item.length > 0) {
            console.log(item[0].element.$context.raw)
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins:{
          legend:{display:false},
          title: {
            align: "end",
            display: true,
            text: "Distance, m / Elevation, m"
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              title: (tooltipItems) => {
                return "Distance: " + tooltipItems[0].label + 'm'
              },
              label: (tooltipItem) => {
                return "Elevation: " + tooltipItem.raw + 'm'
              },
            }
          }
        },
        layout:{padding:{bottom:0}},
        scales: {
          y:{
            type: 'linear',
            min: 0,
            ticks:{
              color:"black",
              font:{
                size:18
              }
            },
            grid:{
              
              beginAtZero: true
            }
          },
          x:{
            type: 'linear',
            max: chartData.labels[chartData.labels.length - 1],
            ticks:{
              color:"black",
              font:{
                size:18
              }
            },
          }
        },
      };
      if (showGraph){
        setGraph(true)
        return (
          <Line options={options} data={chartData} />
        )
      }
    }
    
    return null
    
  }

  return (
    <Container className="mb-4">
      <Row>
        <Col>
          <div id="welcome-message"></div>
        </Col>
      </Row>
      <Row>
        <Col className="mb-5">
          <MapContainer center={[0, 0]} zoom={2} className="mx-auto" whenCreated={map => dispatch(setMapInstance(map))}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <StartingMarker />
            <EndingMarker />
            <LocationMarker1 />
            <NewPolyline />
          </MapContainer>
        </Col>
        <Col className="background-styling" xs={{span: 10, offset: 1}} style={{ height: showGraph ? '15rem': '0rem'}}>
          <LineGraph />
        </Col>
        
      </Row>
      {renderInfo()}
      
    </Container>
  )
});

export default LeafletComponent;