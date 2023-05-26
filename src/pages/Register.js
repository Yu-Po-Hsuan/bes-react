import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const navigate = useNavigate();

    const [memberdata, setMemberdata] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [vehicledata, setVehicledata] = useState({
        licensePlateNumber: '',
        latitude: 25.112692,
        longitude: 121.533234,
        batteryLevel: 0,
        memberId: null
    });

    const [isSetted, setIsSetted] = useState(false);

    const [loginState, setLoginState] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMemberdata({...memberdata, [name]: value});
    };
    const licensePlateNumberHandleChange = (e) => {
        const {name, value} = e.target;
        setVehicledata({...vehicledata, [name]: value});
    };

    const submit = async () => {
        try {
            const res = await axios.post('http://54.168.86.132:8080/members/register', memberdata);
                // console.log(res);
                // setMemberId(res.data.memberId);
                
            
            // const { token, expired } = res.memberdata;
            // document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
            // // 儲存 Token
             
            setVehicledata({...vehicledata, memberId: res.data.memberId});
            setIsSetted(true);
                       

            if(res.status === 201) {
                alert("註冊成功")
                setTimeout(() => {
                    navigate('/login');
                }, 1000)

                
                
                // try {
                //     const vehicleRes = await axios.post('http://localhost:8080/vehicles', vehicledata);
                //     console.log(vehicleRes);
                // } catch (error) {
                //     console.log(error);
                // }
                
            }
        } catch (error) {
            setLoginState(error);
            console.log(error);
        }
    };
    useEffect(() => {
         
        if (isSetted) {
            // console.log(vehicledata); 
            try {(async () => {
                await axios.post('http://54.168.86.132:8080/vehicles', vehicledata);                
                })();   
            } catch (error) {
                console.log(error);
            }
            setIsSetted(false);
        } 
        
    }, [isSetted])

    return (
        <div className="form-box">
		<div className="header-text">
			註冊會員
		</div>
        <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'} `}  role="alert">
            該email已經被註冊 請重新輸入新的email
        </div>
        
        <input className="form-control" placeholder="Email" type="text" name="email" required onChange={handleChange}/>
        <input className="form-control" placeholder="Password" type="password" name="password" required onChange={handleChange}/>
        <input className="form-control" placeholder="Phone Number" type="tel" name="phoneNumber" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" required onChange={handleChange}/>
        <input className="form-control" placeholder="License Plate Number" type="text" name="licensePlateNumber" required onChange={licensePlateNumberHandleChange}/>
         
        <button type="button" onClick={submit}>註冊</button>
	</div>
    );
}

export default Register;