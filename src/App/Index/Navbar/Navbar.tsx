import axios from 'axios';
import { useEffect, useState } from 'react';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';
import './Navbar.scss';

export function Navbar() {
  const [rooms, setRooms] = useState([]);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    axios
      .post(`${domain}/command/send`, {
        command_name: 'list_locations',
        match: false,
        location: 'home',
      })
      .then((response) => {
        let gotRooms = response.data[0].sublocations;
        setRooms(gotRooms);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <div className="navbar">
      <div className="roomSection">
        {rooms.map((name, id) => {
          return <button key={id}>{name}</button>;
        })}
      </div>
      <div className="profile">
        <p className="username">{user.name}</p>
      </div>
    </div>
  );
}
