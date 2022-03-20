import axios from 'axios';
import { useState } from 'react';
import { domain } from '../config/config';
import logo from '../pictures/smart-home.png';
import './Login.scss';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleButtonClick() {
    axios
      .post(
        `${domain}/user/login`,
        { name: login, password: password },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        const errorJson = error.response.data;
        setErrorMsg(errorJson.error);
      });
  }

  return (
    <div className="Login">
      <div className="logo-container">
        <img src={logo} alt="Smart House" />
        <h1>Управление умным домом</h1>
      </div>

      <div className="auth-container">
        <div className="greeting-block">
          <h2>Добро пожаловать!</h2>
          <p>Пожалуйста авторизируйтесь...</p>
        </div>

        <div className="form-block">
          <input
            type="text"
            value={login}
            placeholder="Логин"
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
          <button type="button" onClick={handleButtonClick}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}
