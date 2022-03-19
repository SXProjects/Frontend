import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Login } from './Login/Login';

const url = 'http://localhost:8080';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}/user/get`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div className="App">{isAuth ? <p>lol</p> : <Login />}</div>;
}

export default App;
