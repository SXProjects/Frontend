import { Box, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';
import { Profile } from './Profile/Profile';
import { Sidebar } from './Sidebar/Sidebar';

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
    <Box mt="4vh">
      <Flex justifyContent="flex-start" ml="5vw" align="flex-start">
        <Profile />
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="center"
        align="center"
        mt="-50px"
      >
        {rooms.map((name, id) => {
          return (
            <Button
              key={id}
              ml="1vw"
              backgroundColor="#56999f"
              _hover={{ backgroundColor: '#56999f' }}
              _active={{ backgroundColor: '#508489' }}
            >
              {name}
            </Button>
          );
        })}
      </Flex>
      <Flex justifyContent="flex-end" align="flex-end" mr="2vw" mt="-80px">
        <Sidebar />
      </Flex>
    </Box>
  );
}
