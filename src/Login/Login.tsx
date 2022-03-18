import { useState } from 'react';
import logo from '../pictures/smart-home.png';
import './Login.scss';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
            type="text"
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button">Войти</button>
        </div>
      </div>
    </div>
  );
}
