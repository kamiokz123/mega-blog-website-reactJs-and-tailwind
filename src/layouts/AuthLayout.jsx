import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AuthLayout({ children, authentication }) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authState !== authentication) {
            navigate("/login");
        } else if (!authentication && authState !== authentication) {
            navigate("/")
        }
        setLoader(false);
    }, [authState, navigate, authentication])

    return (
        loader ? <h3>loading</h3> : <>{children}</>
    )
}

export default AuthLayout
