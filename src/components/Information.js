import { useSelector } from "react-redux";

const Information = () => {
  const { elevationData, elevationGain, totalDistance } = useSelector(state => state.routeData);

  return (
    <div className="info-container">
      
    </div>
  )
};

export default Information;