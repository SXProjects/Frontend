import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { domain } from '../config/config';
import { Index } from './Index/Index';
import { Login } from './Login/Login';
import { login } from '../redux/slices/User/userSlice';

function App() {
  const user = useAppSelector((state) => state.user);

  return <div className="App">{user.loggedIn ? <Index /> : <Login />}</div>;
}

export default App;
