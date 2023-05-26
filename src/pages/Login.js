import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../user";

function Login() {

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [loginState, setLoginState] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const submit = async () => {
        try {
            const res = await axios.post('http://54.168.86.132:8080/members/login', data);
                // console.log(res);
                setUser(res.data);
            
            // const { token, expired } = res.data;
            // document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
            // // 儲存 Token
    
            // if 登入成功
            if(res.status === 200) {
                navigate('/map');
            }
        } catch (error) {
            setLoginState(error);
            console.log(error);
        }
    };


    return (<div className="form-box">
    <div className="header-text">
        登入
    </div>

    <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'} `}  role="alert">
            登入失敗 請重新登入
    </div>
    
    <input className="form-control" placeholder="Email" type="text" name="email" required onChange={handleChange}/>
    <input className="form-control" placeholder="Password" type="password" name="password" required  onChange={handleChange}/> 
    
    <button type="button" onClick={submit}>login</button>
    <div className="tail-text">
    <span style={{color:'white'}}>還不是會員?</span><Link className="link float-end" to='/register'>註冊會員</Link>
    </div>
</div>);
}

export default Login;