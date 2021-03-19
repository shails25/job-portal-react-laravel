import { useState, useEffect } from 'react';

function useLocalStorage() {  

    const [token, setToken] = useState(null);
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setUserType(localStorage.getItem("user_type"))
        setName(localStorage.getItem("name"))

        const checkLogin = () =>{
            if(token != null && token != undefined && name != null && name != undefined){
                setIsLoggedIn(true)
            }
        }

        checkLogin();
    }, [setIsLoggedIn]);

  return [
    token, userType, name, isLoggedIn
  ]
}

export default useLocalStorage;