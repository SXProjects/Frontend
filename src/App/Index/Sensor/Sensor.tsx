import {
  Box,
  Flex,
  Text,
  Square,
  Circle,
  Center,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect, FunctionComponent } from 'react';
import React from 'react';
import axios from 'axios';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';

export function Sensor() {
  const [sensors, setSensors] = useState([] as any[]);
  const [isSend, setIsSend] = useState(false);
  const [room, setRoom] = useState('');
  const [receiver, setReceiver] = useState('');
  const currentRoom = useAppSelector((state) => state.room);

  useEffect(() => {
    axios
      .get(`${domain}/parameters/get`)
      .then((response) => {
        console.log(currentRoom.active);
        setSensors(response.data as any[]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  function translateName(dataType: string) {
    if (dataType === 'temperature') {
      return 'Температура';
    }

    if (dataType === 'humidity') {
      return 'Влажность';
    }

    if (dataType === 'gas') {
      return 'Газ';
    }

    if (dataType === 'distance') {
      return 'Расстояние';
    }
  }

  function handleONButtonClick() {
    setIsSend(!isSend);

    axios
      .post(`${domain}/command/send`, {
        room: room,
        receiver: receiver,
        parameter: isSend,
      })
      .then(() => {
        setIsSend(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsSend(false);
      });
  }

  return (
    <Center>
      <Flex flexDirection="row" justifyContent="center" mt="25vh" w="auto">
        <Square
          size="auto"
          bg="green"
          backgroundColor="#56999f"
          m="1.5vh"
          pl="2vw"
          pr="2vw"
          borderRadius={10}
        >
          <Box
            flex-direction="column"
            fontWeight="Light"
            fontSize="2.5vw"
            textAlign="center"
          >
            <Flex flexDirection="column" align="center" textAlign="center">
              <Input
                placeholder="Название комнаты"
                borderColor="black"
                variant="flushed"
                _placeholder={{ color: 'black' }}
                onChange={(e) => setRoom(e.target.value)}
              />
              <Input
                placeholder="Получатель"
                borderColor="black"
                variant="flushed"
                _placeholder={{ color: 'black' }}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <Flex
                flexDirection="row"
                align="center"
                justifyContent="center"
                mt="2vh"
              >
                <Button
                  backgroundColor="#9ECFD4"
                  _hover={{ backgroundColor: '#8AB9BE' }}
                  _active={{ backgroundColor: '#508489' }}
                  onClick={handleONButtonClick}
                >
                  {isSend ? 'ON' : 'OFF'}
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Square>

        {sensors.map((sensor, index) => (
          <Flex
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
            key={index}
          >
            {sensor.room === currentRoom.active && (
              <Square
                size="auto"
                p="3vw"
                bg="green"
                backgroundColor="#56999f"
                m="1.5vh"
                borderRadius={10}
              >
                <Box
                  flex-direction="column"
                  fontWeight="Light"
                  fontSize="2.5vw"
                  textAlign="center"
                >
                  <Text fontWeight="Bold" fontSize="2.2vh">
                    {translateName(sensor.data_type)}
                  </Text>
                  <Flex
                    flexDirection="column"
                    align="center"
                    textAlign="center"
                  >
                    {sensor.data_type !== 'gas' && (
                      <Text
                        fontSize="4.5vh"
                        textAlign="center"
                        fontWeight="light"
                      >
                        {sensor.data_type === 'temperature'
                          ? Math.round(sensor.data as number) + '°С'
                          : Math.round(sensor.data as number)}
                      </Text>
                    )}

                    {sensor.data_type === 'gas' && (
                      <Circle
                        size="30"
                        style={{
                          backgroundColor: (sensor.data as boolean)
                            ? 'green'
                            : 'red',
                        }}
                      />
                    )}
                  </Flex>
                </Box>
              </Square>
            )}
          </Flex>
        ))}
      </Flex>
    </Center>
  );
}
