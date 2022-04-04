import { Box, Button, Flex, FormHelperText } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';
import { Profile } from './Profile/Profile';

export function Navbar() {
  const dispatch = useDispatch();
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
    <Flex align="start" mt="4vh" flexDirection="row">
      <Profile />
      {rooms.map((name, id) => {
        return (
          <Button key={id} ml="1vw">
            {name}
          </Button>
        );
      })}
    </Flex>
  );
}
