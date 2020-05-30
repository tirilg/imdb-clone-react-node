import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
    const {
        setIsAuthenticated
    } = props;

    const history = useHistory();

    function handleLogout() {
        fetch('http://localhost:9090/api/users/logout', {
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            console.log(res)
            if(res.ok) {
                setIsAuthenticated(false);
                history.push("/");
            }
        })
        .catch(error => {
            console.log("Unable to log out")
        }) 
    }

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <h1>Log out</h1>
    )
}