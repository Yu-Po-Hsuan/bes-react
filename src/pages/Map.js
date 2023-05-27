import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import '../node_modules/leaflet/dist/leaflet.css';
import { UserContext } from "../user";

function Map() {

  const navigate = useNavigate();

    const {user} = useContext(UserContext);

    const [locations, setLocations] = useState([]);  

    const [exchangeRequest, setExchangeRequest] = useState({
      sendersPhone: user.phoneNumber,
      receiversPhone: '',
      status: 'pending'
    });

    const [isSetted, setIsSetted] = useState(false);

  useEffect(() => {
    
      try {
        ( async () => {
         const result = await axios.get('http://54.168.86.132:8080/vehicles');
        //  console.log(result);
         
        //  console.log(result.data[0].longitude);
         setLocations(result.data);
        })()
      } catch (error) {
        console.log(error);
      }
  },[])

  const hanldeClick = (phoneNumber) => {   
    setExchangeRequest({...exchangeRequest, receiversPhone: phoneNumber});
    setIsSetted(true);
  }

  useEffect(() => {
         
    if (isSetted) {
        // console.log(exchangeRequest); 
        try {(async () => {
            const res = await axios.post('http://54.168.86.132:8080/exchange-requests', exchangeRequest);
            // console.log(res);
            setIsSetted(false);
            alert("請求成功");
            setTimeout(() => {
              navigate('/send-request');
            }, 1000);
            })();   
        } catch (error) {
            console.log(error);
        }
    }     
}, [isSetted])


  return (
    <div className="App">
      <MapContainer id="leaflet-container" center={[25.112692, 121.533234]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Link to='/receive-request'>
          <button id="receiveButton">回復請求</button>
        </Link>
        <Link to='/send-request'>
          <button id="sendButton">查看請求</button>
        </Link>
        <Link to='/login'>
          <button id="logoutButton">登出</button>
        </Link>

        {
          locations.map(location => (<Marker key={location.vehicleId} position={[location.latitude, location.longitude]}>
            <Popup>
              <h5>車牌: {location.licensePlateNumber}</h5>
              <h5>電量: {location.batteryLevel}%</h5>
              <h5><a href={`tel:${location.phoneNumber}`}>電話: {location.phoneNumber}</a></h5>
              {/* <h5><Link to='/send-request' onClick={() => {hanldeClick(location.phoneNumber)}}>請求交換</Link></h5> */}
              <button type="button" className="btn btn-success" onClick={() => {hanldeClick(location.phoneNumber)}}>請求交換</button>
          </Popup>
          </Marker>))
        }

      </MapContainer>
    </div>
  );
}

export default Map;