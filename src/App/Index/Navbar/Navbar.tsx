import { Box, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';
import { selectRoom } from '../../../redux/slices/Room/roomSlice';
import { Profile } from './Profile/Profile';
import { Sidebar } from './Sidebar/Sidebar';

export function Navbar() {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);

  function updateParams() {
    axios
      .get(`${domain}/parameters/rooms`)
      .then((response) => {
        setRooms(response.data);
        dispatch(selectRoom(response.data[0]));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function translateName(dataType: string) {
    if (dataType === 'livingroom') {
      return 'Гостинная';
    }

    if (dataType === 'kitchen') {
      return 'Кухня';
    }
  }

  useEffect(() => {
    updateParams();
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
              onClick={async () => {
                dispatch(selectRoom(name));
              }}
            >
              {translateName(name)}
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
}
