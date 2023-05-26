import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../user";
import axios from "axios";


function ReceiveRequest() {

    const {user} = useContext(UserContext);

    const [resData, setResData] = useState([]);

    const [isSetted, setIsSetted] = useState(false);

    const [isVisible, setIsVisible] = useState(true);

    const [updateStatus, setUpdateStatus] = useState({
        status: '',
        sendersPhone: '',
        receiversPhone: user.phoneNumber
    });

    const handleClick = (e) => {
        setIsVisible(false);            
        const {name, value} = e.target;        
        setUpdateStatus({...updateStatus, [name]: value});        
        setIsSetted(true);
    };

    useEffect(() => {
              
        try {
            (async () => {
            const res = await axios.get(`http://54.168.86.132:8080/exchange-requests/r?receiversPhone=${user.phoneNumber}`);
            // console.log(res);
            setResData([...resData, res.data]); 
            setUpdateStatus({...updateStatus, sendersPhone: res.data.sendersPhone});
        })();  
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (isSetted) {
            // console.log(updateStatus);

            try {(async () => {
                await axios.put('http://54.168.86.132:8080/exchange-requests', updateStatus);                
                })();   
            } catch (error) {
                console.log(error);
            }

            setIsSetted(false);
        }
    }, [isSetted])

    // useEffect(() => {
    //     console.log(resData);
    // }, [resData])

    return (<>
        <Navbar/>
        <div className="container mt-3">
            <div className="row">
                <div className="bg-light p-3">
                    <table className="table align-middle">
                        <tbody>
                            {   (resData.length > 0) ? (resData.map((item, index) => (<tr key={index}>
                                        <td>
                                          電話:   
                                        </td>
                                        <td>
                                            {item.sendersPhone}
                                        </td>
                                        <td>
                                            的車主想跟你交換電池 
                                        </td>
                                        {isVisible && ( 
                                            <td>
                                                <button type="button" className="btn btn-success" name="status" value="accepted" onClick={handleClick}>接受</button>
                                            </td> 
                                        )}
                                        {isVisible && ( 
                                            <td>
                                                <button type="button" className="btn btn-danger" name="status" value="refused" onClick={handleClick}>拒絕</button>
                                            </td> 
                                        )}                                         
                                        {!isVisible && (updateStatus.status === 'accepted' ? <td>你已同意</td> : <td>你已拒絕</td>)}                                        
                                    </tr>)
                                )) : (<tr>loading...</tr>)  
                                // { JSON.stringify(resData) 
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}

export default ReceiveRequest;