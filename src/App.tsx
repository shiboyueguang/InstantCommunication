import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {RootState} from "./store";
import {useSelector} from "react-redux";

/**
 * @description app显示的主页面
 * @constructor
 */

function App(prop: { children: any }) {
    const navigate = useNavigate();
    const success = useSelector((state: RootState) => state.login.success);
    function isAuthenticated(): boolean {
        return success;
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