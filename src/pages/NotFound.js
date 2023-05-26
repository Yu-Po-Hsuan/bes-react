import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }, [navigate])

    return (<>
        這是不存在的頁面
    </>);
}

export default NotFound;