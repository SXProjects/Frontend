import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { domain } from '../config/config';
import { Index } from './Index/Index';
import { Login } from './Login/Login';
import { login } from '../redux/slices/User/userSlice';

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${domain}/user/get`, { withCredentials: true })
      .then((response) => {
        dispatch(
          login({
            loggedIn: true,
            name: response.data.name,
            id: response.data.id,
            permission: response.data.permission,
          })
        );
      })
      .catch((error) => console.error(error.response.data));
  }, []);

  return <div className="App">{user.loggedIn ? <Index /> : <Login />}</div>;
}

export default App;
