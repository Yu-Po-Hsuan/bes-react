import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../user";
import axios from "axios";
import { Link } from "react-router-dom";


function SendRequest() {
    
    const {user} = useContext(UserContext);

    const [resData, setResData] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const res = await axios.get(`http://54.168.86.132:8080/exchange-requests/s?sendersPhone=${user.phoneNumber}`);
                // console.log(res);            
                setResData([...resData, res.data]);    
            })();  
        } catch (error) {
            console.log(error);
        }              
    }, []);

    const handleClick = (id) => {
        try {
            axios.delete(`http://54.168.86.132:8080/exchange-requests/${id}`);            
        } catch (error) {
            console.error(error);
        }
        
    }

    return (<>
        <Navbar/>
        <div className="container mt-3">
            <div className="row">
                <div className="bg-light p-3">
                    <table className="table align-middle">
                        <tbody>
                           {    (resData.length > 0) ? (resData.map((item, index) => {
                                    switch (item.status) {                                        
                                        case 'accepted':
                                            return (<tr key={index}><td>{item.receiversPhone}</td><td>的車主同意交換</td>
                                            <td>
                                                <a className="btn btn-success" href="http://54.168.86.132:8080/checkout" onClick={() => {handleClick(item.exchangeRequestId)}}>前往付款</a>
                                            </td></tr>);
                                            
                                        case 'refused':
                                            return (<tr key={index}><td>{item.receiversPhone}</td><td>的車主拒絕交換</td>
                                            <td>
                                                <Link to="/map">
                                                <button className="btn btn-danger" onClick={() => {handleClick(item.exchangeRequestId)}}>取消交換</button>
                                                </Link>
                                            </td></tr>);

                                        default:
                                            return (<tr key={index}><td>{item.receiversPhone}</td><td>的車主尚未回覆</td></tr>);
                                    }
                                })) : (<tr>loading...</tr>) 
                            }                          
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}

export default SendRequest;