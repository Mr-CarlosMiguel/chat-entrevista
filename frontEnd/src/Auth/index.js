import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute=(props) => {   
    if (!localStorage.getItem('idUser'))
        return <Navigate to={'/'} />
    return <>
        {props.children}
    </>
}

export default PrivateRoute