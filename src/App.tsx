import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

/**
 * @description app显示的主页面
 * @constructor
 */

function App(prop: { children: any }) {
    const navigate = useNavigate();
    function isAuthenticated(): boolean {
        // return localStorage.getItem('authToken') !== null;
        return false;
    }
    useEffect((): void => {
        if(!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate])
    return (
        <>
            {prop.children}
        </>
    )
}

export default App;