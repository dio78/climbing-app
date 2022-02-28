import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import '../Leaflet.css'

const LeafletComponent = () => {

  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={polyline[0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={polyline[polyline.length - 1]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Polyline pathOptions={{color: 'red'}} positions={polyline} />
    </MapContainer>
  )
};

export default LeafletComponent;